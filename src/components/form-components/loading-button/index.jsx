import React from "react"
import Loader from "react-loader-spinner";

export default function LoadingButton(props) {

    const comProps = {
        text: props.text || "",
        type: props.type || "button",
        loading: props.loading || false,
        disabled: props.disabled || false,
        color: props.color || "textLight",
        fontColor: props.fontColor || "white",
        onClick: props.onClick || (() => {}),
        loaderColor: props.loaderColor || "#fff",
        outlined: props.outlined || false,
    }

    return (
        <button
            type={comProps.type}
            onClick={async (e) => await comProps.onClick(e)}
            className={`flex justify-center rounded mr-2 px-2 py-1
        ${comProps.outlined ? `ring-2 ring-${comProps.color} hover:bg-${comProps.color} hover:text-${comProps.fontColor} text-${comProps.color}` : 
                `${!comProps.disabled ? `bg-${comProps.color}` : "text-secondary"} text-${comProps.fontColor}` }`}
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