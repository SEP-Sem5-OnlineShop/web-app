import React, { useEffect } from "react";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useFormik } from "formik";
import * as Yup from "yup";
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { useParams } from "react-router-dom"
import { productApi } from "../../../../api";

import { useSelector } from "react-redux"

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

import CardTemplate from "../../../../components/card/template";
import InputWithValidation from "../../../../components/input-with-validation";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export default function AddDriver({ edit }) {

    let { id } = useParams()
    const role = useSelector(state => state.user.role)
    const userData = useSelector(state => state.user.userData)

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    const [mainImage, setMainImage] = React.useState([])
    const [mainThumbnailImage, setThumbnailImage] = React.useState([])

    const formik = useFormik({
        initialValues: {
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
            try {
                const { data, status } = await productApi.create(values)
                if (status === 200) {
                    console.log(data)
                }
            }
            catch (e) {

            }
            console.log(values)
        },
    });

    useEffect(async () => {
        if (edit) {
            const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
            try {
                const { data, status } = await productApi.get(id)
                if (data.data) {
                    const contentBlock = htmlToDraft(data.data.description);
                    if (contentBlock) {
                        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                        const editorState = EditorState.createWithContent(contentState);
                        setEditorState(editorState)
                    }
                }
            }
            catch (e) {

            }
        }
    }, [])

    useEffect(() => {
        // formik.setFieldValue("description", editorState)
        formik.setFieldValue("description", (draftToHtml(convertToRaw(editorState.getCurrentContent()))))
    }, [editorState])

    return (
        <React.Fragment>
            {role === "vendor" ?
                <div className="flex justify-center">
                    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
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
                                <label className='font-medium text-secondary text-sm xs:text-lg md:text-base'>License File</label>
                                <FilePond
                                    files={mainImage}
                                    onupdatefiles={setMainImage}
                                    allowMultiple={true}
                                    maxFiles={1}
                                    server="/api"
                                    name="files"
                                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                />
                            </form>
                        </CardTemplate>
                    </div>
                </div>
                : <div>Spin</div>}
        </React.Fragment>
    )
}