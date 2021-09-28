import { useEffect, useState } from 'react';
import QrReader from 'react-qr-reader';
import { axios } from '../../../api';

const BuyingCart = () => {
    const [scanResultWebCam, setScanResultWebCam] = useState('')

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
        </div>
    )
}

export default BuyingCart;