import React, {useEffect} from "react";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

// importing plugins
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import * as Yup from "yup";

// importing hooks
import {useParams} from "react-router-dom"
import {useFormik} from "formik";
import { useSelector } from "react-redux"

// importing created components
import CardTemplate from "../../../../components/card/template";
import InputWithValidation from "../../../../components/input-with-validation";
import FileUploader from "../../../../components/file-uploader"

// importing api
import {productApi} from "../../../../api";

// importing css files
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function AddProduct ({edit}) {

    let {id} = useParams()
    const role = useSelector(state => state.user.role)
    const userData = useSelector(state => state.user.userData)

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    const [mainImage, setMainImage] = React.useState([])
    const [mainThumbnailImage, setThumbnailImage] = React.useState([])

    const formik = useFormik({
        initialValues: {
            name: 'asdf',
            price: '45',
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
            discount: Yup.string(),
            category: Yup.string(),
            description: Yup.string()
                .required('Required'),
        }),
        onSubmit: async values => {
            try {
                const {data, status} = await productApi.create({...values,
                    image: mainImage[0].serverId,
                    imageThumbnail: mainThumbnailImage[0].serverId
                })
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
        if(edit) {
            const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
            try {
                const {data, status} = await productApi.get(id)
                if(data.data) {
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
    },[])

    useEffect(() => {
        // formik.setFieldValue("description", editorState)
        formik.setFieldValue("description",(draftToHtml(convertToRaw(editorState.getCurrentContent()))))
    },[editorState])

    return (
        <React.Fragment>
            {role === "vendor" ?
            <div className="flex justify-center">
                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-0 lg:p-8">
                    <div className="w-full text-2xl lg:text-3xl font-medium">Add New product</div>
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
                            <label className='font-medium text-secondary text-sm xs:text-lg md:text-base'>Product Page Image</label>
                            <FileUploader allowMultiple={false} files={mainImage} setFiles={setMainImage} maxFiles={1} />
                            <label className='font-medium text-secondary text-sm xs:text-lg md:text-base'>Thumbnail Image</label>
                            <FileUploader allowMultiple={false} files={mainThumbnailImage} setFiles={setThumbnailImage} maxFiles={1} />
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