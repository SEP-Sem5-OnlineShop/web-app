import React, { useEffect } from "react";
import { useSelector } from "react-redux"
import {productApi, driverApi} from "../../../../api/index"

import CardDashboard from "../../../../components/card-desktop/index"

export default function VendorDashboard() {
    const userData = useSelector(state => state.user.userData)
    const [numberOfProducts, setNumberOfProducts] = React.useState(0)
    const [numberOfDrivers, setNumberOfDrivers] = React.useState(0)
    const [numberOfVehicles, setNumberOfVehicles] = React.useState(0)
    useEffect(async () => {
        const products = await productApi.getList()
        const drivers = await driverApi.getDrivers()
        const vehicles = await driverApi.getVehicles()
        setNumberOfProducts((products.data && products.data.data) ? products.data.data.length : 0)
        setNumberOfDrivers((drivers.data && products.data.data) ? drivers.data.data.length : 0)
        setNumberOfVehicles((vehicles.data && products.data.data) ? vehicles.data.data.length : 0)
    }, [])
    return (
        <div className="flex justify-center">
            <div className="w-full flex-col items-center justify-center p-0 lg:p-8">
                <div className="w-full text-3xl font-medium">
                    Welcome Back {userData && userData.vendor ? userData.vendor.shopName : ""}!
                </div>

                <div className="grid grid-cols-4 gap-10 h-60 mt-10">
                    <CardDashboard content={`${numberOfProducts} Products`} />
                    <CardDashboard content={`${numberOfDrivers} Drivers`} />
                    <CardDashboard content={`${numberOfVehicles} Vehicles`} />
                    <CardDashboard content="0 Purchases" />
                </div>
            </div>
        </div>
    )
}