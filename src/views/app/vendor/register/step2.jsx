import React, {useState} from "react";
import InputWithValidation from "../../../../components/input-with-validation";
import { uploadFileToBlob } from "../../../../api/azure-storage-blob";

export default function Step2(props) {

    const comProps = {
        formik: props.formik || {},
        setActiveTab: props.setActiveTab || (() => {})
    }
    // all blobs in container
    const [blobList, setBlobList] = useState([]);

    // current file to upload into container
    const [fileSelected, setFileSelected] = useState(null);

    // UI/form management
    const [uploading, setUploading] = useState(false);
    const [inputKey, setInputKey] = useState(Math.random().toString(36));

    const onFileChange = (event) => {
        // capture file into state
        setFileSelected(event.target.files[0]);
    };

    const onFileUpload = async () => {
        // prepare UI
        setUploading(true);

        // *** UPLOAD TO AZURE STORAGE ***
        const blobsInContainer = await uploadFileToBlob(fileSelected);

        // prepare UI for results
        setBlobList(blobsInContainer);

        // reset state/form
        setFileSelected(null);
        setUploading(false);
        setInputKey(Math.random().toString(36));
    };

    return (
        <React.Fragment>
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className="mb-5"><span className="text-xl text-medium">Mobile Shop Details</span></div>
                    <InputWithValidation
                        formik={comProps.formik}
                        id="shopName"
                        name="shopName"
                        label="Product Type"
                        type="text"
                        className="mb-4"
                    />
                    <InputWithValidation
                        formik={comProps.formik}
                        id="permitId"
                        name="permitId"
                        label="Permit Id"
                        type="text"
                        className="mb-4"
                    />
                    <InputWithValidation
                        formik={comProps.formik}
                        id="region"
                        name="region"
                        label="Region to be Covered"
                        type="text"
                        className="mb-4"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => comProps.setActiveTab(1)}
                        className="p-2 text-white rounded bg-textLight">Back</button>
                    <button
                        type="button"
                        onClick={() => comProps.setActiveTab(3)}
                        className="p-2 text-white rounded bg-textLight">Next</button>
                </div>
                <div>
                <input type="file" onChange={onFileChange} key={inputKey || ''} />
                <button type="submit" onClick={onFileUpload}>
                    Upload!
                </button>
                </div>
            </div>
        </React.Fragment>
    )
}