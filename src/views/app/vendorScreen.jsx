// import { useHistory } from 'react-router-dom';
import ProductComponent from './productComponent';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const VendorScreen = () => {
    const { id: vendor_id } = useParams();
    const [vendor_name, setVendor_name] = useState("Yummy Backers");
    const [products, setProducts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    // const history = useHistory();

    useEffect(() => {
        const abortConst = new AbortController();
        fetch(`http://localhost:8000/products`, { signal: abortConst.signal })
            .then(res => {
                if(!res.ok){
                    throw Error('data does not exist')
                }
                return res.json();
            })
            .then(data => {
                setProducts(data);
                setIsLoading(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setIsLoading(false);
                    setError(err.message);
                }
            });
        return () => abortConst.abort();
    }, []);

    // const handleRemove = (id) => {
    //     fetch('http://localhost:8000/alerts/'+id , {
    //         method: 'DELETE'
    //     }).then(() => {
    //         history.go(0);
    //     })
    // };

    return (
            <div className="w-full min-h-screen overflow-x-hidden bg-contain bg-center relative">
                <div style={{ backgroundImage: `url("/img/vendor.jpg")` }} className="rounded-t-3xl lg:rounded-t-6xl opacity-100 w-full h-full absolute top-0 left-0 z-0"/>
                <div className="h-44 w-full flex px-10 items-end relative z-10">
                    <span className="mx-8 my-8 text-3xl sm:text-5xl text-black font-semibold absolute">{vendor_name}</span>
                    <span className="mx-7 my-8 text-3xl sm:text-5xl text-white font-semibold relative z-10">{vendor_name}</span>
                </div>

                <div className="w-full bg-white lg:rounded-t-6xl relative z-10" style={{minHeight: 'calc(100vh - 11rem)'}}>
                    <div className="pl-4 pt-4 sm:pl-24 sm:pt-12">
                        Rating placeholder
                    </div>

                    <div className="px-2 py-4 sm:px-12 sm:py-12">
                        {/* error */}
                        { error && <div className="mt-4">{ error}</div>}
                        {/* loding */}
                        { isLoading && <div className="mt-4">Loding...</div>}
                        <div className="mt-4 sm:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-10">
                            {products && <>
                                {products.map((product) => (
                                    <ProductComponent product={product} vendor_id={vendor_id} key={product.product_id} />
                                ))}
                            </>}
                        </div>
                    </div>

                </div>
            </div>
    );
}
 
export default VendorScreen;