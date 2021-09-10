import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import AlertComponent from '../../components/alertComponent';
import { deleteAlert, listAlerts } from '../../actions/alertActions';
import LoadingBox from "../../components/LoadingBox";
import MessageBox from "../../components/MessageBox";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const AlertScreen = () => {
    const [customer_id, setCustomer_id] = useState("01");
    
    const history = useHistory();
    const dispatch = useDispatch();
    const alertList = useSelector(state => state.alertList);
    const { loading, error, alerts } = alertList;
    useEffect(() => {
        if (customer_id) {
            dispatch(listAlerts(customer_id));
        };
      }, [dispatch, customer_id]);

    const handleRemove = (id) => {
        dispatch(deleteAlert(id)).then(() => {history.go(0);});
    };

    return (
        <div>
        {loading ? (
            <LoadingBox></LoadingBox>
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <div className="px-2 py-4 sm:px-12 sm:py-12">
                <h1 className="text-3xl text-secondary flex flex-col">Alerts</h1>
                <div className="mt-4 sm:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-10">
                    {alerts && <>
                        {alerts.map((alert) => (
                            <AlertComponent alert={alert} handleRemove={handleRemove} key={alert.alert_id} />
                        ))}
                    </>}
                </div>
            </div>
        )}
        </div>
    );
}
 
export default AlertScreen;