import React from "react"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useHistory } from "react-router-dom"
import CardTemplate from "../../components/card/template";
import InputWithValidation from "../../components/input-with-validation";
import { driverApi } from "../../api";

export default function CreatePassword() {
    const { token } = useParams()
    const history = useHistory()
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Required')
                .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                ),
            confirmPassword: Yup.string()
                .required('Required').oneOf([Yup.ref('password'), null], 'Password not matched!'),
        }),
        onSubmit: async values => {
            try {
                const { data, status } = await driverApi.createPassword({ ...values, token: token })
                if (status === 200) {
                    history.push("/auth/login")
                }
            }
            catch (e) {

            }
            console.log(values)
        },
    });
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-full text-3xl font-medium">Create your password</div>
            <div className="w-full w-full lg:w-1/2 flex flex-col items-center justify-center p-8">
                <CardTemplate>

                    <form>
                        <InputWithValidation
                            formik={formik}
                            label="Password"
                            id="password"
                            name="password"
                            type="password"
                        />
                        <InputWithValidation
                            formik={formik}
                            label="Confirm Password"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                        />
                        <div className="mt-8 flex justify-end">
                            <button onClick={(e) => { e.preventDefault(); formik.handleSubmit() }} type="submit"
                                className="rounded-lg p-2 text-white bg-textLight">Submit</button>
                        </div>
                    </form>
                </CardTemplate>
            </div>
        </div>
    )
}