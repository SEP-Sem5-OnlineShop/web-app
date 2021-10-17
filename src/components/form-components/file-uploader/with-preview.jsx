import React, { useEffect, useState } from "react"
import { getFileUrl } from "../../../api/azure-storage-blob"

import FileUploader from "./index"

import LoadingButton from "../loading-button";

export default function FileUploaderWithPreview(props) {

    const comProps = {
        imageUrl: props.imageUrl || "",
        maxFiles: props.maxFiles || 1,
        allowMultiple: props.allowMultiple || false,
        circle: props.circle || false,
        label: props.label || false,
        setFileName: props.setFileName || (()=>{}),
        formikFieldName: props.formikFieldName || "",
    }

    const [showFilePreview, setShowFilePreview] = useState(true)
    const [image, setImage] = useState(null)
    const [removeButtonLoading, setRemoveButtonLoading] = useState(false)
    useEffect(() => {
        if(!comProps.imageUrl) setShowFilePreview(false)
        else setShowFilePreview(true)
    }, [comProps.imageUrl])

    const handleCLick = async () => {
        setRemoveButtonLoading(true)
        try {
            await comProps.setFileName(comProps.formikFieldName, "")
            setImage(null)
        }
        catch (e) {

        }
        finally {
            setRemoveButtonLoading(false)
            setShowFilePreview(false);
        }
    }
    return (
        <div>
            {
                showFilePreview ?
                    <div className="w-full flex flex-col items-center justify-center">
                        {
                            comProps.imageUrl ? <img className="h-60 mt-4 rounded" src={getFileUrl(comProps.imageUrl)}
                                                     alt={comProps.imageUrl} /> : null
                        }
                        <div className="w-full flex justify-center mt-4">
                           <LoadingButton outlined={true} color={'danger'} text="Remove Image" onClick={handleCLick}
                                          loading={removeButtonLoading} />
                        </div>
                    </div> :
                    <div>
                        <FileUploader
                            files={image}

                            setFiles={setImage}
                            maxFiles={comProps.maxFiles}
                            allowMultiple={comProps.allowMultiple}
                            circle={comProps.circle}
                            label={comProps.label}
                            setFileName={comProps.setFileName}
                            formikFieldName={comProps.formikFieldName}
                        />
                    </div>
            }
        </div>
    )
}