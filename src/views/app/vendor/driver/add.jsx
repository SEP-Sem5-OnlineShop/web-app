import React, { useEffect } from "react";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { driverApi } from "../../../../api";

import { useSelector } from "react-redux"

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import CardTemplate from "../../../../components/card/template";
import InputWithValidation from "../../../../components/form-components/input-with-validation";
import { toast } from "react-toastify";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export default function AddDriver({ edit }) {

    const role = useSelector(state => state.user.role)

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            telephone: '',
            email: '',
            licenseNumber: '',
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
            const id = toast.loading("Please wait...")
            try {
                const { data, status } = await driverApi.create(values)
                if (status === 201) {
                    toast.update(id, { render: "New driver account is added and an email was sent!", type: "success", isLoading: false, autoClose: true });
                    formik.resetForm()
                }
            }
            catch (e) {
                toast.update(id, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: true });

            }
        },
    });

    useEffect(() => {
        // formik.setFieldValue("description", editorState)
        formik.setFieldValue("description", (draftToHtml(convertToRaw(editorState.getCurrentContent()))))
    }, [editorState])

    return (
        <React.Fragment>
            {role === "vendor" ?
                <div className="flex justify-center">
                    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-0 lg:p-8">
                        <div className="w-full text-3xl font-medium">Add New Driver</div>
                        <CardTemplate>
                            <form className="h-full" onSubmit={formik.handleSubmit}>
                                <InputWithValidation
                                    formik={formik}
                                    id="firstName"
                                    name="firstName"
                                    label="First Name"
                                    type="text"
                                    className="mb-4"
                                />
                                <InputWithValidation
                                    formik={formik}
                                    id="lastName"
                                    name="lastName"
                                    label="Last Name"
                                    type="text"
                                    className="mb-4"
                                />
                                <InputWithValidation
                                    formik={formik}
                                    id="telephone"
                                    name="telephone"
                                    label="Telephone Number"
                                    type="text"
                                    className="mb-4"
                                />
                                <InputWithValidation
                                    formik={formik}
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type="text"
                                    className="mb-4"
                                />
                                <InputWithValidation
                                    formik={formik}
                                    id="licenseNumber"
                                    name="licenseNumber"
                                    label="License Number"
                                    type="text"
                                    className="mb-4"
                                />
                                <div className="mt-8 flex justify-end">
                                    <button data-testid={'submit-button'} onClick={(e) => { e.preventDefault(); formik.handleSubmit() }}
                                        className="rounded-lg p-2 text-white bg-textLight">Submit</button>
                                </div>
                            </form>
                        </CardTemplate>
                    </div>
                </div>
                : <div>Spin</div>}
        </React.Fragment>
    )
}