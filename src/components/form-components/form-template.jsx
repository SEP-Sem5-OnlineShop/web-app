import React from "react";
import CardTemplate from "../card/template";

export default function FormTemplate({formName, children}) {
    return (
        <div className="flex justify-center">
            <div className="w-full lg:w-2/3 xl:w-1/2 flex flex-col items-center justify-center p-0 lg:p-8">
                <div className="w-full text-2xl lg:text-3xl font-medium">{formName}</div>
                <CardTemplate>
                    {children}
                </CardTemplate>
            </div>
        </div>
    )
}