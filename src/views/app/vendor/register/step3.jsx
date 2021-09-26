import React, {useEffect, useRef, useState} from "react";
import { motion } from "framer-motion";
import InputWithValidation from "../../../../components/input-with-validation";
import SelectWithValidation from "../../../../components/select-with-validation";
import { uploadFileToBlob, deleteBlobFile } from "../../../../api/azure-storage-blob";

export default function Step3(props) {

    const comProps = {
        formik: props.formik || {},
        setActiveTab: props.setActiveTab || (() => { }),
        submitButtonLoading: props.submitButtonLoading || false,
        setSubmitButtonLoading: props.setSubmitButtonLoading || (() => { }),
    }

    const [disableSubmitButton, setDisableSubmitButton] = useState(false)
    const [uploadedImageName, setUploadedImageName] = useState({})

    // current file to upload into container
    const [fileSelected, setFileSelected] = useState({
        documentUrl1: null,
        documentUrl2: null,
        documentUrl3: null
    });
    const [imageSelected, setImageSelected] = useState({
        imageUrl1: null,
        imageUrl2: null,
        imageUrl3: null
    });
    const [inputKey, setInputKey] = useState(Math.random().toString(36));
    const input = useRef(null)

    const onFileUpload = async (fileSelected, formikRef) => {
        let array;
        try {
            setDisableSubmitButton(true)
            array = await uploadFileToBlob(fileSelected);
            const fileName = array[1]
            setUploadedImageName(fileName)
            setDisableSubmitButton(false)
            comProps.formik.setFieldValue(formikRef, fileName)
        }
        catch (e) {
            console.log(e)
        }
    };

    return (
        <React.Fragment>
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className="mb-5"><span className="text-xl text-medium">Vehicles Details</span></div>
                    <SelectWithValidation
                        formik={comProps.formik}
                        id="numberOfVehicles"
                        name="numberOfVehicles"
                        label="Number of Vehicles"
                        items={["1", "2", "3"]}
                        className="mb-4"
                    />
                    <motion.div layout>
                        {
                            comProps.formik.values.vehicles.map((item, index) =>
                                <div key={index}>
                                    <span className="font-medium mb">Vehicle #{index} Details</span>
                                    <InputWithValidation
                                        formik={comProps.formik}
                                        id={`vehicles.${index}.brand`}
                                        name={`vehicles.${index}.brand`}
                                        label="Vehicle Brand"
                                        className="mb-2 mt-1"
                                        labelStyles={{fontSize: 14}}
                                    />
                                    <InputWithValidation
                                        formik={comProps.formik}
                                        id={`vehicles.${index}.model`}
                                        name={`vehicles.${index}.model`}
                                        label={`Vehicle Model`}
                                        className="mb-2"
                                        labelStyles={{fontSize: 14}}
                                    />
                                    <InputWithValidation
                                        formik={comProps.formik}
                                        id={`vehicles.${index}.plateNumber`}
                                        name={`vehicles.${index}.plateNumber`}
                                        label={`Plate Number`}
                                        className="mb-2"
                                        labelStyles={{fontSize: 14}}
                                    />
                                    <div className="mb-2">
                                        <div><span className="text-sm">Add a side image of your vehicle</span></div>
                                        <input ref={input} name={`vehicles.${index}.imageUrl`} type="file" onChange={
                                            event => setImageSelected({...imageSelected, [`imageUrl${index}`]: event.target.files[0]})
                                        } className="w-full"
                                               key={inputKey || ''} />
                                        <button type="button" onClick={() =>
                                            onFileUpload(imageSelected[`imageUrl${index}`], `vehicles.${index}.imageUrl`)}>
                                            Upload
                                        </button>
                                        {uploadedImageName && <button type="button" onClick={async () => {
                                            setDisableSubmitButton(true)
                                            await deleteBlobFile(uploadedImageName);
                                            setUploadedImageName("")
                                            comProps.formik.setFieldValue(`vehicles.${index}.imageUrl`, "")
                                            setFileSelected(null)
                                            input.current.value = null
                                            setDisableSubmitButton(false)
                                        }}>
                                            Delete
                                        </button>}
                                    </div>
                                    <div className="mb-2">
                                        <div><span className="text-sm">Add relevant document of the vehicle</span></div>
                                        <input ref={input} name={`vehicles.${index}.documentUrl`} type="file" onChange={
                                            event => setFileSelected({...fileSelected, [`documentUrl${index}`]: event.target.files[0]})
                                        } className="w-full"
                                               key={inputKey || ''} />
                                        <button type="button" onClick={() =>
                                            onFileUpload(fileSelected[`documentUrl${index}`],`vehicles.${index}.documentUrl`)}>
                                            Upload
                                        </button>
                                        {uploadedImageName && <button type="button" onClick={async () => {
                                            setDisableSubmitButton(true)
                                            await deleteBlobFile(uploadedImageName);
                                            setUploadedImageName("")
                                            comProps.formik.setFieldValue(`vehicles.${index}.documentUrl`, "")
                                            setFileSelected(null)
                                            input.current.value = null
                                            setDisableSubmitButton(false)
                                        }}>
                                            Delete
                                        </button>}
                                    </div>
                                </div>)
                        }
                    </motion.div>

                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <button
                        type="button"
                        onClick={() => comProps.setActiveTab(2)}
                        className="p-2 text-white rounded bg-textLight">Back</button>
                    <button
                        type="submit"
                        disabled={disableSubmitButton}
                        className={`p-2 text-white rounded bg-textLight ${disableSubmitButton ? "opacity-50" : ""}`}>
                        {comProps.submitButtonLoading ? 'Loading' : 'Submit'}
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}