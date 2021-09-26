import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuidv4 } from 'uuid'

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileRename from 'filepond-plugin-file-rename';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { uploadFileToBlob, deleteBlobFile, getFile } from "../../api/azure-storage-blob"

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileRename);

// Our app
export default function FileUpload({files, setFiles, maxFiles, allowMultiple}) {

    return (
        <div className="App">
            <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={allowMultiple}
                maxFiles={maxFiles}
                fileRenameFunction={(file) => {
                    const fileName = uuidv4()
                    return `${fileName}${file.extension}`;
                }}
                server={
                    {
                        process: async (fieldName, file, metadata, load, error, progress, abort, transfer, options) => {
                            try {
                                await uploadFileToBlob(file);
                                load(file.name)
                            }
                            catch (e) {
                                console.log(e)
                                error()
                            }
                        },
                        revert: async (uniqueFileId, load, error) => {
                            // ...
                            try {
                                await deleteBlobFile(uniqueFileId);
                                load()
                            }
                            catch (e) {
                                console.log(e)
                                error()
                            }
                        },
                    }

                }
                name="files"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
        </div>
    );
}