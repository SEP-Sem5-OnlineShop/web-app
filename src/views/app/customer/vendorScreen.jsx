import { useEffect, useState, useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import Axios from 'axios';
import ProductComponent from '../../../components/customer/productComponent';
import RatingComponent from '../../../components/customer/ratingComponent';
import LoadingBox from '../../../components/customer/loadingBox';
import MessageBox from '../../../components/customer/messageBox';
import {axios} from "../../../api/index";
import { useSelector } from 'react-redux';


const VendorScreen = () => {
  const { id: vendor_id } = useParams();
  // const [customer_id, setCustomer_id] = useState('613eba8b94acbe3710fed690');
  const userData = useSelector(state => state.user.userData);
  let customer_id = '';
  if (userData){
      customer_id = userData._id;
  }
  console.log(customer_id)

  const [vendor, setVendor] = useState({})
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(null);

  const [width, height] = useWindowSize();
  console.log(width);

  useEffect(() => {
    async function detailsVendor(vendor_id){
      try {
        const { data } = await axios.get(`app/customer/vendors/${vendor_id}`);
        console.log('vendor screen vendor details');
        console.log(data);
        setVendor(data);
        setLoading(false);
      } catch (error) {
        console.log("vendor felch error");
        setError("vendor felch error");
        setLoading(false);
      };
    };
    detailsVendor(vendor_id);
  }, [vendor_id]);

  useEffect(() => {
    async function listProducts(vendor_id){
      try {
        const { data } = await axios.get(`app/customer/products/${vendor_id}`);
        console.log('vendor screen vendor product list');
        console.log(data);
        setProducts(data);
        setLoading1(false);
      } catch (error) {
        console.log("product felch error");
        setError1("product felch error");
        setLoading1(false);
      };
    };
    if (loading && !error) {
      listProducts(vendor_id);
    };
  }, [error, loading, vendor_id]);

  return (
      <div>
      {loading ? (
          <LoadingBox></LoadingBox>
      ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
      ) : (
          <div className="w-full min-h-screen overflow-x-hidden bg-contain bg-center relative">
              <div style={{ backgroundImage: `url(${vendor.imageUrl})` }} className="rounded-t-3xl lg:rounded-t-6xl opacity-100 w-full h-full object-center absolute top-0 left-0 z-0"/>
              <Link to={`/vendor_${vendor_id}`}>
              <div className="h-24 xs:h-32 sm:h-40 md:h-52 w-full flex sm:px-10 items-end relative">
                  {/* <span className="ml-8 my-6 text-3xl sm:text-5xl text-black font-semibold absolute">{vendor.vendor_name}</span> */}
                  <span style={{'WebkitTextFillColor': 'white', 'WebkitTextStrokeWidth': '1px', 'WebkitTextStrokeColor': '#000000', 'textShadow': '3px 3px 0 #000,-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000'} } className="ml-2 my-2 xs:ml-4 xs:my-4 sm:ml-6 sm:my-6 text-lg xss:text-xl xs:text-3xl sm:text-4xl md:text-5xl text-white font-semibold relative">{vendor.vendor_name}</span>
              </div>
              </Link>

              <div className="w-full bg-white relative" style={{minHeight: 'calc(100vh - 11rem)'}}>
                  <div className="px-4 pt-2 sm:px-14 sm:pt-6">
                      <RatingComponent rating={vendor.rating} size={width>600?25:width>480?22:width>400?18:16} />
                      <span className="text-xs xs:text-sm sm:text-base">{vendor.rating} ({vendor.ratingCount}+)</span>
                      <p className="mt-2 text-xs xs:text-sm sm:text-base">{vendor.vendor_description}</p>
                  </div>

                  <div className="px-2 py-4 sm:px-12 sm:py-8">
                      <div className="mt-4 sm:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-10">
                        {(loading1 ) ? (
                          <LoadingBox></LoadingBox>
                        ) : (error1) ? (
                          <MessageBox variant="danger">{error}</MessageBox>
                        ) : (
                          <>
                            {products.map((product) => (
                                <ProductComponent product={product} vendor_id={vendor_id} customer_id={customer_id} key={product._id} />
                            ))}
                            </>
                        )}
                      </div>
                  </div>

              </div>
          </div>
      )}
      </div>
  );
}

export default VendorScreen;

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
};