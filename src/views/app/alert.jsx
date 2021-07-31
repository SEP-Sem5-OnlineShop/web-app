import AlertComponent from './alertComponent';
import logo from "../../assets/svg/logo/logo-264A75.svg"
import { useState, useEffect } from 'react';

const Alert = () => {
    const [alerts, setAlerts] = useState([
        {itemname: 'Burger with some', vendor: 'Yummy Bakers', image: 'img/item1.png', price: 100.00, id: 1 },
        {itemname: 'Pizza saf sff', vendor: 'Sammy Bakers', image: 'img/item1.png', price: 500.00, id: 2 },
        {itemname: 'Dasd dsfs sfs', vendor: 'Leo Bakers', image: 'img/item1.png', price: 60.00, id: 3 },
        {itemname: 'Bread dfs fsd', vendor: 'Asta Bakers', image: 'img/item1.png', price: 80.00, id: 4 },
        {itemname: 'Fgggd hfdh jhg', vendor: 'Yuno Bakers', image: 'img/item1.png', price: 70.00, id: 5 },
        {itemname: 'Ydfh sdjkf ds', vendor: 'Luck Bakers', image: 'img/item1.png', price: 150.00, id: 6 },
        {itemname: 'Hdffd fds gd', vendor: 'Magna Bakers', image: 'img/item1.png', price: 90.00, id: 7 },
        {itemname: 'Jdgs kks dij', vendor: 'Charmi Bakers', image: 'img/item1.png', price: 120.00, id: 8 },
    ]);

    // const [alerts, setAlerts] = useState(null);

    // useEffect(() => {
    //     fetch('http://localhost:8000/customer/customer1/alerts')
    //       .then(res => {
    //           return res.json();
    //       })
    //       .then(data => {
    //           setAlerts(data)
    //       });
    // }, []);

    const handleRemove = (id) => {
        const newAlerts = alerts.filter(alert => alert.id !== id);
        setAlerts(newAlerts);
    };

    return (
        /**
         * header test remove later
         */
        <div className="w-screen min-h-screen overflow-x-hidden md:bg-primary">
            <div className="w-full min-h-screen overflow-x-hidden bg-contain bg-center relative">
                <div className="bg-food-style opacity-40 w-full h-full absolute top-0 left-0 hidden md:block"/>
                <div className="h-44 w-full md:flex px-10 items-center hidden">
                    <img className="h-3/4" src={logo} alt="logo" />
                </div>
                <div className="w-full bg-white rounded-t-3xl lg:rounded-t-6xl relative flex flex-col" style={{minHeight: 'calc(100vh - 11rem)'}}>


                    {/* alert component */}
                    <div className="px-2 py-4 sm:px-12 sm:py-12">
                        <h1 className="text-3xl text-secondary flex flex-col">Alerts</h1>
                        <div className="mt-4 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-10">
                            {alerts && <>
                                {alerts.map((alert) => (
                                    <AlertComponent alert={alert} handleRemove={handleRemove} key={alert.id} />
                                ))}
                            </>}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}
 
export default Alert;