import React, {forwardRef, useState} from "react";
import InputWithValidation from "../../../components/input-with-validation";
import {useFormik} from "formik";
import * as Yup from "yup";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";

import {authApi} from "../../../api/index"

const RegisterForm = (props, ref) => {

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            telephone: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required('Required').min(2, 'First name is too short!').max(50, 'First name is too long!'),
            lastName: Yup.string()
                .required('Required').min(2, 'First name is too short!').max(50, 'First name is too long!'),
            telephone: Yup.string()
                .required('Required')
                .matches('^(?:0|94|\\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$',
                    'Telephone number did not matched with requirements!'),
            password: Yup.string()
                .required('Required')
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                ),
            confirmPassword: Yup.string()
                .required('Required').oneOf([Yup.ref('password'), null], 'Password not matched!'),
        }),
        onSubmit: async values => {
            await authApi.register({
                firstName: values.firstName,
                lastName: values.lastName,
                telephone: values.telephone,
                role: "customer",
                location: values.location,
                password: values.password,
                password_confirmation: values.confirmPassword
            })
        },
    });

    return (
                <form className='w-5/6 flex flex-col justify-center items-center' onSubmit={formik.handleSubmit}>
                    <AnimateSharedLayout>
                        <motion.div className="w-full" layout>
                            <ItemTemplate title='Your Details' isOpen={true}>
                                <InputWithValidation
                                    label='First Name'
                                    id='firstName'
                                    name='firstName'
                                    type='firstName'
                                    formik={formik}
                                />
                                <InputWithValidation
                                    label='Last Name'
                                    id='lastName'
                                    name='lastName'
                                    type='lastName'
                                    formik={formik}
                                />
                                <InputWithValidation
                                    label='Telephone Number'
                                    id='telephone'
                                    name='telephone'
                                    type='telephone'
                                    formik={formik}
                                />
                            </ItemTemplate>
                            <ItemTemplate title='Password' disabled={
                                formik.errors.firstName || formik.errors.lastName || formik.errors.telephone ||
                                !formik.values.firstName || !formik.values.lastName || !formik.values.telephone
                            }>
                                <InputWithValidation
                                    label='Password'
                                    id='password'
                                    name='password'
                                    type='password'
                                    formik={formik}
                                />
                                <InputWithValidation
                                    label='Confirm Password'
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    type='confirmPassword'
                                    formik={formik}
                                />
                                <button type="submit" className="w-full py-4 mt-2 rounded-xl bg-primary text-black font-bold">
                                    Submit
                                </button>
                            </ItemTemplate>
                        </motion.div>
                    </AnimateSharedLayout>
                </form>
    );
};

function ItemTemplate(props) {

    const [isOpen, setIsOpen] = useState(props.isOpen || false);

    const toggleOpen = () => setIsOpen(!isOpen);

    return (
        <motion.div layout>
            <button type="button" disabled={props.disabled || false} onClick={toggleOpen}
                    className="w-full p-2 mt-2 rounded-xl bg-primary text-black font-bold disabled:opacity-50">
                {props.title}
            </button>
            <AnimatePresence>
                {
                    isOpen &&
                    <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {props.children}
                    </motion.div>
                }
            </AnimatePresence>
        </motion.div>
    )
}

export default forwardRef(RegisterForm)