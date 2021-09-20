import React from "react"
import logo from "../../assets/svg/logo/logo-264A75.svg";
import { useHistory } from "react-router-dom";

const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2
      }
    }),
    closed: {
      clipPath: "circle(30px at 40px 40px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
};

export default function InnerPageLayout(props) {
    let history = useHistory()
    return (
        <React.Fragment>
            <div className="w-screen min-h-screen overflow-x-hidden">
                <div className="w-full min-h-screen overflow-x-hidden bg-contain bg-center relative">
                    {/* <div className="bg-food-style opacity-40 w-full h-full absolute top-0 left-0 z-0" /> */}
                    <div className="h-20 bg-white w-full fixed flex px-10 top-0 left-0 justify-between items-center z-10">
                        <img className="cursor-pointer" style={{height: 80}} onClick={() => history.push("/")} src={logo} alt="logo" />

                        <div className="flex items-center">
                            <ul className="flex mr-10">
                                <li className="mx-4 cursor-pointer" onClick={() => history.push("/app/register/vendor")}>Vendor Registration</li>
                                <li className="mx-4 cursor-pointer" onClick={() => history.push("/app/product/add")}>Add Product</li>
                                <li className="mx-4 cursor-pointer" onClick={() => history.push("/app/alert")}>Alerts</li>
                            </ul>
                            <button onClick={() => history.push("/auth/login")} className="rounded-lg px-4 py-2 bg-textLight text-white">
                                Login | Register</button>
                        </div>
                    </div>

                    <div className="w-full bg-white relative p-8"
                        style={{ minHeight: 'calc(100vh - 80px)', marginTop: '80px' }}>
                        {props.children}
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}