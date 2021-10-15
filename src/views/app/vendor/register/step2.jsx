import React, { useState } from "react";
import FileUploaderWithPreview from "../../../../components/form-components/file-uploader/with-preview";
import InputWithValidation from "../../../../components/form-components/input-with-validation";

export default function Step2(props) {

    const comProps = {
        formik: props.formik || {},
        setActiveTab: props.setActiveTab || (() => { })
    }

    const setImageName = (fieldName, fileName) => {
        comProps.formik.setFieldValue(fieldName, fileName)
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
                        label="shopName"
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
                        id="regionToBeCovered"
                        name="regionToBeCovered"
                        label="Region to be Covered"
                        type="text"
                        className="mb-4"
                    />
                    <label className='font-medium text-secondary text-sm xs:text-lg md:text-base'>Thumbnail Image for mobile shop</label>
                    <div className="my-4">
                        <FileUploaderWithPreview
                            label={props.label || 'Upload your an image thumbnail here'}
                            imageUrl={comProps.formik.values.imageUrl || ""}
                            formikFieldName={'imageUrl'}
                            setFileName={setImageName}
                        />
                    </div>
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