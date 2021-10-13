import React, { useEffect } from "react";
import { useSelector } from "react-redux"
import {axios, productApi, driverApi} from "../../../../api/index"

import CardDashboard from "../../../../components/card-desktop/index"

export default function VendorDashboard() {
    const userData = useSelector(state => state.user.userData)
    const [numberOfProducts, setNumberOfProducts] = React.useState(0)
    const [numberOfDrivers, setNumberOfDrivers] = React.useState(0)
    const [numberOfVehicles, setNumberOfVehicles] = React.useState(0)
    useEffect(async () => {

        let source = axios.CancelToken.source()

        try {
            const products = await productApi.getList(source)
            const drivers = await driverApi.getDrivers(source)
            const vehicles = await driverApi.getVehicles(source)
            setNumberOfProducts((products && products.data && products.data.data) ? products.data.data.length : 0)
            setNumberOfDrivers((drivers && drivers.data && drivers.data.data) ? drivers.data.data.length : 0)
            setNumberOfVehicles((vehicles && vehicles.data && vehicles.data.data.vendor) ? vehicles.data.data.vendor.vehicles.length : 0)
        }
        catch (e) {
            if(!axios.isCancel(e)) throw e
        }

        return () => {
            source.cancel()
        }
    }, [])
    return (
        <div className="flex justify-center">
            <div className="w-full flex-col items-center justify-center p-0 lg:p-8">
                <div className="w-full text-3xl font-medium">
                    Welcome Back {userData && userData.vendor ? userData.vendor.shopName : ""}!
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                gap-2 sm:gap-4 md:gap-6 gap-10 h-60 mt-10">
                    <CardDashboard content={`${numberOfProducts} Products`} />
                    <CardDashboard content={`${numberOfDrivers} Drivers`} />
                    <CardDashboard content={`${numberOfVehicles} Vehicles`} />
                    <CardDashboard content="0 Purchases" />
                </div>
            </div>
        </div>
    )
}