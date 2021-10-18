import { useEffect, useState, useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import Axios from 'axios';
import DriverProductComponent from '../../../components/customer/driverProductComponent';
import RatingComponent from '../../../components/customer/ratingComponent';
import LoadingBox from '../../../components/customer/loadingBox';
import MessageBox from '../../../components/customer/messageBox';
import {axios, driverApi} from "../../../api/index";
import { useSelector } from 'react-redux';
import { getFileUrl } from '../../../api/azure-storage-blob';


const DriverScreen = () => {
  const { id: vendor_id, did: driver_id } = useParams();
  // const [customer_id, setCustomer_id] = useState('613eba8b94acbe3710fed690');
  const userData = useSelector(state => state.user.userData);
  let customer_id = '';
  if (userData){
      customer_id = userData._id;
  }
  const onlineDrivers = useSelector(state => state.map.onlineDrivers)

  const [vendor, setVendor] = useState({})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(null);
  const [driver, setDriver] = useState({})
  const [loading2, setLoading2] = useState(true);
  const [error2, setError2] = useState(null);
  
  const [width, height] = useWindowSize();

  useEffect(() => {
    async function detailsVendor(vendor_id){
      try {
        const { data } = await axios.get(`gen/customer/vendors/${vendor_id}`);
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
    async function detailsDriver(driver_id){
      try {
        // const { data } = await axios.get(`gen/customer/vendors/${vendor_id}`);
        const { data } = (await axios.get(`/app/driver/${driver_id}`)).data;
        console.log("driver felch");
        console.log(data);
        setDriver(data);
        setLoading2(false);
      } catch (error) {
        console.log("driver felch error");
        setError2("driver felch error");
        setLoading2(false);
      };
    };
    detailsDriver(driver_id);
  }, [driver_id]);

  useEffect(() => {
    async function listProducts(vendor_id){
      try {
        const { data } = await axios.get(`gen/customer/products/${vendor_id}`);
        setProducts(data);
        setLoading1(false);
      } catch (error) {
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
      {loading2 ? (
          <LoadingBox></LoadingBox>
      ) : error2 ? (
          <MessageBox variant="danger">{error2}</MessageBox>
      ) : (
          <div className="w-full min-h-screen overflow-x-hidden bg-contain bg-center relative">
              {/* <div style={{ backgroundImage: `url(${getFileUrl(vendor.imageUrl)})` }} className="rounded-t-3xl lg:rounded-t-6xl opacity-100 w-full h-full object-center absolute top-0 left-0 z-0"/> */}
              <div className="h-24 xs:h-32 sm:h-40 md:h-52 w-full flex sm:px-10 items-end relative">
              <Link to={`/vendor_${vendor_id}/driver_${driver_id}`}>
                  <span style={{'WebkitTextFillColor': 'white', 'WebkitTextStrokeWidth': '1px', 'WebkitTextStrokeColor': '#000000', 'textShadow': '3px 3px 0 #000,-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000'} } className="ml-2 my-2 xs:ml-4 xs:my-4 sm:ml-6 sm:my-6 text-lg xss:text-xl xs:text-3xl sm:text-4xl md:text-5xl text-white font-semibold relative">{driver.firstName || "driver"} {driver.lastName || "name"}</span>
              </Link>
              <Link to={`/vendor_${vendor_id}`}>
                  <span style={{'WebkitTextFillColor': 'white', 'WebkitTextStrokeWidth': '1px', 'WebkitTextStrokeColor': '#000000', 'textShadow': '3px 3px 0 #000,-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000'} } className="ml-2 my-2 xs:ml-4 xs:my-4 sm:ml-6 sm:my-6 text-sm xss:text-base xs:text-xl sm:text-2xl md:text-3xl text-white font-semibold relative">{vendor.vendor_name || "vendor name"}</span>
              </Link>
              </div>

              <div className="w-full bg-white relative" style={{minHeight: 'calc(100vh - 11rem)'}}>
                  {/* <div className="px-4 pt-2 sm:px-14 sm:pt-6">
                      <RatingComponent rating={vendor.rating} size={width>600?25:width>480?22:width>400?18:16} />
                      <span className="text-xs xs:text-sm sm:text-base">{(Math.round(vendor.rating * 10) / 10).toFixed(1)} ({vendor.ratingCount}+)</span>
                      <p className="mt-2 text-xs xs:text-sm sm:text-base">{vendor.vendor_description}</p>
                  </div> */}

                  <div className="px-2 py-4 sm:px-12 sm:py-8">
                      <div className="mt-4 sm:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-10">
                        {(loading1 ) ? (
                          <LoadingBox></LoadingBox>
                        ) : (error1) ? (
                          <MessageBox variant="danger">{error}</MessageBox>
                        ) : (
                          <>
                            {products.map((product) => (
                                <DriverProductComponent product={product} vendor_id={vendor_id} customer_id={customer_id} key={product._id} />
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

export default DriverScreen;

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