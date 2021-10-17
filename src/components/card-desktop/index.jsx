import React from "react"

export default function CardDesktop(props) {
    return (
        <div>

            <div className="px-4">
                <div className="bg-primary p-6 rounded-lg shadow-lg font-semibold">
                    <div>{props.content}</div>
                </div>
            </div>

        </div>

    )
}