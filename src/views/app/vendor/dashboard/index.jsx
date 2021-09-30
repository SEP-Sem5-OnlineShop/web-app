import React, { useEffect } from "react";
import { useSelector } from "react-redux"

import CardDashboard from "../../../../components/card-desktop/index"

export default function VendorDashboard() {
    const userData = useSelector(state => state.user.userData)
    useEffect(async () => {
        
    }, [])
    return (
        <div className="flex justify-center">
            <div className="w-full flex-col items-center justify-center p-0 lg:p-8">
                <div className="w-full text-3xl font-medium">
                    Welcome Back {userData && userData.vendor ? userData.vendor.shopName : ""}!
                </div>

                <div className="grid grid-cols-4 gap-10 h-60 mt-10">
                    <CardDashboard content={`${userData.vendor && userData.vendor.drivers ? userData.vendor.drivers.length : 0} Drivers`} />
                    <CardDashboard content={`${userData.vendor && userData.vendor.products ? userData.vendor.products.length : 0} Products`} />
                    <CardDashboard content={`${userData.vendor && userData.vendor.vehicles ? userData.vendor.drivers.vehicles : 0} Vehicles`} />
                    <CardDashboard content={`${userData.vendor && userData.vendor.purchases ? userData.vendor.drivers.purchases : 0} Daily Purchases`} />
                </div>
            </div>
        </div>
    )
}