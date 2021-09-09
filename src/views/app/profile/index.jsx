import React, {useRef} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import { FilePond } from 'react-filepond';
import EditableCardItem from "../../../components/card/editable-card-item/editable-card-item";
import CardTemplate from "../../../components/card/template";

export default function Profile() {

    const ref = useRef()
    const nameFormik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(2, 'Too short!')
                .max(20, 'Too long!')
                .required('Required'),
        }),
        onSubmit: async values => {
            // await dispatch(thunks.user.localSignIn(values.telephone, values.password))
        },
    });
    const emailFormik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Required')
                .email('Email is invalid')
        }),
        onSubmit: async values => {
            // await dispatch(thunks.user.localSignIn(values.telephone, values.password))
        },
    });

    return (
        <React.Fragment>
            <div className="flex justify-center">
                <div className="w-full lg:w-1/2 xl:w-1/3 flex flex-col items-center justify-center p-8">
                    <div className="w-full text-3xl font-medium">My Account</div>
                    <div className="w-1/3 mt-4">
                        <FilePond
                            ref={ref}
                            allowMultiple={false}
                            stylePanelLayout="circle"
                        />
                    </div>
                    <CardTemplate>
                        <EditableCardItem
                            formik={nameFormik}
                            label="Display Name"
                            id="name"
                            name="name"
                            fieldValue="Darshana Sandaurwan"
                        />
                        <EditableCardItem
                            formik={emailFormik}
                            label="Email"
                            id="email"
                            name="email"
                            fieldValue="dsandaruwan7@gmail.com"
                        />
                    </CardTemplate>
                    <CardTemplate>
                        <div className="">
                            <div className="text-text font-medium">Password</div>
                            <div className="flex justify-between">
                                <span>*************</span>
                                <button className="bg-buttonColor text-secondary font-semibold rounded py-1 px-4">Change</button>
                            </div>
                        </div>
                    </CardTemplate>
                </div>
            </div>
        </React.Fragment>
    )
}