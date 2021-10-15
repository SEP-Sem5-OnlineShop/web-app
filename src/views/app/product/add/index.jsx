import React, {useEffect, useState} from "react";
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
import InputWithValidation from "../../../../components/form-components/input-with-validation";
import FileUploaderWithPreview from "../../../../components/form-components/file-uploader/with-preview"

// importing api
import { productApi } from "../../../../api";

// importing css files
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { toast } from "react-toastify";
import ModelBody from "../../../../components/modals/modelBody";
import FormTemplate from "../../../../components/form-components/form-template";

export default function AddProduct({ edit }) {

    let { id } = useParams()
    const role = useSelector(state => state.user.role)
    const userData = useSelector(state => state.user.userData)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()

    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    const [formikInitial, setFormikInitial] = React.useState({
        product_name: '',
        price: '',
        discount: '',
        category: '',
        description: '',
        imageThumbnailUrl: '',
        imageUrl: ''
    })

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: formikInitial,
        validationSchema: Yup.object({
            product_name: Yup.string()
                .required('Required'),
            price: Yup.number('Must be a number')
                .required('Required'),
            discount: Yup.number('Must be a number'),
            imageUrl: Yup.string()
                .required("Image is required"),
            imageThumbnailUrl: Yup.string()
                .required("Image thumbnail is required"),
        }),
        onSubmit: async values => {
            const description = draftToHtml(convertToRaw(editorState.getCurrentContent()))
            await formik.setFieldValue("description", description)
            setLoading(true)
            try {
                if(!id) {
                    const { data, status } = await productApi.create(values)
                    if (status === 201 && data.message === "Success") {
                        const contentBlock = htmlToDraft("");
                        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                        const editorState = EditorState.createWithContent(contentState);
                        setEditorState(editorState)
                        toast.success("Product is successfully created!")
                        dispatch(actions.user.setUserData(data.data || userData))
                        formik.resetForm()
                    }
                }
                else {
                    const { data, status } = await productApi.update(values, id)
                    if (status === 201 && data.message === "Success") {
                        toast.success("Product is successfully updated!")
                        dispatch(actions.user.setUserData(data.data || userData))
                    }
                }
            }
            catch (e) {
                console.log(e)
                toast.error("Something went wrong!")
            }
            finally {
                setLoading(false)
            }
        },
    });

    const setImageName = async (fieldName, fileName) => {
        await formik.setFieldValue(fieldName, fileName)
    }

    const resetDescription = () => {
        const contentBlock = htmlToDraft("");
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState)
    }

    useEffect(async () => {
        if (edit) {
            try {
                const { data, status } = await productApi.get(id)
                if (data.data) {
                    setFormikInitial(data.data)
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
            <FormTemplate formName={'Add New Product'} >
                <form className="h-full">
                    <InputWithValidation
                        formik={formik}
                        id="name"
                        name="product_name"
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
                        label={'Upload your an image here'}
                        imageUrl={formik.values.imageUrl || ""}
                        formikFieldName={'imageUrl'}
                        setFileName={setImageName}
                    />
                    <label className='font-medium text-secondary text-sm xs:text-lg md:text-base'>Thumbnail Image</label>
                    <FileUploaderWithPreview
                        label={'Upload your main image thumbnail  here'}
                        imageUrl={formik.values.imageThumbnailUrl || ""}
                        formikFieldName={'imageThumbnailUrl'}
                        setFileName={setImageName}
                    />
                    <div className="flex justify-end">
                        <ModelBody modalText={"Do you want to proceed?"}
                                   loading={loading}
                                   buttonText={id ? 'Update Vehicle' : 'Add Vehicle'} color={'warn'}
                                   onClick={async (e) => {
                                       e.preventDefault()
                                       const errors = await formik.validateForm()
                                       const errorMessage = Object.values(errors).join('\n')
                                       if(errorMessage) toast.error(errorMessage)
                                       else await formik.handleSubmit()
                                   }}
                        />
                    </div>
                </form>
            </FormTemplate>
        </React.Fragment>
    )
}