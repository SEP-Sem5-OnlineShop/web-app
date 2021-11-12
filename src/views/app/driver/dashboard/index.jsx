import React from "react";
import DriverMap from "../../../../geo-location/driver-map";

export default function Dashboard() {
    return <div>
        <div className="w-full text-3xl font-medium mb-4">
            Welcome!
        </div>
        <DriverMap />
    </div>
}