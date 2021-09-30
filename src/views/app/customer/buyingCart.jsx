import { useEffect, useState } from 'react';
import QrReader from 'react-qr-reader';
import { useSelector } from 'react-redux';
import { axios } from '../../../api';

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
            saveOrder(scanResultWebCam, customer_id)
        }

    };

    return (
        <div>
            <div>
                {!scanResultWebCam ? (
                    <div>
                        <h3>Qr Code Scan by WebCam</h3>
                        <QrReader
                          delay={300}
                          style={{width: '20%'}}
                          onError={handleErrorWebCam}
                          onScan={handleScanWebCam}
                        />
                    </div>
                ) : null }
            </div>
        
            <div>
                {scanResultWebCam ? (
                    <div className="">
                        <div className="my-2 sm:mx-2 sm:my-4">
                            <div className="m-2  flex justify-between">
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
                            }
                        </div>
                        <div>
                            <span className="m-2 text-sm sm:text-lg">Total Items: {order.totalItems}</span>
                            <span className="m-2 text-sm sm:text-lg">Total Cost: {order.totalCost}</span>
                        </div>
                        <div className="flex justify-center mt-2 sm:mt-4">
                            <button className="p-2 bg-textLight text-primary rounded-md" onClick={handlePay}>Pay</button>
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
        <span className="m-2 text-sm sm:text-lg">{ productDetails.product_name }</span>
    );
  }