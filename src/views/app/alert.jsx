import AlertComponent from './alertComponent';
import logo from "../../assets/svg/logo/logo-264A75.svg"

const Alert = () => {
    return (
        /**
         * header test remove later
         */
        <div className="w-screen min-h-screen overflow-x-hidden md:bg-primary">
            <div className="w-full min-h-screen overflow-x-hidden bg-contain bg-center relative">
                <div className="bg-food-style opacity-40 w-full h-full absolute top-0 left-0 hidden md:block"/>
                <div className="h-44 w-full md:flex px-10 items-center hidden">
                    <img className="h-3/4" src={logo} alt="logo" />
                </div>
                <div className="w-full bg-white rounded-t-3xl lg:rounded-t-6xl relative flex flex-col" style={{minHeight: 'calc(100vh - 11rem)'}}>


                    <div className="px-2 py-4 sm:px-12 sm:py-12">
                        <h1 className="text-3xl text-secondary flex flex-col">Alerts</h1>
                        <div className="mt-4 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-10">
                                <AlertComponent />
                                <AlertComponent />
                                <AlertComponent />
                                <AlertComponent />
                                <AlertComponent />
                                <AlertComponent />
                                <AlertComponent />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}
 
export default Alert;