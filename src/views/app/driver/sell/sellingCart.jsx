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
    if (userData){
        vendor_id = userData.driver.vendorId;
    }
    console.log("vendor_id")
    console.log(vendor_id)

    const [orderId, setOrderId] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function listProducts(vendor_id){
            try {
              const { data } = await axios.get(`gen/customer/products/sell/${vendor_id}`);
              console.log('sellcart screen sell product list');
              console.log(data);
              setProducts(data);
            } catch (error) {
              console.log("product felch error");
            };
          };
          if (vendor_id) {
            listProducts(vendor_id);
          };
    }, [vendor_id]);

    const handleSubmit = () => {
        async function saveOrder(vendor_id,pro){
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
                const { data } = await axios.post(`app/customer/purchase/${vendor_id}`,pro);
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
                    <div className="">
                        <div className="my-2 sm:mx-2 sm:my-4">
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
                            <table className="m-2">
                                <thead>
                                <tr>
                                    <th className="m-2 text-sm sm:text-lg w-60 text-center">product</th>
                                    <th className="m-2 text-sm sm:text-lg w-40 text-center">price</th>
                                    <th className="m-2 text-sm sm:text-lg w-40 text-center">stock</th>
                                    <th className="m-2 text-sm sm:text-lg w-40 text-center">items</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map((product) => (
                                    <tr key={product._id}>
                                        <td className="m-2 text-sm sm:text-lg w-60 text-center">{product.product_name}</td>
                                        <td className="m-2 text-sm sm:text-lg w-40 text-center">{product.price}</td>
                                        <td className="m-2 text-sm sm:text-lg w-40 text-center">{product.stock}</td>
                                        <td><input className="bg-cardColor text-sm sm:text-lg rounded-sm p-2 w-40 text-center" id={product._id} type="number" min={0} max={product.stock} onChange={(e) => {handleChange(e.target.id,e.target.value)}}/></td>
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