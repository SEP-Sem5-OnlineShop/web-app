import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import AlertComponent from './alertComponent';

const AlertScreen = () => {
    // const [customer_id, setCustomer_id] = useState("01");
    const history = useHistory();
    const [alerts, setAlerts] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // `http://localhost:8000/customer_${customer_id}/alerts`
    useEffect(() => {
        const abortConst = new AbortController();
        fetch(`http://localhost:8000/alerts`, { signal: abortConst.signal })
            .then(res => {
                if(!res.ok){
                    throw Error('data does not exist')
                }
                return res.json();
            })
            .then(data => {
                setAlerts(data);
                setIsLoading(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted');
                } else {
                    setIsLoading(false);
                    setError(err.message);
                }
            });
        return () => abortConst.abort();
    }, []);

    const handleRemove = (id) => {
        fetch('http://localhost:8000/alerts/'+id , {
            method: 'DELETE'
        }).then(() => {
            history.go(0);
        })
    };

    return (
        <div className="px-2 py-4 sm:px-12 sm:py-12">
            <h1 className="text-3xl text-secondary flex flex-col">Alerts</h1>
            {/* error */}
            { error && <div className="mt-4">{ error}</div>}
            {/* loding */}
            { isLoading && <div className="mt-4">Loding...</div>}
            <div className="mt-4 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-10">
                {alerts && <>
                    {alerts.map((alert) => (
                        <AlertComponent alert={alert} handleRemove={handleRemove} key={alert.alert_id} />
                    ))}
                </>}
            </div>
        </div>
    );
}
 
export default AlertScreen;