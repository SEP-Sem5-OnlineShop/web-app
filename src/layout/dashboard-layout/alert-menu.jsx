import { Menu, Transition } from '@headlessui/react'
import React, {Fragment, useEffect, useState} from 'react'

import { IconContext } from "react-icons";
import { MdNotifications, MdNotificationsActive } from "react-icons/md";
import {driverCustomerSocket} from "../../socket";
import {useDispatch} from "react-redux";
import {actions} from "../../store";

export default function AlertMenu() {
    const [alerts, setAlerts] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        driverCustomerSocket.on("alert:set", (data) => {
            setAlerts(prevAlerts => [...prevAlerts, {key: `set-${data.productId}`, text: `Set alert for ${data.productName}`}])
            dispatch(actions.map.setAlertedCustomer(data.customer))

        })
        driverCustomerSocket.on("alert:unset", (data) => {
            setAlerts(prevAlerts => [...prevAlerts, {key: `unset-${data.productId}`, text: `Unset alert for ${data.productName}`}])
            if(data.customer) dispatch(actions.map.removeAlertedCustomer(data.customer._id))
        })
    }, [])

    // const logout = async () => {
    //     try {
    //         await dispatch(thunks.user.signOUt())
    //         history.push("/auth/login")
    //     }
    //     catch (e) {
    //         console.log('Something went wrong!')
    //     }
    // }

    return (
        <div className="text-right">
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex justify-center w-full px-2">
                        {
                            alerts && alerts.length ?
                                <IconContext.Provider value={{ color: alert ? "#264A75" : "#fff", className: "global-class-name", size: "1.5rem" }}>
                                    <MdNotificationsActive />
                                </IconContext.Provider> :
                                <IconContext.Provider value={{ color: alert ? "#264A75" : "#fff", className: "global-class-name", size: "1.5rem" }}>
                                    <MdNotifications />
                                </IconContext.Provider>
                        }
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="px-1 py-1 ">
                            {
                                alerts && alerts.length ?
                                    alerts.map(item => {
                                        return <Menu.Item key={item.key}>
                                            {({ active }) => (
                                                <button
                                                    className={`${active ? 'bg-violet-500 text-textLight' : 'text-gray-900'
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                                >
                                                    {item.text || ""}
                                                </button>
                                            )}
                                        </Menu.Item>
                                    })
                                    :
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                className={`${active ? 'bg-violet-500 text-textLight' : 'text-gray-900'
                                                    } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                            >
                                                Sorry! nothing to show
                                            </button>
                                        )}
                                    </Menu.Item>
                            }
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}