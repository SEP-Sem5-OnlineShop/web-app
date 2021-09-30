import React, { useState } from "react"
import { useTable, useGlobalFilter } from 'react-table'
import { productApi } from "../../../../api";
import CardTemplate from "../../../../components/card/template";
import { useFormik } from 'formik';
import { stockApi, driverApi } from '../../../../api/index'
import { useSelector } from "react-redux"

export default function DailyStockLoad() {
    const [data, setData] = React.useState([])
    const [formikInitial, setFormikInitial] = useState([])
    const [vehicle, setVehicle] = useState("")
    const [driver, setDriver] = useState("")
    const [vehiclesAndDrivers, setVehiclesAndDrivers] = useState({
        vehicles: [],
        drivers: []
    })
    const vendorId = useSelector(state => state.user.userData._id)
    React.useEffect(async () => {
        try {
            const { data, status } = await productApi.getList()
            const drivers = await driverApi.getDrivers()
            const vehicles = await driverApi.getVehicles()
            console.log(drivers)
            console.log(vehicles)
            if (drivers.data && vehicles.data) {
                setVehiclesAndDrivers({
                    drivers: drivers.data.data || [],
                    vehicles: vehicles.data.data || []
                })
            }

            const list = []
            const testData = []
            data.data.forEach((item, index) => {
                list.push({
                    'col1': index + 1,
                    'col2': item.product_name || "",
                    'col3': [item.price || "", item._id],
                    'col4': [item.discount || "", item._id],
                    'col5': ["", item._id],
                })
                testData.push({
                    [item._id]: {
                        price: item.price || "0",
                        discount: item.discount || "0",
                        stock: item.stock || "0",
                    }
                })
            })
            setData(list)
            setFormikInitial(testData)
        }
        catch (e) {

        }
    }, [])

    const columns = React.useMemo(
        () => [
            {
                Header: '#',
                accessor: 'col1', // accessor is the "key" in the data
            },
            {
                Header: 'Name',
                accessor: 'col2',
            },
            {
                Header: 'Price',
                accessor: 'col3',
            },
            {
                Header: 'Discount',
                accessor: 'col4',
            },
            {
                Header: 'Today Stock',
                accessor: 'col5',
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data })


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            stockDetails: formikInitial,
        },
        onSubmit: async values => {
            try {
                const stock = []
                values.stockDetails.forEach(item => {
                    const productId = Object.keys(item)[0]
                    if (parseInt(item[productId].stock))
                        stock.push({
                            ...item[productId], productId: productId
                        })
                })
                const { data, status } = await stockApi.update({ vendorId: vendorId, vehicleId: "Vehicle 1", dailyStock: stock })
                if (status === 200 && data && data.message === 'Success') {
                    console.log(data.data)
                }
            }
            catch (e) {

            }
        },
    });

    return (
        <div className="flex justify-center">
            <div className="w-full flex flex-col items-center justify-center p-0 lg:p-8">
                <div className="w-full text-3xl font-medium">Load Daily Stock to Mobile Shops</div>
                <div className="mt-4 flex flex-col items-start w-full">
                    <label className="font-medium mt-4">Select the mobile shop for loading stock</label>
                    <select onChange={e => {setVehicle(e.target.value); console.log(vehicle)}}>
                            <option selected disabled>Select a vehicle</option>
                        {
                            vehiclesAndDrivers.vehicles.map(item => {
                                console.log(item)
                                return <option value={item._id} key={item._id} >{`${item.brand} ${item.model}`}</option>
})
                        }
                    </select>
                    <label className="font-medium mt-4">Assign a driver to mobile shop</label>
                    <select onChange={e => setDriver(e.target.value)}>
                        {
                            vehiclesAndDrivers.drivers.map(item => (
                                <option value={item._id} key={item._id}>{`${item.firstName} ${item.lastName}`}</option>
                            ))
                        }
                    </select>
                </div>
                {
                    <form onSubmit={formik.handleSubmit}>
                        <CardTemplate>
                            <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-cardColor">
                                    {headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(column => (
                                                <th
                                                    {...column.getHeaderProps()}
                                                    scope="col"
                                                    className="px-6 py-3 text-center text-sm font-medium text-gray-500 uppercase tracking-wider"
                                                >
                                                    {column.render('Header')}
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody {...getTableBodyProps()} className="bg-white divide-y divide-buttonColor">
                                    {rows.map((row, rowIndex) => {
                                        prepareRow(row)
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell, index) => {
                                                    if (index === 2) return (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            className="px-6 py-4 whitespace-nowrap text-center text-sm text-text"
                                                        >
                                                            {(formik.values.stockDetails[rowIndex] && formik.values.stockDetails[rowIndex][cell.value[1]]) ?
                                                                <input
                                                                    value={formik.values.stockDetails[rowIndex][cell.value[1]]['price']}
                                                                    type="number"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    id={`stockDetails.${rowIndex}.${cell.value[1]}.price`} name={`stockDetails.${rowIndex}.${cell.value[1]}.price`}
                                                                    className="bg-cardColor rounded-sm p-2" /> : ""}
                                                        </td>
                                                    )
                                                    if (index === 3) return (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            className="px-6 py-4 whitespace-nowrap text-center text-sm text-text"
                                                        >
                                                            {(formik.values.stockDetails[rowIndex] && formik.values.stockDetails[rowIndex][cell.value[1]]) ?
                                                                <input
                                                                    value={formik.values.stockDetails[rowIndex][cell.value[1]]['discount']}
                                                                    type="number"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    id={`stockDetails.${rowIndex}.${cell.value[1]}.discount`} name={`stockDetails.${rowIndex}.${cell.value[1]}.discount`}
                                                                    className="bg-cardColor rounded-sm p-2" /> : ""}
                                                        </td>
                                                    )
                                                    if (index === 4) return (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            className="px-6 py-4 whitespace-nowrap text-center text-sm text-text"
                                                        >
                                                            {(formik.values.stockDetails[rowIndex] && formik.values.stockDetails[rowIndex][cell.value[1]]) ?
                                                                <input
                                                                    value={formik.values.stockDetails[rowIndex][cell.value[1]]['stock']}
                                                                    type="number"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    id={`stockDetails.${rowIndex}.${cell.value[1]}.stock`} name={`stockDetails.${rowIndex}.${cell.value[1]}.stock`}
                                                                    className="bg-cardColor rounded-sm p-2" /> : ""}
                                                        </td>
                                                    )
                                                    return (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            className="px-6 py-4 whitespace-nowrap text-center text-sm text-text"
                                                        >
                                                            {cell.render('Cell')}
                                                        </td>
                                                    )
                                                })}
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            {rows && !rows.length && <div className="flex justify-center">No items to show</div>}
                        </CardTemplate>
                        <div className="flex justify-end mt-4 w-full">
                            <button className="py-2 px-4 text-white bg-textLight rounded-lg" type="submit">
                                Submit
                    </button>
                        </div>
                    </form>
                }
            </div>
        </div>

    )
}