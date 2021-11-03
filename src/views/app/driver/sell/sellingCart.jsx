import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { axios } from '../../../../api';
import { useSelector } from 'react-redux';

const SellingCart = () => {
    const [imageUrl, setImageUrl] = useState('');
    // const orderId='613eba8b94acbe3710fed691';
    // const vendor_id = "613eb365af0d5b2c142fa326";
    const userData = useSelector(state => state.user.userData);
    let vendor_id = '';
    let driver_id = '';
    if (userData){
        vendor_id = userData.driver.vendorId;
        driver_id = userData._id;
    }
    console.log("vendor_id")
    console.log(vendor_id)
    console.log("driver_id")
    console.log(driver_id)

    const [orderId, setOrderId] = useState(null);
    const [products, setProducts] = useState([]);
    
    const [dailystock_id, setDailystock_id] = useState(null);

    // useEffect(() => {
    //     async function listProducts(vendor_id){
    //         try {
    //           const { data } = await axios.get(`gen/customer/products/sell/${vendor_id}`);
    //           console.log('sellcart screen sell product list');
    //           console.log(data);
    //           setProducts(data);
    //         } catch (error) {
    //           console.log("product felch error");
    //         };
    //       };
    //       if (vendor_id) {
    //         listProducts(vendor_id);
    //       };
    // }, [vendor_id]);
    
    useEffect(() => {
        let mounted = true;
        async function listProducts(driver_id){
            try {
              const { data } = (await axios.get(`gen/customer/stock/sell/${driver_id}`)).data;
              console.log('sellcart screen sell product list');
              if (mounted) {
                  console.log(data._id)
                  setDailystock_id(data._id)
                  console.log(data.dailyStock);
                  setProducts(data.dailyStock);
              };
            } catch (error) {
                if (mounted) {
                    console.log(error);
                    console.log("product felch error");
                };
            };
        };
        if (driver_id) {
            listProducts(driver_id);
        };
        return () => {
            mounted = false;
            // console.log("cleanup")
        };
    }, [driver_id]);

    const handleSubmit = () => {
        async function saveOrder(vendor_id,pro){
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
                const { data } = await axios.post(`app/customer/purchase/${vendor_id}`,{pro,dailystock_id});
                console.log('new order id');
                console.log(data);
                setOrderId(data);
            } catch (error) {
                console.log(error);
            };
        };
        let pro = [];
        let c = 0;
        for (var i in products) {
            if (products[i].items > 0) {
                pro[c] = products[i];
            }
            c += 1;
        }
        if (pro.length>0) {
            console.log("pro");
            console.log(pro);
            saveOrder(vendor_id,pro)
        }

    };

    const handleChange = (id,val) => {
        for (var i in products) {
            if (products[i]._id === id) {
                products[i].items = parseInt(val);
                break; //Stop this loop, we found it!
            }
        }
    };

    useEffect(() => {
        async function generateQRCode(orderId){
            try {
                const response = await QRCode.toDataURL(orderId);
                setImageUrl(response);
            } catch (error) {
                console.log(error);
            };
        };
        if(orderId){
            generateQRCode(orderId);
        }
    }, [orderId])


    return (
        <div>
            <div>
                {!orderId ? (
                    <div className="sm:mx-2 my-2 sm:my-8">
                        <div className="block w-full overflow-x-auto">
                            {/* <div className="m-2  flex justify-between">
                                    <span className="m-2 text-sm sm:text-lg">product</span>
                                    <span className="m-2 text-sm sm:text-lg">price</span>
                                    <span className="m-2 text-sm sm:text-lg">stock</span>
                                    <span className="m-2 text-sm sm:text-lg">items</span>
                            </div>
                            {products.map((product) => (
                                <div key={product._id} className="m-2 flex justify-between">
                                    <span className="m-2 text-sm sm:text-lg">{product.product_name}</span>
                                    <span className="m-2 text-sm sm:text-lg">{product.price}</span>
                                    <span className="m-2 text-sm sm:text-lg">{product.stock}</span>
                                    <input className="bg-cardColor text-sm sm:text-lg rounded-sm p-2 w-16" id={product._id} type="number" min={0} max={product.stock} onChange={(e) => {handleChange(e.target.id,e.target.value)}}/>
                                </div>
                            ))} */}
                            <table className="items-center bg-transparent w-full border-collapse ">
                                <thead>
                                <tr>
                                    <th className="px-1 xs:px-4 sm:px-6 py-2 sm:py-3 bg-cardColor text-textLight align-middle border border-solid border-textLight text-xs xxs:text-sm sm:text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">product</th>
                                    <th className="px-1 xs:px-4 sm:px-6 py-2 sm:py-3 bg-cardColor text-textLight align-middle border border-solid border-textLight text-xs xxs:text-sm sm:text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">price</th>
                                    <th className="px-1 xs:px-4 sm:px-6 py-2 sm:py-3 bg-cardColor text-textLight align-middle border border-solid border-textLight text-xs xxs:text-sm sm:text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left w-12 xxs:w-16 xs:w-20 sm:w-28 md:32">stock</th>
                                    <th className="px-1 xs:px-4 sm:px-6 py-2 sm:py-3 bg-cardColor text-textLight align-middle border border-solid border-textLight text-xs xxs:text-sm sm:text-base uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left w-12 xxs:w-16 xs:w-20 sm:w-28 md:32">items</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        {/* <td className="border-t-0 px-1 xs:px-4 sm:px-6 py-2 sm:py-3 align-middle border-l-0 border-r-0 text-xs xxs:text-sm sm:text-base whitespace-nowrap text-left text-textLight">{product.product_name}</td> */}
                                        <td className="border-t-0 px-1 xs:px-4 sm:px-6 py-2 sm:py-3 align-middle border-l-0 border-r-0 text-xs xxs:text-sm sm:text-base whitespace-nowrap text-left text-textLight">
                                        <ProductName product_id={product.productId} />
                                        </td>
                                        <td className="border-t-0 px-1 xs:px-4 sm:px-6 py-2 sm:py-3 align-middle border-l-0 border-r-0 text-xs xxs:text-sm sm:text-base whitespace-nowrap">{product.price}</td>
                                        <td className="border-t-0 px-1 xs:px-4 sm:px-6 py-2 sm:py-3 align-middle border-l-0 border-r-0 text-xs xxs:text-sm sm:text-base whitespace-nowrap w-12 xxs:w-16 xs:w-20 sm:w-28 md:32">{product.stock}</td>
                                        <td><input className="border-t-0 px-1 xs:px-4 sm:px-6 py-2 sm:py-3 align-middle border-l-0 border-r-0 text-xs xxs:text-sm sm:text-base whitespace-nowrap bg-textLight bg-opacity-10 w-12 xxs:w-16 xs:w-20 sm:w-28 md:32" id={product._id} type="number" min={0} max={product.stock} onChange={(e) => {handleChange(e.target.id,e.target.value)}}/></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-center mt-2 sm:mt-4">
                            <button className="p-2 bg-textLight text-primary rounded-md" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                ) : null}
            </div>
            {imageUrl ? (
            <div className="flex justify-center items-center">
                <div className="flex border-2 border-text mt-6 sm:mt-8 w-40 sm:w-72 justify-center">
                    <div>
                        <h1 className="flex justify-center text-lg sm:text-3xl mt-2 sm:mt-4 sm:mb-4">QR Code</h1>
                        <a href={imageUrl} download><img className="sm:w-60 sm:h-60" src={imageUrl} alt="qr" /></a>
                    </div>
                </div>
            </div>
            ) : null}
            </div>
    )
}

export default SellingCart;


const ProductName = ({product_id}) => {
    const [productDetails, setProductDetails] = useState({})
    const [loading3, setLoading3] = useState(true);
    const [error3, setError3] = useState(null);
    useEffect(() => {
        let mounted = true;
        async function detailsProduct(product_id){
            try {
                const { data } = (await axios.get(`gen/customer/product/${product_id}`)).data;
                console.log('order history screen product details');
                console.log(data);
                if (mounted) {
                    setProductDetails(data);
                    setLoading3(false);
                    setError3(null);
                };
            } catch (err) {
                if (mounted) {
                    setLoading3(false);
                    console.log(err);
                    setError3(err);
                };
            };
        };
        if (product_id) {
            detailsProduct(product_id);
        };
        return () => {
            mounted = false;
            // console.log("cleanup")
        };
    }, [product_id]);

    return (
        <>{productDetails.product_name}</>
    );
  }