import React from "react";
import logo from "../../assets/svg/logo/logo-264A75.svg";

export default function MainLayout(props) {
    return (
        <div className="w-screen min-h-screen overflow-x-hidden bg-primary">
            <div className="w-full min-h-screen overflow-x-hidden bg-contain bg-center relative">
                <div className="bg-food-style opacity-40 w-full h-full absolute top-0 left-0 z-0"/>
                <div className="h-44 w-full flex px-10 items-center relative z-10">
                    <img className="h-3/4" src={logo} alt="logo" />
                </div>

                <div className="w-full bg-white rounded-t-3xl lg:rounded-t-6xl relative z-10 flex flex-col items-center"
                     style={{minHeight: 'calc(100vh - 11rem)'}}>
                    {props.children}
                </div>

            </div>
        </div>
    )
}