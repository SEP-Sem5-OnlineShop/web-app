import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import AlertComponent from '../../../components/customer/alertComponent';
import LoadingBox from "../../../components/customer/loadingBox";
import MessageBox from "../../../components/customer/messageBox";
import { useSelector } from "react-redux";

const AlertScreen = () => {
  const customer_id = "01";
    
  const history = useHistory();
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [error1, setError1] = useState(null);

  // const isLogged = useSelector(state => state.user.token)
  // if (!isLogged) {
  //   history.push('/auth/login');
  // }
  
  useEffect(() => {
    async function listAlerts(customer_id){
      try {
        // const { data } = await Axios.get(`app/customer/alerts/${customer_id}`);
        const data = [
          {
            alert_id: 1,
            vendor_id: 1,
            vendor_name: "Yummy Backers",
            product_id: '1',
            product_name: 'Burger with Fries',
            image: '/img/item1.png',
            price: 100,
          },
          {
            alert_id: 2,
            vendor_id: 1,
            vendor_name: "Yummy Backers",
            product_id: '2',
            product_name: 'Burger with Fries',
            image: '/img/item1.png',
            price: 100,
          },
          {
            alert_id: 3,
            vendor_id: 1,
            vendor_name: "Yummy Backers",
            product_id: '3',
            product_name: 'Burger with Fries',
            image: '/img/item1.png',
            price: 100,
          },
          {
            alert_id: 4,
            vendor_id: 2,
            vendor_name: "Asta Backers",
            product_id: '4',
            product_name: 'Burger with Fries',
            image: '/img/item1.png',
            price: 100,
          },
          {
            alert_id: 5,
            vendor_id: 2,
            vendor_name: "Asta Backers",
            product_id: '5',
            product_name: 'Burger with Fries',
            image: '/img/item1.png',
            price: 100,
          },
        ];
          
        setAlerts(data);
        setLoading(false);
        setError(null);
      } catch (err) {
        setLoading(false);
        console.log(err);
        setError(err);
      };
    };
    if (customer_id) {
      listAlerts(customer_id);
    };
  }, [customer_id]);

  const handleRemove = (id) => {
    async function deleteAlert(alertId){
      try {
        const { data } = await Axios.delete(`app/customer/alerts/${alertId}`);
      } catch (err) {
        setError1(err);
        console.log(error1);
      };
    };
    deleteAlert(id).then(() => {history.go(0);});
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