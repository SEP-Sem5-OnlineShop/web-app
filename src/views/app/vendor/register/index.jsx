import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import Step1 from "./step1";
import {AnimatePresence, motion} from "framer-motion";
import Step2 from "./step2";
import Step3 from "./step3";
import CardTemplate from "../../../../components/card/template";
import {vendorApi} from "../../../../api/index"

export default function VendorRegistration() {

    const [activeTab, setActiveTab] = useState(1)

    const formik = useFormik({
        initialValues: {
            name: '',
            telephoneNumber: '',
            nicNumber: '',
            region: '',
            permitId: '',
            shopName: '',
            address: '',
            vehicles: '1',
            vehicleNo1: '',

        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Required'),
            telephoneNumber: Yup.string()
                .required('Required')
                .matches('^(?:0|94|\\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$',
                    'Telephone number did not matched with requirements!'),
            nicNumber: Yup.string()
                .required('Required'),
            region: Yup.string()
                .required('Required'),
            permitId: Yup.string()
                .required('Required'),
            shopName: Yup.string()
                .required('Required'),
            address: Yup.string()
                .required('Required'),
            vehicleNo1: Yup.string()
                .required('Required'),
            // vehicleNo2: Yup.string()
            //     .required('Required'),
        }),
        onSubmit: async values => {
            // await dispatch(thunks.user.localSignIn(values.telephone, values.password))
            try {
                const data = await vendorApi.request(values)
                console.log(data)
                console.log('safdadsf')
            }
            catch(e) {

            }
        },
    });

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
                    <div className="w-full text-3xl font-medium">Register As a Vendor</div>
                    <CardTemplate>
                        <form className="h-full" onSubmit={formik.handleSubmit}>
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
                                        <Step3 formik={formik} setActiveTab={setActiveTab} />
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </form>
                    </CardTemplate>
                </div>
            </div>
        </React.Fragment>
    )
}