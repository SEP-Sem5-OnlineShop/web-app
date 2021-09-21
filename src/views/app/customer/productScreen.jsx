import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import RatingComponent from '../../../components/customer/ratingComponent';
import Review from '../../../components/review'

const ProductScreen = () => {
    const { id: vendor_id } = useParams();
    const { pid: product_id } = useParams();

    const [product, setProduct] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState(false);


  useEffect(() => {
    async function detailsProduct(product_id){
        setLoading(true);
        try {
            // const { data } = await Axios.get(`/products/${product_id}`);
            const data = {
                _id:'1',
                product_name: 'Burger with some',
                seller: '613a23c0dd295c38362b2cbe',
                image: '/img/item1.png',
                price: 100,
                stock: 10,
                status: 'available',
                rating: 4.5,
                numReviews: 2,
                reviews: [
                    {
                        comment: 'good product fasdlfjlsa skdflasdlf jasdflkajdf lafjklasj',
                        rating: 4,
                        customer: '613a23c0dd295c38362b2cbe',
                        customer_name: 'asta',
                        image: '/img/vendor.jpg',
                    },
                    {
                        comment: 'good product fasdlfjlsa skdflasdlf jasdflkajdf lafjklasj',
                        rating: 5,
                        customer: '613a23c0dd295c38362b2cbe',
                        customer_name: 'asta',
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
                    <span className="text-secondary">
                        description description description description description description description description description description description description description description description description description description description description description description description description description description description description description.
                    </span>
                </div>
            </div>
            <div>
                <div className="text-xl text-textLight font-medium">Reviews</div>
                <div className="mt-4">
                    <div className=""><Review /></div>
                    <div className="mt-8"><Review /></div>
                </div>
            </div>
        </div>
    )
};
 
export default ProductScreen;