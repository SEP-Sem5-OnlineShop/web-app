import React from "react"
import Loader from "react-loader-spinner";

export default function LoadingButton(props) {

    const comProps = {
        text: props.text || "",
        type: props.type || "button",
        loading: props.loading || false,
        disabled: props.disabled || false,
        color: props.color || "bg-textLight",
        fontColor: props.fontColor || "text-white",
        onClick: props.onClick || (() => {}),
        loaderColor: props.loaderColor || "#fff"
    }

    return (
        <button
            type={comProps.type}
            onClick={async (e) => await comProps.onClick(e)}
            className={`flex justify-center rounded-lg mr-2 p-2 ${!comProps.disabled ? comProps.color : "text-secondary"}
        ${comProps.fontColor}`}
            style={{minWidth: 96}}>
            {
                comProps.loading ?
                    <Loader
                        type="TailSpin"
                        color={comProps.loaderColor}
                        height={16 }
                        width={16}
                    /> :
                    comProps.text
            }
        </button>
    )
}