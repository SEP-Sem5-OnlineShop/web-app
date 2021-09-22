import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import Step1 from "./step1";
import {AnimatePresence, motion} from "framer-motion";
import Step2 from "./step2";
import Step3 from "./step3";
import CardTemplate from "../../../../components/card/template";
import {vendorRequestApi} from "../../../../api/index"
import {useHistory} from "react-router-dom"
import InputWithValidation from "../../../../components/input-with-validation";

export default function VendorRegistration() {

    const [activeTab, setActiveTab] = useState(1)
    const [showTelephoneForm, setShowTelephoneForm] = useState(true)
    const [submitButtonLoading, setSubmitButtonLoading] = useState(false)
    const [submitButtonLoading2, setSubmitButtonLoading2] = useState(false)
    const [state, setState] = useState("create")
    const history = useHistory()

    const formik = useFormik({
        initialValues: {
            fullName: '',
            telephone: '',
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
        },
        validationSchema: Yup.object({
            fullName: Yup.string()
                .required('Required'),
            telephone: Yup.string()
                .required('Required')
                .matches('^(?:0|94|\\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$',
                    'Telephone number did not matched with requirements!'),
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
            try {
                setSubmitButtonLoading(true)
                if(state === "create") {
                    const data = await vendorRequestApi.create(values)
                }
                else {
                    const data = await vendorRequestApi.update(values)
                }
                setSubmitButtonLoading(false)
                formik.resetForm()
                setShowTelephoneForm(true)
                // addToast('Sent your request successfully!', { appearance: 'success' });
            }
            catch(error) {
                // addToast(error.response.data.message, { appearance: 'error' });
            }
        },
    });

    const formik2 = useFormik({
        initialValues: {
            telephone: '',
        },
        validationSchema: Yup.object({
            telephone: Yup.string()
                .required('Required')
                .matches('^(?:0|94|\\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$',
                    'Telephone number did not matched with requirements!'),
        }),
        onSubmit: async values => {
            // await dispatch(thunks.user.localSignIn(values.telephone, values.password))
            try {
                setSubmitButtonLoading2(true)
                const {data, status} = await vendorRequestApi.getRequest(values)
                setSubmitButtonLoading2(false)
                if(status===200) {
                    if(data.data) {
                        Object.keys(data.data).forEach(item => {
                            formik.setFieldValue(`${item}`, data.data[item])
                        })
                        data.data.vehicles.forEach((item, index) => {
                            Object.keys(item).forEach(key => {
                                formik.setFieldValue(`vehicles.${index}.${key}`, item[key])
                            })
                        })
                        setState("update")
                    }
                    await formik.setFieldValue("telephone", formik2.values.telephone)
                    setShowTelephoneForm(false)
                    setActiveTab(1)
                }
            }
            catch(error) {
                // addToast(error.response.data.message, { appearance: 'error' });
            }
        },
    })

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
                <div className="w-full lg:w-1/2 xl:w-1/3 flex flex-col items-center justify-center p-8">
                    {showTelephoneForm ? <>
                        <div className="w-full text-3xl font-medium">Enter your mobile phone number</div>
                        <CardTemplate>
                            <form className="h-full" onSubmit={formik2.handleSubmit}>
                                <InputWithValidation
                                    formik={formik2}
                                    id="telephone"
                                    name="telephone"
                                    label="Telephone Number"
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
                    </> :
                    <>
                        <div className="w-full text-3xl font-medium">Register As a Vendor</div>
                        <CardTemplate>
                            <form className="h-full" onSubmit={formik.handleSubmit}
                                  style={{minHeight: 472}}>
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