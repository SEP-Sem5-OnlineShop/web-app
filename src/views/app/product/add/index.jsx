import React from "react";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {useFormik} from "formik";
import * as Yup from "yup";
import { FilePond, File, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import './style.css'

import CardTemplate from "../../../../components/card/template";
import InputWithValidation from "../../../../components/input-with-validation";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export default function AddProduct () {

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    const [files, setFiles] = React.useState([])

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            discount: '',
            category: '',
            description: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Required'),
            price: Yup.string()
                .required('Required'),
            discount: Yup.string()
                .required('Required'),
            category: Yup.string()
                .required('Required'),
            description: Yup.string()
                .required('Required'),
        }),
        onSubmit: async values => {
            // await dispatch(thunks.user.localSignIn(values.telephone, values.password))
            console.log(values)
        },
    });

    return (
        <React.Fragment>
            <div className="flex justify-center">
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
                    <div className="w-full text-3xl font-medium">Add New product</div>
                    <CardTemplate>
                        <form className="h-full" onSubmit={formik.handleSubmit}>
                            <InputWithValidation
                                formik={formik}
                                id="name"
                                name="name"
                                label="Name"
                                type="text"
                                className="mb-4"
                            />
                            <InputWithValidation
                                formik={formik}
                                id="price"
                                name="price"
                                label="Price"
                                type="text"
                                className="mb-4"
                            />
                            <InputWithValidation
                                formik={formik}
                                id="discount"
                                name="discount"
                                label="Discount"
                                type="text"
                                className="mb-4"
                            />
                            <InputWithValidation
                                formik={formik}
                                id="category"
                                name="category"
                                label="Category"
                                type="text"
                                className="mb-4"
                            />
                            <label className='font-medium text-secondary text-sm xs:text-lg md:text-base'>Description</label>
                            <Editor editorState={editorState}
                                toolbarClassName="toolbarClassName mt-1 rounded-md"
                                wrapperClassName="wrapperClassName"
                                editorClassName="bg-white min-h-300 px-2 mb-4 rounded-md"
                                placeholder="Add your product description here..."
                                onEditorStateChange={setEditorState} 
                            />
                            <label className='font-medium text-secondary text-sm xs:text-lg md:text-base'>Images</label>
                            <FilePond
                                files={files}
                                onupdatefiles={setFiles}
                                allowMultiple={true}
                                maxFiles={3}
                                server="/api"
                                name="files"
                                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                            />
                        </form>
                    </CardTemplate>
                </div>
            </div>
        </React.Fragment>
    )
}