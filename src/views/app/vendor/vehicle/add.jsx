import React, {useEffect} from "react";

import {useParams} from "react-router-dom"
import {useFormik} from "formik";

import * as Yup from "yup"
import { toast } from "react-toastify"

import CardTemplate from "../../../../components/card/template";
import InputWithValidation from "../../../../components/input-with-validation";
import FileUploaderWithPreview from "../../../../components/file-uploader/with-preview";

import { axios, vehicleApi } from "../../../../api"

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import LoadingButton from "../../../../components/loading-button";

export default function AddVehicle() {
    let {id} = useParams()

    const [formikInitial, setFormikInitial] = React.useState({
        plateNumber: "",
        brand: "",
        model: "",
        imageUrl: ""
    })
    const [loading, setLoading] = React.useState(false)

    // if a parameter id in the router fetch the data from the backend
    useEffect(async () => {
        let mounted = true
        let source = axios.CancelToken.source()
        if(id) {
            try {
                const {data, status} = await vehicleApi.get(id, source)
                if(data && status === 200 && data.message === "Success" && mounted) {
                    setFormikInitial(data.data)
                }
            }
            catch (e) {
                if(!axios.isCancel(e)) throw e
            }
        }
        return () => {
            mounted = false
        }
    })

    // formik instance for the form
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formikInitial,
        validationSchema: Yup.object({
            plateNumber: Yup.string()
                .required('Vehicle plate number is required!')
                .match(/^([a-zA-Z]{1,3}|((?!0*-)[0-9]{1,3}))-[0-9]{4}(?<!0{4})/, "Please enter a valid plate number!"),
            brand: Yup.string()
                .required('Vehicle brand is required!'),
            model: Yup.string()
                .required('Vehicle model is required!'),
            imageUrl: Yup.string()
                .required('Vehicle image is required!'),
        })
    })

    const handleSubmit = async (values) => {
        const tokenId = toast.loading("Please wait...")
        setLoading(true)
        try {
            if (id) {
                const {data, status} = await vehicleApi.update(values, id)
                if(data && status === 201 && data.message === "Success") {
                    toast.update(tokenId, { render: "Vehicle is updated successfully!", type: "success",
                        isLoading: false, autoClose: true });
                }
            }
            else {
                const {data, status} = await vehicleApi.create(values)
                if(data && status === 201 && data.message === "Success") {
                    toast.update(tokenId, { render: "Vehicle is created successfully!", type: "success",
                        isLoading: false, autoClose: true });
                }
            }
        }
        catch (e) {
            toast.update(tokenId,
                { render: e.message, type: "error",
                    isLoading: false, autoClose: true });
        }
        finally {
            setLoading(false)
        }
    }

    const setImageName = async (fieldName, fileName) => {
        await formik.setFieldValue(fieldName, fileName)
    }

    return (
        <div className="flex justify-center">
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-0 lg:p-8">
                <div className="w-full text-2xl lg:text-3xl font-medium">Add New Vehicle</div>
                <CardTemplate>
                    <form className="h-full" onSubmit={formik.handleSubmit}>
                        <InputWithValidation
                            formik={formik}
                            id="plateNumber"
                            name="plateNumber"
                            label="Plate Number"
                            type="text"
                            className="mb-4"
                        />
                        <InputWithValidation
                            formik={formik}
                            id="brand"
                            name="brand"
                            label="Brand"
                            type="text"
                            className="mb-4"
                        />
                        <InputWithValidation
                            formik={formik}
                            id="model"
                            name="model"
                            label="Model"
                            type="text"
                            className="mb-4"
                        />
                        <label className='font-medium text-secondary text-sm xs:text-lg md:text-base'>Product Page Image</label>
                        <FileUploaderWithPreview
                            label={'Upload your vehicle image here'}
                            imageUrl={formik.values.imageUrl || ""}
                            formikFieldName={'imageUrl'}
                            setFileName={setImageName}
                        />
                        <div className="mt-8 flex justify-end">
                            <LoadingButton text={"Submit"} loading={loading} onClick={
                                async (e) => {
                                    e.preventDefault()
                                    await handleSubmit(formik.values)
                                }
                            } />
                        </div>
                    </form>
                </CardTemplate>
            </div>
        </div>
    )
}