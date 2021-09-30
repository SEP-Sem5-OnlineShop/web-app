import React, { useState, useEffect } from "react";
import { setIn, useFormik } from "formik";
import * as Yup from "yup";
import Step1 from "./step1";
import { AnimatePresence, motion } from "framer-motion";
import Step2 from "./step2";
import Step3 from "./step3";
import CardTemplate from "../../../../components/card/template";
import { vendorRequestApi } from "../../../../api/index"
import { useHistory, useParams } from "react-router-dom"
import InputWithValidation from "../../../../components/input-with-validation";
import { toast } from "react-toastify";

export default function VendorRegistration() {

    const [activeTab, setActiveTab] = useState(1)
    const [showTelephoneForm, setShowTelephoneForm] = useState(true)
    const [showEmailSentMessage, setShowEmailSentMessage] = useState(false)
    const [submitButtonLoading, setSubmitButtonLoading] = useState(false)
    const [submitButtonLoading2, setSubmitButtonLoading2] = useState(false)
    const [state, setState] = useState("create")
    const [images, setImages] = useState({
        image1: null,
        image2: null,
        image3: null
    })
    const [documents, setDocuments] = useState({
        document1: null,
        document2: null,
        document3: null
    })
    const [initialState, setInitialState] = useState({
        firstName: '',
        lastName: '',
        telephone: '',
        email1: '',
        nic: '',
        regionToBeCovered: '',
        permitId: '',
        shopName: '',
        address: '',
        numberOfVehicles: '1',
        vehicles: [
            {
                plateNumber: '',
                brand: '',
                model: '',
                imageUrl: '',
                documentUrl: ''
            },
            {
                plateNumber: '',
                brand: '',
                model: '',
                imageUrl: '',
                documentUrl: ''
            },
            {
                plateNumber: '',
                brand: '',
                model: '',
                imageUrl: '',
                documentUrl: ''
            },
        ]
    })
    const history = useHistory()
    const { token } = useParams()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialState,
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required('Required'),
            lastName: Yup.string()
                .required('Required'),
            telephone: Yup.string()
                .required('Required')
                .matches('^(?:0|94|\\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$',
                    'Telephone number did not matched with requirements!'),
            email1: Yup.string()
                .required('Required').email('Not a valid email'),
            nic: Yup.string()
                .required('Required'),
            regionToBeCovered: Yup.string()
                .required('Required'),
            permitId: Yup.string()
                .required('Required'),
            shopName: Yup.string()
                .required('Required'),
            address: Yup.string()
                .required('Required'),
            numberOfVehicles: Yup.string()
                .required('Required'),
        }),
        onSubmit: async values => {
            // await dispatch(thunks.user.localSignIn(values.telephone, values.password))
            values.email = values.email1
            const id = toast.loading("Please wait...")
            try {
                setSubmitButtonLoading(true)
                if (state === "create") {
                    const { data, status } = await vendorRequestApi.create(values)
                    if (status === 201) {
                        formik.resetForm()
                        toast.update(id, {
                            render: "Successfully added your request! An email will be sent to your email address informing you the status of the request",
                            type: "success", isLoading: false, autoClose: true
                        });
                        setShowTelephoneForm(true)
                    }
                }
                else {
                    const { data, status } = await vendorRequestApi.update(values)
                    if (status === 200) {
                        formik.resetForm()
                        setShowTelephoneForm(true)
                        toast.update(id, {
                            render: "Successfully updated your request! An email will be sent to your email address informing you the status of the request",
                            type: "success", isLoading: false, autoClose: true
                        });
                        history.push("/")
                    }
                }
                setSubmitButtonLoading(false)
                // addToast('Sent your request successfully!', { appearance: 'success' });
            }
            catch (error) {
                toast.update(id, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: true });
                // addToast(error.response.data.message, { appearance: 'error' });
            }
        },
    });

    const formik2 = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Email address is required!')
                .email('Enter a valid email address!'),
        }),
        onSubmit: async values => {
            // await dispatch(thunks.user.localSignIn(values.telephone, values.password))
            const id = toast.loading("Please wait...")
            try {
                setSubmitButtonLoading2(true)
                const { data, status } = await vendorRequestApi.verifyRequest(values)
                if (data.data) {
                    setShowEmailSentMessage(true)
                    setShowTelephoneForm(false)
                    toast.update(id, { render: "Please check your email inbox!", type: "success", isLoading: false, autoClose: true });
                }
                else {
                    setShowTelephoneForm(false)
                    toast.update(id, { render: "No previous requests found!", type: "info", isLoading: false, autoClose: true });
                }
                setSubmitButtonLoading2(false)
                formik.setFieldValue("email1", formik2.values.email)
            }
            catch (error) {
                toast.update(id, { render: "Something went wrong!", type: "error", isLoading: false, autoClose: true });
                // addToast(error.response.data.message, { appearance: 'error' });
            }
        },
    })

    useEffect(async () => {
        if (token) {
            setState("update")
            try {
                const { data, status } = await vendorRequestApi.getRequest({ token: token })
                if (status === 200) {
                    if (data.data) {
                        setInitialState({ ...initialState, ...data.data, email1: data.data.email })
                        // Object.keys(data.data).forEach(item => {
                        //     formik.setFieldValue(`${item}`, data.data[item])
                        //     formik.setFieldValue('email1', data.data['email'])
                        // })
                        // data.data.vehicles.forEach((item, index) => {
                        //     Object.keys(item).forEach(key => {
                        //         console.log(`vehicles.${index}.${key}`, item[key])
                        //         formik.setFieldValue(`vehicles.${index}.${key}`, item[key])
                        //     })
                        // })
                        // formik.setFieldValue('vehicles.0.plateNumber', 'UP-5445')
                        // setState("update")
                    }
                    await formik.setFieldValue("email", formik2.values.email)
                    setShowTelephoneForm(false)
                    setActiveTab(1)
                }
            }
            catch (e) {

            }
        }
    }, [])

    const initialAnimation = {
        opacity: 0,
        x: '-100px',
        display: 'none'
    }
    const middleAnimation = {
        opacity: 1,
        x: '0',
        display: 'block'
    }
    const exitAnimation = {
        opacity: 0,
        x: '100px',
        display: 'none'
    }

    return (
        <React.Fragment>
            <div className="flex justify-center">
                <div className="w-full lg:w-1/2 xl:w-1/3 flex flex-col items-center justify-center p-0 lg:p-8">
                    {showTelephoneForm && <>
                        <div className="w-full text-3xl font-medium">Enter your email address</div>
                        <CardTemplate>
                            <form className="h-full" onSubmit={formik2.handleSubmit}>
                                <InputWithValidation
                                    formik={formik2}
                                    id="email"
                                    name="email"
                                    label="Email Address"
                                    type="text"
                                    className="mb-4"
                                />
                                <button
                                    type="submit"
                                    className={`p-2 text-white rounded bg-textLight`}>
                                    {submitButtonLoading2 ? 'Loading' : 'Submit'}
                                </button>
                            </form>
                        </CardTemplate>
                    </>}
                    {showEmailSentMessage &&
                        <div>
                            <div className="w-full text-3xl font-medium">An email was sent</div>
                            <div className="mt-8">An email was sent. Please check your inbox and use the link embeded there to edit your previous request!</div>
                        </div>}
                    {(!showTelephoneForm && !showEmailSentMessage) && <>
                        <div className="w-full text-3xl font-medium">Register As a Vendor</div>
                        <CardTemplate>
                            <form className="h-full" onSubmit={formik.handleSubmit}
                                style={{ minHeight: 472 }}>
                                <AnimatePresence>
                                    {
                                        activeTab === 1 &&
                                        <motion.div key="tab1" initial={initialAnimation} animate={middleAnimation} exit={exitAnimation} className="h-full">
                                            <Step1 formik={formik} setActiveTab={setActiveTab} />
                                        </motion.div>
                                    }
                                    {
                                        activeTab === 2 &&
                                        <motion.div key="tab2" initial={initialAnimation} animate={middleAnimation} exit={exitAnimation} className="h-full">
                                            <Step2 formik={formik} setActiveTab={setActiveTab} />
                                        </motion.div>
                                    }
                                    {
                                        activeTab === 3 &&
                                        <motion.div key="tab3" initial={initialAnimation} animate={middleAnimation} exit={exitAnimation} className="h-full">
                                            <Step3 formik={formik} setActiveTab={setActiveTab}
                                                submitButtonLoading={submitButtonLoading} setSubmitButtonLoading={setSubmitButtonLoading}
                                            />
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </form>
                        </CardTemplate>
                    </>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}