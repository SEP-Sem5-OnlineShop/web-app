import React from "react"

export default function CardDesktop(props) {
    return (
        <div>

            <div class="px-4">
                <div class="bg-primary p-6 rounded-lg shadow-lg font-semibold">
                    <div>{props.content}</div>
                </div>
            </div>

        </div>

    )
}