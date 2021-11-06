import React, {useEffect} from "react";

import {useParams} from "react-router-dom"
import {useFormik} from "formik";

import * as Yup from "yup"
import { toast } from "react-toastify"

import CardTemplate from "../../../../components/card/template";
import InputWithValidation from "../../../../components/form-components/input-with-validation";
import FileUploaderWithPreview from "../../../../components/form-components/file-uploader/with-preview";
import FormTemplate from "../../../../components/form-components/form-template";

import { axios, vehicleApi } from "../../../../api"

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ModelBody from "../../../../components/modals/modelBody";

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
                if(data && status === 200 && data.message === "Success") {
                    if(mounted) setFormikInitial(data.data)
                }
            }
            catch (e) {
                if(!axios.isCancel(e)) throw e
            }
        }
        return () => {
            mounted = false
            source.cancel()
        }
    }, [])

    // formik instance for the form
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formikInitial,
        validationSchema: Yup.object({
            plateNumber: Yup.string()
                .required('Vehicle plate number is required!')
                .matches(/^([a-zA-Z]{1,3}|((?!0*-)[0-9]{1,3}))-[0-9]{4}(?<!0{4})/, "Please enter a valid plate number!"),
            brand: Yup.string()
                .required('Vehicle brand is required!'),
            model: Yup.string()
                .required('Vehicle model is required!'),
            imageUrl: Yup.string()
                .required('Vehicle image is required!'),
        }),
        onSubmit: async values => {
            const tokenId = toast.loading("Please wait...")
            setLoading(true)
            try {
                const {data, status} = await vehicleApi.create(values)
                if(data && status === 201 && data.message === "Success") {
                    toast.update(tokenId, { render: "Vehicle is created successfully!", type: "success",
                        isLoading: false, autoClose: true });
                }
            }
            catch (e) {
                console.log(e)
                toast.update(tokenId,
                    { render: e.message, type: "error",
                        isLoading: false, autoClose: true });
            }
            finally {
                setLoading(false)
            }
        }
    })

    const setImageName = async (fieldName, fileName) => {
        await formik.setFieldValue(fieldName, fileName)
    }

    return (
        <FormTemplate formName={id ? `Update Vehicle Details ${formik.values['plateNumber'] || ""}` : 'Add New Vehicle'}>
            <form className="h-full" onSubmit={formik.handleSubmit}>
                <InputWithValidation
                    formik={formik}
                    id="plateNumber"
                    name="plateNumber"
                    label="Plate Number"
                    type="text"
                    className="mb-4"
                    disabled={!!id}
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
                    imageUrl={formik.values ? formik.values.imageUrl || "" : ""}
                    formikFieldName={'imageUrl'}
                    setFileName={setImageName}
                />
                <div className="mt-8 flex justify-end">
                    <ModelBody modalText={"Do you want to proceed?"}
                               buttonText={id ? 'Update Vehicle' : 'Add Vehicle'}
                               loading={loading} color={'warn'} onClick={
                        async (e) => {
                            e.preventDefault()
                            let errorMessage = ''
                            const result = await formik.validateForm()
                            errorMessage = Object.values(result).join('\n')
                            if (errorMessage) toast.error(errorMessage)
                            await formik.handleSubmit()
                        }
                    } />
                </div>
            </form>
        </FormTemplate>
    )
}