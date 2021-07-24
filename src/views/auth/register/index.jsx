import React, {useEffect, useRef} from "react"

import AuthTemplate from "../template";
import RegisterForm from "./register-form";

export default function Index(props) {
    const formRef = useRef(null)

    useEffect(() => {
        console.log(formRef.page)
    })

    return (
        <AuthTemplate
            withImage={true}
            upperText1='Register'
            upperText2='Create your free account'
            bottomText1='Already Registered?'
            bottomText2='Sing In'
            login={false}
        >
            <RegisterForm />
        </AuthTemplate>
    )
}