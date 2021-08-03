import { useHistory } from 'react-router-dom';
import AlertComponent from './alertComponent';
import useFetch from './useFetch';

const Alert = () => {
    // const [customer_id, setCustomer_id] = useState("01");
    const { data: alerts, isLoading , error} = useFetch(`http://localhost:8000/alerts`);
    // `http://localhost:8000/customer-${customer_id}/alerts`
    const history = useHistory();

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
                        <AlertComponent alert={alert} handleRemove={handleRemove} key={alert.id} />
                    ))}
                </>}
            </div>
        </div>
    );
}
 
export default Alert;