import React, {useEffect, useState} from "react"
import {axios, driverApi} from "../../../../api";
import { Tab } from '@headlessui/react'
import DailyStockLoad from "../../product/daily-stock";
import CardTemplate from "../../../../components/card/template";
import LoadingButton from "../../../../components/form-components/loading-button";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function DailyWork() {

    const [vehicles, setVehicles] = useState([])

    useEffect(async () => {
        let mount = true
        const source = axios.CancelToken.source()
        try {
            const vehicles = await driverApi.getVehicles(source)

            if(
                vehicles && vehicles.data && vehicles.status===200
            ) {
                if(mount) setVehicles(vehicles.data.data.vendor.vehicles || [])
            }
        }

        catch (e) {
            if(!axios.isCancel(e)) throw e
        }
        return () => {
            mount = false
            source.cancel()
        }
    }, [])

    return (
        <div className="flex justify-center">
            <div className="w-full flex flex-col items-center justify-center p-0 lg:p-8">
                <div className="w-full text-2xl lg:text-3xl font-medium">Load Today Stock</div>
                <CardTemplate>
                    <Tab.Group>
                        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                            {
                                vehicles.map(vehicle => {
                                    return (
                                        <Tab
                                            className={({ selected }) =>
                                                classNames(
                                                    'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                                                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                                                    selected
                                                        ? 'bg-white shadow'
                                                        : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                                )
                                            }
                                            key={vehicle.plateNumber}>{`${vehicle.plateNumber} :- ${vehicle.brand} ${vehicle.model}`}</Tab>
                                    )
                                })
                            }
                        </Tab.List>
                        <Tab.Panels>
                            {
                                vehicles.map(vehicle => {
                                    return (
                                        <Tab.Panel key={vehicle.plateNumber}>

                                            <DailyStockLoad
                                                vehicleId={vehicle._id}
                                            />
                                        </Tab.Panel>
                                    )
                                })
                            }
                        </Tab.Panels>
                    </Tab.Group>
                </CardTemplate>
            </div>
        </div>

    )
}