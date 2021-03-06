import React, {forwardRef} from "react";
import InputWithValidation from "../../../components/input-with-validation";
import {useFormik} from "formik";
import * as Yup from "yup";
import {thunks} from "../../../store/index";
import {useDispatch} from "react-redux";
import {motion} from "framer-motion";

import { useHistory } from "react-router-dom";

const LoginForm = (props, ref) => {

    const history = useHistory();
    const dispatch = useDispatch()

    const [loading, setLoading] = React.useState(false)

    const formik = useFormik({
        initialValues: {
            telephone: '',
            password: '',
        },
        validationSchema: Yup.object({
            telephone: Yup.string()
                .required('Required')
                .matches('^(?:0|94|\\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$',
                    'Telephone number did not matched with requirements!'),
            password: Yup.string()
                .required('Required')
        }),
        onSubmit: async values => {
            setLoading(true)
            try {
                await dispatch(thunks.user.localSignIn(values.telephone, values.password))
            }
            catch(e) {
                console.log("error")
            }
            setLoading(false)
            // history.push("/")
        },
    });

    return (

        <motion.form layout className='w-5/6 flex flex-col justify-center items-center' onSubmit={formik.handleSubmit}>
            <InputWithValidation
                label='Telephone Number'
                id='telephone'
                name='telephone'
                type='telephone'
                formik={formik}
                className='w-full'
            />
            <InputWithValidation
                label='Password'
                id='password'
                name='password'
                type='password'
                formik={formik}
                className='w-full'
            />
            <button type="submit" className="w-full py-3 mt-2 rounded-xl bg-primary text-black font-bold">
                {loading ? 'Loading...' : 'Submit'}
            </button>
        </motion.form>
    );
};
export default forwardRef(LoginForm)