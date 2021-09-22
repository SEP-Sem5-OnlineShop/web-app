import React, {useEffect} from "react";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {useFormik} from "formik";
import * as Yup from "yup";
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import {useParams} from "react-router-dom"
import {productApi} from "../../../../api";

import { useSelector } from "react-redux"

import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import './style.css'

import CardTemplate from "../../../../components/card/template";
import InputWithValidation from "../../../../components/input-with-validation";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

export default function AddProduct () {

    let {id} = useParams()
    const role = useSelector(state => state.user.role)
    const userData = useSelector(state => state.user.userData)

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
            description: '',
            imageThumbnail: 'http://localhost:3000/app/product/add',
            image: 'http://localhost:3000/app/product/add'
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
            try {
                const {data, status} = await productApi.create(values)
                if (status === 200) {
                    console.log(data)
                }
            }
            catch (e) {

            }
            console.log(values)
        },
    });

    useEffect(() => {
        if(id) {
            const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState)
            }
        }
    },[])

    useEffect(() => {
        // formik.setFieldValue("description", editorState)
        formik.setFieldValue("description",(draftToHtml(convertToRaw(editorState.getCurrentContent()))))
    },[editorState])

    return (
        <React.Fragment>
            {role === "vendor" ?
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
                            {/*<label className='font-medium text-secondary text-sm xs:text-lg md:text-base'>Images</label>*/}
                            {/*<FilePond*/}
                            {/*    files={files}*/}
                            {/*    onupdatefiles={setFiles}*/}
                            {/*    allowMultiple={true}*/}
                            {/*    maxFiles={3}*/}
                            {/*    server="/api"*/}
                            {/*    name="files"*/}
                            {/*    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'*/}
                            {/*/>*/}
                            <div className="flex justify-end">
                                <button type="submit" className="p-2 text-white rounded bg-textLight">Submit</button>
                            </div>
                        </form>
                    </CardTemplate>
                </div>
            </div> 
            : <div>Spin</div>}
        </React.Fragment>
    )
}