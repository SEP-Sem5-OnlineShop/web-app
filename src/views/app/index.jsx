import React from "react"
import InputWithValidation from "../../components/input-with-validation";

export default function Login() {

    

    return (
        

                        <form onSubmit={formik.handleSubmit} className="w-3/4">
                            <InputWithValidation
                                label='Telephone Number'
                                id='telephone'
                                name='telephone'
                                type='text'
                                formik={formik}
                            />
                            <InputWithValidation
                                label='Password'
                                id='password'
                                name='password'
                                type='password'
                                formik={formik}
                            />
                            <button type="submit" className="w-full p-4 mt-2 rounded-xl bg-primary text-black font-bold">Register</button>
                        </form>
                    
    )
}