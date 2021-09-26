import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import {axios} from "../../../api/index";
import AlertComponent from '../../../components/customer/alertComponent';
import LoadingBox from "../../../components/customer/loadingBox";
import MessageBox from "../../../components/customer/messageBox";
import { useSelector } from "react-redux";

const AlertScreen = () => {
  const history = useHistory();

  // const isLogged = useSelector(state => state.user.token)
  // if (!isLogged) {
  //   history.push('/auth/login');
  // }
  // const userData = useSelector(state => state.user.userData);
  const [customer_id, setCustomer_id] = useState('613eba8b94acbe3710fed690');
  // if (userData) {
  //     setCustomer_id(userData._id);
  // }
    
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [error1, setError1] = useState(null);

  
  useEffect(() => {
    async function listAlerts(customer_id){
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
        const { data } = await axios.get(`app/customer/alerts/${customer_id}`);
        console.log('alert screen customer alert list');
        console.log(data);
        setAlerts(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err);
        setLoading(false);
      };
    };
    if (customer_id) {
      listAlerts(customer_id);
    };
  }, [customer_id]);

  const handleRemove = (customer_id,product_id) => {
    async function deleteAlert(customer_id,product_id){
      try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
        const { data } = await axios.delete(`app/customer/${customer_id}/alerts/${product_id}`);
        console.log('alert removed');
        console.log(data);
        // alert('removed alert');
      } catch (err) {
        setError1(err);
        console.log(error1);
      };
    };
    deleteAlert(customer_id,product_id).then(() => {history.go(0);});
  };
    
  // const history = useHistory();
  // const dispatch = useDispatch();
  // const alertList = useSelector(state => state.alertList);
  // const { loading, error, alerts } = alertList;
  // useEffect(() => {
  //     if (customer_id) {
  //         dispatch(listAlerts(customer_id));
  //     };
  //   }, [dispatch, customer_id]);

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
                          <AlertComponent alert={alert} handleRemove={handleRemove} key={alert._id} />
                      ))}
                  </>}
              </div>
          </div>
      )}
      </div>
  );
}
 
export default AlertScreen;