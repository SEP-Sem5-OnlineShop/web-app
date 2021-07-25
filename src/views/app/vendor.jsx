import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import VendorComponent from '../../components/vendorComponent/vendorComponent';

const Vendor = () => {
    
    return ( 
        <>
        <Navbar />
        <div className="px-12 py-12">
            <h1 className="text-3xl text-secondary flex flex-col">Vendor1</h1>
            <div className="p-2 flex flex-row bg-accent">

            </div>
            <div className="mt-12 flex flex-col">
                <h2 className="text-2xl text-secondary flex flex-col">Backery Items</h2>
                <div className="flex flex-col mt-8">
                    <div className="flex justify-between">
                        <VendorComponent />
                        <VendorComponent />
                    </div>
                    <div className="flex justify-between">
                        <VendorComponent />
                        <VendorComponent />
                    </div>
                </div>
            </div>
            <div className="mt-12 flex flex-col">
                <h2 className="text-2xl text-secondary flex flex-col">Fruits</h2>
                <div className="flex flex-col mt-8">
                    <div className="flex justify-between">
                        <VendorComponent />
                        <VendorComponent />
                    </div>
                    <div className="flex justify-between">
                        <VendorComponent />
                        <VendorComponent />
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
     );
}
 
export default Vendor;