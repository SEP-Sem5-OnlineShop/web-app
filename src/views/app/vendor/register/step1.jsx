import React from "react";
import InputWithValidation from "../../../../components/input-with-validation";

export default function Step1(props) {

    const comProps = {
        formik: props.formik || {},
        setActiveTab: props.setActiveTab || (() => {})
    }

    return (
        <React.Fragment>
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className="mb-5"><span className="text-xl text-medium">Vendor Details</span></div>
                    <InputWithValidation
                        formik={comProps.formik}
                        id="fullName"
                        name="fullName"
                        label="Name"
                        type="text"
                        className="mb-4"
                    />
                    <InputWithValidation
                        formik={comProps.formik}
                        id="telephone"
                        name="telephone"
                        label="Telephone Number"
                        type="text"
                        className="mb-4"
                    />
                    <InputWithValidation
                        formik={comProps.formik}
                        id="email1"
                        name="email1"
                        label="Email Address"
                        type="text"
                        className="mb-4"
                        disabled={true}
                    />
                    <InputWithValidation
                        formik={comProps.formik}
                        id="nic"
                        name="nic"
                        label="NIC Number"
                        type="text"
                        className="mb-4"
                    />
                    <InputWithValidation
                        formik={comProps.formik}
                        id="address"
                        name="address"
                        label="Address"
                        type="text"
                        className="mb-4"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="button"
                        onClick={
                            () =>
                                comProps.setActiveTab(2)
                        }
                        disabled={comProps.formik.errors.name}
                        className="p-2 text-white rounded bg-textLight disabled:bg-accent w-1/2">Next</button>
                </div>
            </div>
        </React.Fragment>
    )
}