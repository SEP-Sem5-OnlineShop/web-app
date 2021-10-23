import React, { useState } from "react"
import { useFormik } from 'formik';
import { useSelector } from "react-redux"
import { useTable, useGlobalFilter, usePagination } from 'react-table'

import {productApi, stockApi, axios, driverApi} from "../../../../api"

import GlobalFilter from "../../../../components/table/global-filter";
import Pagination from "../../../../components/table/pagination";
import {toast} from "react-toastify";
import Loader from "react-loader-spinner";
import LoadingButton from "../../../../components/form-components/loading-button";
import {Tab} from "@headlessui/react";
import CardTemplate from "../../../../components/card/template";
import ModelBody from "../../../../components/modals/modelBody";

export default function DailyStockLoad({vehicleId}) {

    const [loading, setLoading] = useState(false)
    const [submitLoading, setSubmitLoading] = useState(false)
    const [assignDriverLoading, setAssignDriverLoading] = useState(false)

    const [data, setData] = React.useState([])
    const [formikInitial, setFormikInitial] = useState([])
    const [isStockThere, setIsStockThere] = useState(false)

    const [driver, setDriver] = useState("default")
    const [area, setArea] = useState("default")
    const [collection, setCollection] = useState({
        vehicles: [],
        drivers: [],
        areas: ["Wellawaya", "Buttala", "Monaragala"]
    })
    const vendorId = useSelector(state => state.user.userData._id)
    React.useEffect(async () => {
        setLoading(true)
        let mounted = true
        let source = axios.CancelToken.source()
        try {
            const products = await productApi.getList(source)
            const dailyStock = await stockApi.get(vehicleId, source)
            const drivers = await driverApi.getDrivers(source)


            if(
                drivers && drivers.data && drivers.status===200
            ) {
                if(mounted) setCollection({
                    ...collection,
                    drivers: drivers.data.data.filter(driver =>
                        !driver.driver.vehicleId || driver.driver.vehicleId === vehicleId)
                        || []
                })
            }

            const list = []
            const testData = []
            if(products && products.status===200 && dailyStock && dailyStock.status===200)
                products.data.data.forEach((item, index) => {
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
                        stock: dailyStock.data.data && dailyStock.data.data.dailyStock[index]
                            ? dailyStock.data.data.dailyStock[index]['stock'] : "0",
                    }
                })
                    if (mounted && dailyStock.data.data) {
                        setDriver(dailyStock.data.data.driverId)
                        setArea(dailyStock.data.data.region)
                        setIsStockThere(true)
                    }
                    else {
                        setDriver("default")
                        setArea("default")
                    }
            })
            if (mounted) setData(list)
            if (mounted) setFormikInitial(testData)
        }
        catch (e) {
            if(!axios.isCancel(e)) throw e
        }
        finally {
            setLoading(false)
        }
        return () => {
            mounted = false
            source.cancel()
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
        state,
        setGlobalFilter,
        gotoPage,
        canPreviousPage,
        previousPage,
        nextPage,
        canNextPage,
        pageCount,
        pageOptions,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable({ columns, data }, useGlobalFilter, usePagination)


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            stockDetails: formikInitial,
        },
        onSubmit: async values => {
            setSubmitLoading(true)
            try {
                const stock = []
                values.stockDetails.forEach(item => {
                    const productId = Object.keys(item)[0]
                    if (parseInt(item[productId].stock))
                        stock.push({
                            ...item[productId], productId: productId
                        })
                })
                if(isStockThere) {
                    const { data, status } = await stockApi.update({
                        vendorId: vendorId,
                        dailyStock: stock,
                        vehicleId: vehicleId,
                        driverId: driver,
                        region: area
                    })
                    if (status === 200 && data && data.message === 'Success') {
                        toast.success("Successfully updated daily stock!")
                    }
                }
                else {
                    const { data, status } = await stockApi.create({
                        vendorId: vendorId,
                        dailyStock: stock,
                        vehicleId: vehicleId,
                        driverId: driver,
                        region: area
                    })
                    if (status === 200 && data && data.message === 'Success') {
                        toast.success("Successfully added daily stock!")
                    }
                }
            }
            catch (e) {
                toast.error("Something went wrong!")
            }
            finally {
                setSubmitLoading(false)
            }
        },
    });

    const reAssignDrivers = async (vendorId) => {
        setAssignDriverLoading(true)
        const source = axios.CancelToken.source()
        try {
            const result = await driverApi.removeDrivers(vendorId)
            if(result && result.data && result.status===200) {
                const drivers = await driverApi.getDrivers(source)
                if(
                    drivers && drivers.data && drivers.status===200
                ) {
                    setCollection({
                        ...collection,
                        drivers: drivers.data.data.filter(driver =>
                            !driver.driver.vehicleId || driver.driver.vehicleId === vehicleId)
                            || []
                    })
                }
                setDriver("")
                toast.success("Assigned drivers were removed from the vehicles. Please reassign drivers and submit again!")
            }
        }
        catch (e) {
            toast.error('Something went wrong!')
        }
        finally {
            setAssignDriverLoading(false)
        }
    }

    return (
        <form className={'mt-8'}>
            {
                !loading ?
                    <>
                        <div className={'flex flex-col w-full lg:w-1/2 mt-4'}>
                            <label className="font-medium">Assign a driver to mobile shop</label>
                            <select value={driver}
                                    onChange={e => {setDriver(e.target.value)}}
                                    className={'rounded p-1 mb-2'}
                            >
                                <option value={""}>Select a driver</option>
                                {
                                    collection.drivers.map(item => (
                                        <option value={item._id} key={item._id}>{`${item.firstName} ${item.lastName}`}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className={'flex flex-col w-full lg:w-1/2 mt-4 mb-8'}>
                            <label className="font-medium">Assign an area to the mobile shop</label>
                            <select value={area}
                                    onChange={e => setArea(e.target.value)}
                                    className={'rounded p-1 mb-2'}
                            >
                                <option value={""}>Select an area</option>
                                {
                                    collection.areas.map(item => (
                                        <option value={item} key={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <GlobalFilter
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
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
                                                            disabled={true}
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
                                                            disabled={true}
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
                        {rows && !rows.length ? <div className="flex justify-center">No items to show</div> :
                            <Pagination
                                gotoPage={gotoPage}
                                canPreviousPage={canPreviousPage}
                                canNextPage={canNextPage}
                                previousPage={previousPage}
                                nextPage={nextPage}
                                pageCount={pageCount}
                                pageIndex={pageIndex}
                                pageOptions={pageOptions}
                                pageSize={pageSize}
                                setPageSize={setPageSize}
                            />
                        }
                        <div className={'flex justify-end'}>
                            <ModelBody buttonText={'Reassign Drivers'}
                                       modalText={'Do you really want to reassign drivers?'}
                                       onClick={async  () => await reAssignDrivers(vendorId)}
                                       loading={assignDriverLoading}
                                       buttonOutlined={true}
                                       disabled={!driver || !area}
                            />
                            <ModelBody buttonText={'Submit'}
                                       modalText={'Do you want to proceed with this data?'}
                                       onClick={async () => {
                                           if(!driver) toast.info("Please assign a driver!")
                                           if(!area) toast.info("Please assign an area!")
                                           if(driver && area) await formik.handleSubmit()
                                       }}
                                       loading={submitLoading}
                            />
                        </div>
                    </>
                    :
                    <div className={'flex justify-center w-full'}>
                        <Loader
                            type="ThreeDots"
                            color={'#000'}
                            height={64}
                            width={64}
                        />
                    </div>
            }
        </form>

    )
}