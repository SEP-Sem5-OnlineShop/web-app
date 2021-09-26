import React, {useEffect, useRef} from "react"

import LoginForm from "./login-form";
import AuthTemplate from "../template";

export default function Index(props) {
    const formRef = useRef(null)

    useEffect(() => {
        console.log(formRef.page)
    })

    return (
        <AuthTemplate
            withImage={true}
            upperText1='Login'
            upperText2='Access you account'
            bottomText1='Don’t have an account?'
            bottomText2='Register'
            login={true}
        >
            <LoginForm />
        </AuthTemplate>
    )
}