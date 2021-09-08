// import { useHistory } from 'react-router-dom';
import ProductComponent from '../../components/productComponent';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RatingComponent from '../../components/ratingComponent';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';


const VendorScreen = () => {
    const { id: vendor_id } = useParams();
    const [vendor_name, setVendor_name] = useState("Yummy Backers");
    const [vendor_description, setVendor_description] = useState("Healthy eating means eating a variety of foods that give you the nutrients you need to maintain your health, feel good, and have energy.");
    const [rating, setRating] = useState('4.0');
    const [ratingCount, setRatingCount] = useState(50);


    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const dispatch = useDispatch();
    // const productList = useSelector(state => state.productList);
    // const { loading, error, products } = productList;
    // useEffect(() => {
    //     dispatch(listProducts());
    //   }, [dispatch]);

    useEffect(() => {
        const abortConst = new AbortController();
        fetch(`http://localhost:8000/api/products`, { signal: abortConst.signal })
            .then(res => {
                if(!res.ok){
                    throw Error('data does not exist')
                }
                return res.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setLoading(false);
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
        <div>
        {loading ? (
            <LoadingBox></LoadingBox>
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <div className="w-full min-h-screen overflow-x-hidden bg-contain bg-center relative">
                <div style={{ backgroundImage: `url("/img/vendor.jpg")` }} className="rounded-t-3xl lg:rounded-t-6xl opacity-100 w-full h-full absolute top-0 left-0 z-0"/>
                <div className="h-52 w-full flex px-10 items-end relative z-10">
                    <span className="ml-8 my-6 text-3xl sm:text-5xl text-black font-semibold absolute">{vendor_name}</span>
                    <span className="ml-7 my-6 text-3xl sm:text-5xl text-white font-semibold relative z-10">{vendor_name}</span>
                </div>

                <div className="w-full bg-white relative z-10" style={{minHeight: 'calc(100vh - 11rem)'}}>
                    <div className="pl-4 pt-2 sm:pl-20 sm:pt-6">
                        <RatingComponent rating={rating} />
                        {rating} ({ratingCount}+)
                        <p className="mt-2">{vendor_description}</p>
                    </div>

                    <div className="px-2 py-4 sm:px-12 sm:py-8">
                        { error && <MessageBox>{error}</MessageBox>}
                        { loading && <LoadingBox></LoadingBox>}
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
        )}
        </div>
    );
}
 
export default VendorScreen;