import { useSelector } from "react-redux";

const CustomerProfileScreen = () => {
    const userData = useSelector(state => state.user.userData);
    // const [customer_id, setCustomer_id] = useState('');
    // console.log(userData._id)
    // setCustomer_id(userData._id);
    let customer_id = '';
    if (userData){
        customer_id = userData._id;
    }
    console.log(customer_id)
    return (
        <div>
            <span>CustomerProfileScreen</span>
        </div>
    );
}

export default CustomerProfileScreen;
