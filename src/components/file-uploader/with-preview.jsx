import React, { useEffect, useState } from "react"
import { getFileUrl, deleteBlobFile } from "../../api/azure-storage-blob"

import FileUploader from "./index"

export default function FileUploaderWithPreview(props) {
    const [showFilePreview, setShowFilePreview] = useState(true)
    const [image, setImage] = useState(null)
    useEffect(() => {
        if(!props.imageUrl) setShowFilePreview(false)
    }, [])
    return (
        <div>
            {
                showFilePreview ?
                    <div className="w-full flex flex-col items-center justify-center">
                        {/* <div className={`${props.previewCircle ? "rounded-full w-60 h-60" : "w-full h-48"} bg-center bg-cover`}
                            style={{ backgroundImage: `url(${getFileUrl(props.imageUrl)})` }} /> */}
                            <img className="h-60" src={getFileUrl(props.imageUrl)} />
                        <div className="w-full flex justify-center mt-4">
                            <button onClick={() => {deleteBlobFile(props.imageUrl); setShowFilePreview(false); 
                            if(props.setFileName) props.setFileName(props.formikFieldName, "")}}
                                className="rounded-lg mr-2 p-2 text-white bg-textLight">Remove</button>
                        </div>
                    </div> :
                    <div>
                        <FileUploader
                            files={image}
                            setFiles={setImage}
                            maxFiles={props.maxFiles || 1}
                            allowMultiple={props.allowMultiple || false}
                            circle={props.circle || false}
                            label={props.label || 'Upload your image'}
                            setFileName={props.setFileName}
                            formikFieldName={props.formikFieldName}
                        />
                    </div>
            }
        </div>
    )
}