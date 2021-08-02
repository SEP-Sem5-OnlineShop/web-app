import React from "react";
import InputWithValidation from "../../../../components/input-with-validation";

export default function Step2(props) {

    const comProps = {
        formik: props.formik || {},
        setActiveTab: props.setActiveTab || (() => {})
    }

    return (
        <React.Fragment>
            <div className="flex flex-col justify-between h-full">
                <div>
                    <div className="mb-5"><span className="text-xl text-medium">Mobile Shop Details</span></div>
                    <InputWithValidation
                        formik={comProps.formik}
                        id="shopName"
                        name="shopName"
                        label="Product Type"
                        type="text"
                        className="mb-4"
                    />
                    <InputWithValidation
                        formik={comProps.formik}
                        id="permitId"
                        name="permitId"
                        label="Permit Id"
                        type="text"
                        className="mb-4"
                    />
                    <InputWithValidation
                        formik={comProps.formik}
                        id="region"
                        name="region"
                        label="Region to be Covered"
                        type="text"
                        className="mb-4"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        onClick={() => comProps.setActiveTab(1)}
                        className="p-2 text-white rounded bg-textLight">Back</button>
                    <button
                        type="button"
                        onClick={() => comProps.setActiveTab(3)}
                        className="p-2 text-white rounded bg-textLight">Next</button>
                </div>
            </div>
        </React.Fragment>
    )
}