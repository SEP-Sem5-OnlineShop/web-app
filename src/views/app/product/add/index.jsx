import React, { useEffect } from "react";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

// importing plugins
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import * as Yup from "yup";

// importing hooks
import { useParams } from "react-router-dom"
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux"
import { actions } from "../../../../store/index"

// importing created components
import CardTemplate from "../../../../components/card/template";
import InputWithValidation from "../../../../components/input-with-validation";
import FileUploader from "../../../../components/file-uploader"
import FileUploaderWithPreview from "../../../../components/file-uploader/with-preview"

// importing api
import { productApi } from "../../../../api";

// importing css files
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { toast } from "react-toastify";

export default function AddProduct({ edit }) {

    let { id } = useParams()
    const role = useSelector(state => state.user.role)
    const userData = useSelector(state => state.user.userData)

    const dispatch = useDispatch()

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );
    const [mainImage, setMainImage] = React.useState([])
    const [mainThumbnailImage, setThumbnailImage] = React.useState([])

    const [formikInitial, setFormikInitial] = React.useState({
        name: '',
        price: '',
        discount: '',
        category: '',
        description: '',
        imageThumbnail: '',
        image: ''
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formikInitial,
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Required'),
            price: Yup.number('Must be a number')
                .required('Required'),
            discount: Yup.number('Must be a number'),
        }),
        onSubmit: async values => {
            console.log(values)
            const description = draftToHtml(convertToRaw(editorState.getCurrentContent()))
            await formik.setFieldValue("description", description)
            const id = toast.loading("Please wait...")
            try {
                const { data, status } = await productApi.create(values)
                if (status === 201 && data.message === "Success") {
                    const contentBlock = htmlToDraft("");
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const editorState = EditorState.createWithContent(contentState);
                    setEditorState(editorState)
                    toast.update(id, { render: "Product is created successfully!", type: "success", isLoading: false, autoClose: true });
                    dispatch(actions.user.setUserData(data.data || userData))
                    formik.resetForm()
                }
            }
            catch (e) {
                toast.update(id, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: true });
            }
        },
    });

    const setImageName = (fieldName, fileName) => {
        formik.setFieldValue(fieldName, fileName)
    }

    useEffect(async () => {
        if (edit) {
            const html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
            try {
                const { data, status } = await productApi.get(id)
                if (data.data) {
                    setFormikInitial({ ...data.data, name: data.data.product_name, imageThumbnail: data.data.imageThumbnailUrl, image: data.data.imageUrl })
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
                                <label className='font-medium text-secondary text-sm xs:text-lg md:text-base'>Description</label>
                                <Editor editorState={editorState}
                                    toolbarClassName="toolbarClassName mt-1 rounded-md"
                                    wrapperClassName="wrapperClassName"
                                    editorClassName="bg-white min-h-300 px-2 mb-4 rounded-md"
                                    placeholder="Add your product description here..."
                                    onEditorStateChange={setEditorState}
                                />
                                <label className='font-medium text-secondary text-sm xs:text-lg md:text-base'>Product Page Image</label>
                                <FileUploaderWithPreview
                                    label={'Upload your an image thumbnail here'}
                                    imageUrl={formik.values.image || ""}
                                    formikFieldName={'image'}
                                    setFileName={setImageName}
                                />
                                <label className='font-medium text-secondary text-sm xs:text-lg md:text-base'>Thumbnail Image</label>
                                <FileUploaderWithPreview
                                    label={'Upload your main image here'}
                                    imageUrl={formik.values.imageThumbnail || ""}
                                    formikFieldName={'imageThumbnail'}
                                    setFileName={setImageName}
                                />
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