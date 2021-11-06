import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import InputWithValidation from "../../../../components/form-components/input-with-validation";
import SelectWithValidation from "../../../../components/form-components/select-with-validation";
import FileUploader from "../../../../components/form-components/file-uploader"
import FileUploaderWithPreview from "../../../../components/form-components/file-uploader/with-preview";
import LoadingButton from "../../../../components/form-components/loading-button";

export default function Step3(props) {

    const comProps = {
        formik: props.formik || {},
        setActiveTab: props.setActiveTab || (() => { }),
        submitButtonLoading: props.submitButtonLoading || false,
        setSubmitButtonLoading: props.setSubmitButtonLoading || (() => { }),
    }

    const [array, setArray] = useState(["1"])
    const [disableSubmitButton, setDisableSubmitButton] = useState(false)
    const [image, setImage] = useState(null)
    const [document, setDocument] = useState(null)

    useEffect(() => {
        let array = []
        for (let i = 1; i < parseInt(comProps.formik.values.numberOfVehicles) + 1; i++) {
            array.push(i)
        }
        setArray(array)
    }, [comProps.formik.values.numberOfVehicles])

    const handleRemoveVehicle = (index) => {
        let numberOfVehicles = comProps.formik.values["numberOfVehicles"]
        const vehicles = comProps.formik.values["vehicles"]
        vehicles.splice(index, 1)
        numberOfVehicles--
        comProps.formik.setFieldValue("vehicles", vehicles)
        comProps.formik.setFieldValue("numberOfVehicles", numberOfVehicles)
    }

    const handleAddVehicle = () => {
        let numberOfVehicles = comProps.formik.values["numberOfVehicles"]
        numberOfVehicles++
        comProps.formik.setFieldValue("numberOfVehicles", numberOfVehicles)
    }


    const setImageName = (fieldName, fileName) => {
        comProps.formik.setFieldValue(fieldName, fileName)
    }

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
                        className="mb-4 hidden"
                    />
                    <motion.div layout>
                        {
                            array.map((item, index) =>
                                <div key={index}>
                                    <span className="font-medium mb">Vehicle Number {index+1} Details</span>
                                    <InputWithValidation
                                        formik={comProps.formik}
                                        id={`vehicles.${index}.brand`}
                                        name={`vehicles.${index}.brand`}
                                        label="Vehicle Brand"
                                        className="mb-2 mt-1"
                                        labelStyles={{ fontSize: 14 }}
                                        value={comProps.formik.values.vehicles[index] ? comProps.formik.values.vehicles[index].brand : ""}
                                    />
                                    <InputWithValidation
                                        formik={comProps.formik}
                                        id={`vehicles.${index}.model`}
                                        name={`vehicles.${index}.model`}
                                        label={`Vehicle Model`}
                                        className="mb-2"
                                        labelStyles={{ fontSize: 14 }}
                                        value={comProps.formik.values.vehicles[index] ? comProps.formik.values.vehicles[index].model : ""}
                                    />
                                    <InputWithValidation
                                        formik={comProps.formik}
                                        id={`vehicles.${index}.plateNumber`}
                                        name={`vehicles.${index}.plateNumber`}
                                        value={comProps.formik.values.vehicles[index] ? comProps.formik.values.vehicles[index].plateNumber : ""}
                                        label={`Plate Number`}
                                        className="mb-2"
                                        labelStyles={{ fontSize: 14 }}
                                    />
                                    <label className='font-medium text-secondary text-sm xs:text-lg md:text-base'>Image of clear view of the vehicle</label>
                                    {/* <FileUploader allowMultiple={false} files={image} setFiles={setImage} maxFiles={1} /> */}
                                    <FileUploaderWithPreview
                                        label={'Upload your an image here'}
                                        imageUrl={comProps.formik.values.vehicles[index] ? comProps.formik.values.vehicles[index].imageUrl : ""}
                                        formikFieldName={`vehicles.${index}.imageUrl`}
                                        setFileName={setImageName}
                                    />
                                    {/* <label className='font-medium text-secondary text-sm xs:text-lg md:text-base'>Vehicle license file here</label>
                                    <FileUploader allowMultiple={false} files={document} setFiles={setDocument} maxFiles={1} /> */}
                                    {
                                        comProps.formik && parseInt(comProps.formik.values['numberOfVehicles'])>1 ?
                                            <div className={"flex justify-end my-4"}>
                                                <LoadingButton text={"Remove Vehicle"} onClick={() => handleRemoveVehicle(index)} />
                                            </div> :
                                            null
                                    }
                                </div>)
                        }
                        <div>
                            <LoadingButton text={"Add Vehicle"} onClick={handleAddVehicle} />
                        </div>
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