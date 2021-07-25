import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import AlertComponent from '../../components/alertComponent/alertComponent';

const Alert = () => {
    
    return ( 
        <>
        <Navbar />
        <div className="px-12 py-12">
            <h1 className="text-3xl text-secondary flex flex-col">Alerts</h1>
            <div className="flex flex-col mt-8">
                <div className="flex justify-between">
                    <AlertComponent />
                    <AlertComponent />
                </div>
                <div className="flex justify-between">
                    <AlertComponent />
                    <AlertComponent />
                </div>
            </div>
        </div>
        <Footer />
        </>
     );
}
 
export default Alert;