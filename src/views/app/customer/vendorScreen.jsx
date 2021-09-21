import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import ProductComponent from '../../../components/customer/productComponent';
import RatingComponent from '../../../components/customer/ratingComponent';
import LoadingBox from '../../../components/customer/loadingBox';
import MessageBox from '../../../components/customer/messageBox';


const VendorScreen = () => {
  const { id: vendor_id } = useParams();

  const [vendor, setVendor] = useState('')
  const [products, setProducts] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(null);

  useEffect(() => {
    async function detailsVendor(vendor_id){
      setLoading(true);
      try {
        // const { data } = await Axios.get(`/vendors/${vendor_id}`);
        const data = {
          vendor_id: "1",
          vendor_name: "Yummy Backers",
          vendor_description: "Healthy eating means eating a variety of foods that give you the nutrients you need to maintain your health, feel good, and have energy.",
          image:"/img/vendor.jpg",
          rating: '4.0',
          ratingCount: 50,
        };
        setVendor(data);
        setLoading(false);
        setError(null);
      } catch (err) {
        setLoading(false);
        console.log(err);
        setError(err);
      };
    };

    async function listProducts(vendor_id){
      try {
        // const { data } = await Axios.get(`/products/${vendor_id}`);
        const data = [
          { _id:'1',
            product_name: 'Burger with some',
            seller: '613a23c0dd295c38362b2cbe',
            image: '/img/item1.png',
            price: 100,
            stock: 10,
            status: 'available',
            rating: 4.5,
            numReviews: 10,
          },
          {
            _id:'2',
            product_name: 'Burger with some',
            seller: '613a23c0dd295c38362b2cbe',
            image: '/img/item1.png',
            price: 100,
            stock: 10,
            status: 'available',
            rating: 4.5,
            numReviews: 10,
          },
          {
            _id:'3',
            product_name: 'Burger with some',
            seller: '613a23c0dd295c38362b2cbe',
            image: '/img/item1.png',
            price: 100,
            stock: 10,
            status: 'available',
            rating: 4.5,
            numReviews: 10,
          },
          {
            _id:'4',
            product_name: 'Burger with some',
            seller: '613a23c0dd295c38362b2cbe',
            image: '/img/item1.png',
            price: 100,
            stock: 10,
            status: 'available',
            rating: 4.5,
            numReviews: 10,
          },
          {
            _id:'5',
            product_name: 'Burger with some',
            seller: '613a23c0dd295c38362b2cbe',
            image: '/img/item1.png',
            price: 100,
            stock: 10,
            status: 'available',
            rating: 4.5,
            numReviews: 10,
          },
        ];
        setProducts(data);
        setLoading1(false);
        setError1(null);
      } catch (err) {
        setLoading1(false);
        console.log(err);
        setError1(err);
      };
    };

    if (vendor_id) {
      detailsVendor(vendor_id);
    };
    if (loading & !error) {
      listProducts(vendor_id);
    };
  }, [vendor_id, loading, error]);

  // const dispatch = useDispatch();
  // const vendorDetails = useSelector(state => state.vendorDetails);
  // const { loading, error, vendor } = vendorDetails;
  // const productList = useSelector(state => state.productList);
  // const { loading1, error1, products } = productList;
  // useEffect(() => {
  //     if (vendor_id) {
  //         dispatch(detailsVendor(vendor_id));
  //     };
  //     if (loading & !error) {
  //         dispatch(listProducts(vendor_id));
  //     }
  //   }, [dispatch, vendor_id, loading, error]);

  return (
      <div>
      {(loading | loading1) ? (
          <LoadingBox></LoadingBox>
      ) : (error | error1) ? (
          <MessageBox variant="danger">{error}{error1}</MessageBox>
      ) : (
          <div className="w-full min-h-screen overflow-x-hidden bg-contain bg-center relative">
              <div style={{ backgroundImage: `url(${vendor.image})` }} className="rounded-t-3xl lg:rounded-t-6xl opacity-100 w-full h-full absolute top-0 left-0 z-0"/>
              <Link to={`/app/vendor_${vendor_id}`}>
              <div className="h-52 w-full flex px-10 items-end relative">
                  <span className="ml-8 my-6 text-3xl sm:text-5xl text-black font-semibold absolute">{vendor.vendor_name}</span>
                  <span className="ml-7 my-6 text-3xl sm:text-5xl text-white font-semibold relative z-10">{vendor.vendor_name}</span>
              </div>
              </Link>

              <div className="w-full bg-white relative z-10" style={{minHeight: 'calc(100vh - 11rem)'}}>
                  <div className="px-4 pt-2 sm:px-14 sm:pt-6">
                      <RatingComponent rating={vendor.rating} size={25} />
                      {vendor.rating} ({vendor.ratingCount}+)
                      <p className="mt-2">{vendor.vendor_description}</p>
                  </div>

                  <div className="px-2 py-4 sm:px-12 sm:py-8">
                      <div className="mt-4 sm:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-10">
                          {products && <>
                              {products.map((product) => (
                                  <ProductComponent product={product} vendor_id={vendor_id} key={product._id} />
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