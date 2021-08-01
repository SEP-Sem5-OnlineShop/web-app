import React, {useRef, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {thunks} from "../../../store";
import {useDispatch} from "react-redux";
import { FilePond, registerPlugin } from 'react-filepond';
import InputWithValidation from "../../../components/input-with-validation";
import {AnimatePresence, motion} from "framer-motion";

export default function Profile() {

    const dispatch = useDispatch()
    const ref = useRef()
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min('Too short for a name')
                .required('Required'),
            password: Yup.string()
                .required('Required')
        }),
        onSubmit: async values => {
            // await dispatch(thunks.user.localSignIn(values.telephone, values.password))
        },
    });

    const [name, setName] = useState(false)
    const [email, setEmail] = useState(false)
    const [password, setPassword] = useState(false)

    return (
        <React.Fragment>
            <div className="flex justify-center">
                <motion.div layout className="w-1/3 flex flex-col items-center justify-center p-8">
                    <motion.div className="w-full text-3xl font-medium">My Account</motion.div>
                    <motion.div className="w-1/3 mt-4">
                        <FilePond
                            ref={ref}
                            allowMultiple={false}
                            stylePanelLayout="circle"
                        />
                    </motion.div>
                    <motion.div layout className="w-full bg-cardColor rounded-xl shadow-sm mt-12 p-6">
                        <div className="mb-8">
                            <div className="text-text font-medium">Display Name</div>
                            {
                                !name ?
                                    <div className="flex justify-between">
                                        <span>Darshana Sandaruwan</span>
                                        <button onClick={() => setName(true)}
                                                className="bg-buttonColor text-secondary font-semibold rounded
                                                py-1 px-4 h-8">Edit</button>
                                    </div>
                                    :
                                    <div className="flex justify-between">
                                        <InputWithValidation
                                            id="name"
                                            name="name"
                                            formik={formik}
                                        />
                                        <button onClick={() => setName(false)}
                                                className="bg-buttonColor text-secondary font-semibold rounded
                                                py-1 px-4 h-8">Submit</button>
                                    </div>

                            }
                        </div>
                        <div className="">
                            <div className="text-text font-medium">Email</div>
                            <div className="flex justify-between">
                                <span>dsandaruan7@gmail.com</span>
                                <button className="bg-buttonColor text-secondary font-semibold rounded py-1 px-4">Edit</button>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div layout className="w-full bg-cardColor rounded-xl shadow-sm mt-6 p-6">
                        <div className="">
                            <div className="text-text font-medium">Password</div>
                            <div className="flex justify-between">
                                <span>*************</span>
                                <button className="bg-buttonColor text-secondary font-semibold rounded py-1 px-4">Change</button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </React.Fragment>
    )
}