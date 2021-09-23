import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import RatingComponent from '../../../components/customer/ratingComponent';
import ReviewComponent from '../../../components/customer/reviewComponent';
import LoadingBox from '../../../components/customer/loadingBox';
import MessageBox from '../../../components/customer/messageBox';
import { useSelector } from 'react-redux';

const ProductScreen = () => {
    const { id: vendor_id } = useParams();
    const { pid: product_id } = useParams();
    const productStrings = useSelector(state => state.language.languageFile.productpage)

    const [product, setProduct] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState(false);


  useEffect(() => {
    async function detailsProduct(product_id){
        setLoading(true);
        try {
            // const { data } = await Axios.get(`app/customer/product/${product_id}`);
            const data = {
                _id:'1',
                product_name: 'Burger with some',
                vendor_id: '613a23c0dd295c38362b2cbe',
                image: '/img/item1.png',
                description: 'ingredients: flour, vegetables, cheese, ketchup, mayoneese   description description description description description description description description description description description description description description description description description',
                price: 100,
                stock: 10,
                status: 'available',
                rating: 4.5,
                numReviews: 2,
                reviews: [
                    {
                        _id:1,
                        rating: 4,
                        comment: 'good product good product good product good product good product good product good product',
                        customer: '613a23c0dd295c38362b2cbe',
                        customer_name: 'Asta',
                        image: '/img/vendor.jpg',
                    },
                    {
                        _id:2,
                        rating: 5,
                        comment: 'good product good product good product good product good product good product good product good product good product good product good product good product good product',
                        customer: '613a23c0dd295c38362b2cbe',
                        customer_name: 'Yuno',
                        image: '/img/vendor.jpg',
                    }
                ]
            };
            setProduct(data);
            setLoading(false);
            setError(null);
        } catch (err) {
            setLoading(false);
            console.log(err);
            setError(err);
        };
    };
    if (vendor_id && product_id) {
        detailsProduct(vendor_id);
    };
  }, [vendor_id, product_id, loading, error]);

    return (
        <>
        {(loading ) ? (
            <LoadingBox></LoadingBox>
        ) : (error) ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-16">
            <div className="relative">
                <div  className="w-full h-full bg-center bg-cover rounded-xl" style={{ minHeight: '50vh', backgroundImage: `url(${product.image})` }}>
                </div>

                <div className="absolute flex top-3 right-3">
                    <div className="p-4 bg-textLight bg-opacity-60 rounded-xl">
                        <button onClick={() => setAlert(!alert)}>
                            <FaBell color={alert ? "#ffc107" : "#e4e5e9" } size={25} />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <span className="text-3xl sm:text-5xl font-bold text-textLight">{product.product_name}</span>
                <div className="mt-4">
                    <RatingComponent rating={product.rating} size={25} />
                    {product.rating} ({product.numReviews}+)
                </div>
                <div className="mt-4 sm:mt-8">
                    <span className="text-secondary">{product.description}</span>
                </div>
            </div>
            <div>
                <div className="text-xl text-textLight font-medium">{productStrings.reviews}</div>
                <div className="mt-4">
                    {product.reviews && <>
                        {product.reviews.map((review) => (
                            <ReviewComponent key={review._id} review={review} />
                        ))}
                    </>}
                </div>
            </div>
        </div>
        )}
        </>
    )
};
 
export default ProductScreen;