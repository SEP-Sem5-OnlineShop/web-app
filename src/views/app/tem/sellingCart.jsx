import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { axios } from '../../../api';

const SellingCart = () => {
    const [imageUrl, setImageUrl] = useState('');
    // const orderId='613eba8b94acbe3710fed691';

    const [order, setOrder] = useState({a:'aaa',b:'bbb'});
    const [orderId, setOrderId] = useState(null);

    const handleSubmit = () => {
        async function saveOrder(){
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
                const { data } = await axios.post(`app/customer/sellingcart`,{order});
                console.log('new order id');
                console.log(data);
                setOrderId(data);
                // alert('added alert');
            } catch (error) {
                console.log(error);
            };
        };
        saveOrder();
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
                {!orderId ? (<button className="p-2 bg-text" onClick={handleSubmit}>Submit</button>) : null}
            </div>
            <div>
                {imageUrl ? (<a href={imageUrl} download><img src={imageUrl} alt="qr" /></a>) : null}
            </div>
        </div>
    )
}

export default SellingCart;