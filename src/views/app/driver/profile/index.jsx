import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FilePond } from 'react-filepond';
import InputWithValidation from "../../../../components/input-with-validation";
import CardTemplate from "../../../../components/card/template";
import { useDispatch, useSelector } from "react-redux";
import { getFileUrl } from "../../../../api/azure-storage-blob";
import { driverApi } from "../../../../api"
import { actions } from "../../../../store/index"
import FileUploader from "../../../../components/file-uploader"

export default function Profile() {

    const userData = useSelector(state => state.user.userData) || {}
    const dispatch = useDispatch()

    const [showFileUploader, setShowFileUploader] = useState(true)
    const [imageUrl, setImageUrl] = useState('')
    const [image, setImage] = useState([])
    const [disabled, setDisabled] = useState(true)

    const ref = useRef()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: userData || {
            firstName: '',
            lastName: '',
            telephone: '',
            email: '',
            licenseNumber: '',
            licenseFileUrl: 'http://localhost:3000/app/product/add',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required('Required'),
            lastName: Yup.string()
                .required('Required'),
            telephone: Yup.string()
                .required('Required'),
            email: Yup.string()
                .required('Required'),
            licenseNumber: Yup.string()
                .required('Required'),
        }),
        onSubmit: async values => {
            console.log(values)
            // await dispatch(thunks.user.localSignIn(values.telephone, values.password))
        },
    });
    useEffect(async () => {
        formik.setFieldValue("licenseNumber", userData.driver.licenseNumber)
        try {
            const { data, status } = await driverApi.getImage()
            if (data.data && status === 200 && data.message == "Success") {
                setImageUrl(data.data)
                setShowFileUploader(false)
            }
        }
        catch (e) {

        }
    }, [userData])

    useEffect(() => {
        setShowFileUploader(true)
    }, [image])

    const updateImage = async (imageUrl) => {
        try {
            const result = await driverApi.updateImage({ imageUrl: imageUrl })
            dispatch(actions.user.setUserData({
                ...userData,
                driver: {
                    ...userData.driver,
                    imageUrl: imageUrl
                }
            }))
            if (imageUrl)
                setShowFileUploader(false)
            else
                setShowFileUploader(true)
        }
        catch (e) {

        }
    }

    return (
        <React.Fragment>
            <div className="flex flex-col justify-center items-center">
                <div className="w-full text-3xl font-medium">My Account</div>
                <div className="w-full lg:w-2/3 flex flex-col items-center justify-center p-8">
                    <div className="w-1/3 mt-4 flex flex-col items-center">

                        <div className="w-full">
                            {
                                !showFileUploader ?
                                    <div>
                                        <div className="rounded-full w-60 h-60 bg-center bg-cover"
                                            style={{ backgroundImage: `url(${getFileUrl(imageUrl)})` }} />
                                        <div className="w-full flex justify-center mt-4">
                                            <button onClick={() => updateImage("")}
                                                className="rounded-lg mr-2 p-2 text-white bg-textLight">Remove</button>
                                        </div>
                                    </div> :
                                    <div>
                                        <FileUploader
                                            files={image}
                                            setFiles={setImage}
                                            maxFiles={1}
                                            allowMultiple={false}
                                            circle={true}
                                            label='Upload your image'
                                        />
                                        <div className="flex justify-center">
                                            <button onClick={() => updateImage(image[0] ? image[0].serverId : "")}
                                                className="rounded-lg p-2 text-white bg-textLight">Update</button>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                    <form className="w-full">
                        <CardTemplate>
                            <InputWithValidation
                                formik={formik}
                                label="First Name"
                                id="firstName"
                                name="firstName"
                                disabled={disabled}
                            />
                            <InputWithValidation
                                formik={formik}
                                label="Last Name"
                                id="lastName"
                                name="lastName"
                                disabled={disabled}
                            />
                            <InputWithValidation
                                formik={formik}
                                label="Telephone"
                                id="telephone"
                                name="telephone"
                                disabled={true}
                            />
                            <InputWithValidation
                                formik={formik}
                                label="Email"
                                id="email"
                                name="email"
                                disabled={true}
                            />
                            <InputWithValidation
                                formik={formik}
                                label="License Number"
                                id="licenseNumber"
                                name="licenseNumber"
                                disabled={true}
                            />
                            <div className="mt-8 flex justify-end">
                                {
                                    disabled ?
                                        <button onClick={(e) => { e.preventDefault(); setDisabled(false) }} type="button"
                                            className="rounded-lg p-2 text-white bg-textLight">Update Details</button> :
                                        <button onClick={(e) => { e.preventDefault(); formik.handleSubmit(); setDisabled(true) }} type="submit"
                                            className="rounded-lg p-2 text-white bg-textLight">Submit</button>
                                }
                            </div>
                        </CardTemplate>
                    </form>
                    <CardTemplate>
                        <div className="">
                            <div className="text-text font-medium">Password</div>
                            <div className="flex justify-between">
                                <span>*************</span>
                                <button className="bg-buttonColor text-secondary font-semibold rounded py-1 px-4">Change</button>
                            </div>
                        </div>
                    </CardTemplate>
                </div>
            </div>
        </React.Fragment>
    )
}