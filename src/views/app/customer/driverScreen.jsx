import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
// import Axios from 'axios';
import DriverProductComponent from '../../../components/customer/driverProductComponent';
import LoadingBox from '../../../components/customer/loadingBox';
import MessageBox from '../../../components/customer/messageBox';
import {axios} from "../../../api/index";
import { useSelector } from 'react-redux';


const DriverScreen = () => {
  const { id: vendor_id, did: driver_id } = useParams();
  // const [customer_id, setCustomer_id] = useState('613eba8b94acbe3710fed690');
  const userData = useSelector(state => state.user.userData);
  let customer_id = '';
  if (userData){
      customer_id = userData._id;
  }

  const [driver, setDriver] = useState({})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dailyStock, setDailyStock] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [error1, setError1] = useState(null);
  // const [vendor, setVendor] = useState({})
  // const [loading2, setLoading2] = useState(true);
  // const [error2, setError2] = useState(null);
  
  useEffect(() => {
    let mounted = true;
    async function detailsDriver(driver_id){
      try {
        const { data } = (await axios.get(`/gen/customer/driver/${driver_id}`)).data;
        console.log("driver felch");
        console.log(data);
        if (mounted) {
          setDriver(data);
          setLoading(false);
        };
      } catch (error) {
        if (mounted) {
          console.log("driver felch error");
          setError("driver felch error");
          setLoading(false);
        };
      };
    };
    detailsDriver(driver_id);
    return () => {
      mounted = false;
      // console.log("cleanup")
    };
  }, [driver_id]);

  useEffect(() => {
    async function listProducts(driver_id){
      try {
        const { data } = await axios.get(`gen/customer/driverstock/${driver_id}`);
        console.log("dailyStock");
        console.log(data.data.dailyStock);
        setDailyStock(data.data.dailyStock);
        setLoading1(false);
      } catch (error) {
        setError1("product felch error");
        setLoading1(false);
      };
    };
    if (loading && !error) {
      listProducts(driver_id);
    };
  }, [error, loading, driver_id]);

  //   useEffect(() => {
//     async function detailsVendor(vendor_id){
//       try {
//         const { data } = await axios.get(`gen/customer/vendors/${vendor_id}`);
//         setVendor(data);
//         setLoading2(false);
//       } catch (error) {
//         console.log("vendor felch error");
//         setError2("vendor felch error");
//         setLoading2(false);
//       };
//     };
//     detailsVendor(vendor_id);
//   }, [vendor_id]);


  return (
      <div>
      {loading ? (
          <LoadingBox></LoadingBox>
      ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
      ) : (
          <div className="w-full min-h-screen overflow-x-hidden bg-contain bg-center relative">
              {/* <div style={{ backgroundImage: `url(${getFileUrl(vendor.imageUrl)})` }} className="rounded-t-3xl lg:rounded-t-6xl opacity-100 w-full h-full object-center absolute top-0 left-0 z-0"/> */}
              {/* <div className="h-24 xs:h-32 sm:h-40 md:h-52 w-full flex sm:px-10 items-end relative"> */}
              <div className="h-24 w-full flex sm:px-10 items-end relative">
              <Link to={`/vendor_${vendor_id}/driver_${driver_id}`}>
                  <span className="ml-2 xs:ml-4 sm:ml-6 mt-2 xs:mt-3 sm:mt-4 text-sm xss:text-base xs:text-lg sm:text-xl md:text-2xl text-text font-semibold relative dark:text-white">{driver.firstName || "driver"} {driver.lastName || "name"}</span>
              </Link>
              {/* <Link to={`/vendor_${vendor_id}`}>
                  <span style={{'WebkitTextFillColor': 'white', 'WebkitTextStrokeWidth': '1px', 'WebkitTextStrokeColor': '#000000', 'textShadow': '3px 3px 0 #000,-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000'} } className="ml-2 my-2 xs:ml-4 xs:my-4 sm:ml-6 sm:my-6 text-sm xss:text-base xs:text-xl sm:text-2xl md:text-3xl text-white font-semibold relative">{vendor.vendor_name || "vendor name"}</span>
                </Link> */}
              </div>
              <div className="w-full flex-row sm:px-10">
                <p className="ml-2 xs:ml-4 sm:ml-6 mt-1 xs:mt-2 sm:mt-3 text-xs xs:text-sm sm:text-base md:text-lg text-text dark:text-white">{driver.telephone || "telephone"} </p>
                <p className="ml-2 xs:ml-4 sm:ml-6 mt-1 xs:mt-2 sm:mt-2 text-xs xs:text-sm sm:text-base md:text-lg text-text dark:text-white">{driver.email || "email"} </p>
              </div>

              <div className="w-full bg-white relative dark:bg-secondary" style={{minHeight: 'calc(100vh - 11rem)'}}>
                  {/* <div className="px-4 pt-2 sm:px-14 sm:pt-6">
                      <RatingComponent rating={vendor.rating} size={width>600?25:width>480?22:width>400?18:16} />
                      <span className="text-xs xs:text-sm sm:text-base">{(Math.round(vendor.rating * 10) / 10).toFixed(1)} ({vendor.ratingCount}+)</span>
                      <p className="mt-2 text-xs xs:text-sm sm:text-base">{vendor.vendor_description}</p>
                  </div> */}
                  {(!loading1 && dailyStock && dailyStock.length < 1) && <>
                      <div className="text-xs sm:text-sm text-text ml-10 sm:ml-20 mt-6 sm:mt-10">No Products</div>
                  </>}

                  <div className="px-2 py-4 sm:px-12 sm:py-8">
                      <div className="mt-4 sm:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-10">
                        {(loading1 ) ? (
                          <LoadingBox></LoadingBox>
                        ) : (error1) ? (
                          <MessageBox variant="danger">{error}</MessageBox>
                        ) : (
                          <>
                            {dailyStock.map((stockproduct) => (
                                <DriverProductComponent stockproduct={stockproduct}
                                                        vendor_id={vendor_id}
                                                        customer_id={customer_id}
                                                        driver_id={driver_id}
                                                        key={stockproduct.productId} />
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
