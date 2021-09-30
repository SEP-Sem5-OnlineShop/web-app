import React from "react"

export default function CardDesktop(props) {
    return (
        <div>

            <img src="https://source.unsplash.com/random/350x350" alt=" random imgee" class="w-full object-cover object-center rounded-lg shadow-md" />

            <div class="relative px-4 -mt-16  ">
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <div>{props.content}</div>
                </div>
            </div>

        </div>

    )
}