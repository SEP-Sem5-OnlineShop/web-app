import { useEffect, useState } from 'react';
import QrReader from 'react-qr-reader';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { axios } from '../../../api';
import PaymentModal from './paymentModel';

const BuyingCart = () => {
    const [scanResultWebCam, setScanResultWebCam] = useState('')
    // const [customer_id, setCustomer_id] = useState('613eba8b94acbe3710fed690');
    const userData = useSelector(state => state.user.userData);
    let customer_id = '';
    if (userData){
        customer_id = userData._id;
    }
    console.log(customer_id);

    const [order, setOrder] = useState({});
    const history = useHistory();
    
    useEffect(() => {
        async function loadOrder(orderId){
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
                const { data } = await axios.get(`app/customer/purchase/${orderId}`);
                console.log('new order details');
                console.log(data);
                setOrder(data);
                // alert('added alert');
            } catch (error) {
                console.log(error);
            };
        };
        if(scanResultWebCam){
            loadOrder(scanResultWebCam);
        }
    }, [scanResultWebCam])

    const handleErrorWebCam = (error) => {
        console.log(error);
    }
    const handleScanWebCam = (result) => {
        if(result){
            console.log(result);
            setScanResultWebCam(result);
        }
        // setScanResultWebCam("6167a9b1197dbe1e944b6272");
    }

    const handlePay = () => {
        async function saveOrder(scanResultWebCam,customer_id){
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
                const { data } = await axios.put(`app/customer/purchase/pay/${scanResultWebCam}`,{customer_id:customer_id});
                console.log('updated order');
                console.log(data);
            } catch (error) {
                console.log(error);
            };
        };
        if (customer_id) {
            saveOrder(scanResultWebCam, customer_id).then(history.push("/"))
        }

    };

    return (
        <div>
            <div>
                {!scanResultWebCam ? (
                    <div className="flex h-full w-full justify-center items-center">
                        {/* <h3>Qr Code Scan by WebCam</h3> */}
                        <QrReader
                          delay={300}
                          style={{width: '30%'}}
                          onError={handleErrorWebCam}
                          onScan={handleScanWebCam}
                        />
                    </div>
                ) : null }
            </div>
        
            <div>
                {scanResultWebCam ? (
                    <div className="mx-1 my-2 sm:mx-12 sm:my-8">
                        <div className="block w-full overflow-x-auto">
                            {/* <div className="m-2  flex justify-between">
                                    <span className="m-2 text-sm sm:text-lg">product</span>
                                    <span className="m-2 text-sm sm:text-lg">price</span>
                                    <span className="m-2 text-sm sm:text-lg">items</span>
                            </div>
                            {order.products && <>
                                {order.products.map((product) => (
                                    <div key={product._id} className="m-2 flex justify-between">
                                        <ProductName product_id={product.product_id} />
                                        <span className="m-2 text-sm sm:text-lg">{product.price}</span>
                                        <span className="m-2 text-sm sm:text-lg">{product.items}</span>
                                        
                                    </div>
                                ))}
                            </>
                            } */}
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead className="">
                                <tr>
                                    <th className="px-2 py-2 sm:px-6 sm:py-3 bg-cardColor text-textLight align-middle border border-solid border-textLight text-sm sm:text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Product Name</th>
                                    <th className="px-2 py-2 sm:px-6 sm:py-3 bg-cardColor text-textLight align-middle border border-solid border-textLight text-sm sm:text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Price</th>
                                    <th className="px-2 py-2 sm:px-6 sm:py-3 bg-cardColor text-textLight align-middle border border-solid border-textLight text-sm sm:text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Items</th>
                                </tr>
                                </thead>
                                <tbody>
                                {order.products && <>
                                    {order.products.map((product) => (
                                    <tr key={product._id}>
                                        <td className="border-t-0 px-2 py-2 sm:px-6 sm:py-4 align-middle border-l-0 border-r-0 text-sm sm:text-base whitespace-nowrap text-left text-textLight"><ProductName product_id={product.product_id} /></td>
                                        <td className="border-t-0 px-2 py-2 sm:px-6 sm:py-4 align-middle border-l-0 border-r-0 text-sm sm:text-base whitespace-nowrap ">{product.price}</td>
                                        <td className="border-t-0 px-2 py-2 sm:px-6 sm:py-4 align-center border-l-0 border-r-0 text-sm sm:text-base whitespace-nowrap ">{product.items}</td>
                                    </tr>
                                ))}
                                </>
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-center mt-4 sm:mt-6">
                            <span className="m-2 text-sm sm:text-base">Total Items: {order.totalItems}</span>
                            <span className="m-2 text-sm sm:text-base">Total Cost: {order.totalCost}</span>
                        </div>
                        {/* <div className="flex justify-center mt-2 sm:mt-4">
                            <button className="py-1 px-2 bg-textLight text-primary rounded-md transform hover:scale-110 hover:shadow-md transition ease-out duration-400" onClick={handlePay}>Pay</button>
                        </div> */}
                        <div className="flex justify-center mt-2 sm:mt-4">
                            <PaymentModal orderId={"6161a54a775ede2cecd8a6dfhfdfggd"} name="something" amount={order.totalCost} customer={userData} handlePay={handlePay} />
                        </div>
                    </div>
                ) : null}
            </div>
        </div>

    )
}

export default BuyingCart;


const ProductName = ({product_id}) => {
    const [productDetails, setProductDetails] = useState({})
    const [loading3, setLoading3] = useState(true);
    const [error3, setError3] = useState(null);
    useEffect(() => {
        async function detailsProduct(product_id){
          try {
              const { data } = (await axios.get(`app/customer/product/${product_id}`)).data;
              console.log('buying cart product details');
              console.log(data);
              setProductDetails(data);
              setLoading3(false);
              setError3(null);
          } catch (err) {
              setLoading3(false);
              console.log(err);
              setError3(err);
          };
      };
      if (product_id) {
          detailsProduct(product_id);
      };
    }, [product_id]);
  
    return (
        <span className="">{ productDetails.product_name }</span>
    );
  }

// testing card
//   MasterCard : 5307732125531191