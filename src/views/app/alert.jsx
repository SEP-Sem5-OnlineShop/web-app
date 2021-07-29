import AlertComponent from './alertComponent';

const Alert = () => {
    
    return (
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
     );
}
 
export default Alert;