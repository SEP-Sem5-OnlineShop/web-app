import React, { useState } from "react"
import { useTable, useGlobalFilter } from 'react-table'
import { productApi } from "../../../../api";
import CardTemplate from "../../../../components/card/template";
import { Link } from "react-router-dom"

export default function DailyStockLoad() {
    const [data, setData] = React.useState([])
    const [testData, setTestData] = React.useState()
    const [form, setForm] = useState({})
    const DiscountField = (value, id) => {
        return (
            <input id={`discount_${id}`} name={`discount_${id}`} className="bg-cardColor rounded-sm p-2" />
        )
    }
    const DailyStockField = (value, id) => {
        return (
            <input id={`stock_${id}`} name={`stock_${id}`} className="bg-cardColor rounded-sm p-2" />
        )
    }
    const PriceField = (value,id) => {
        return (
            <input value={value} id={`stock_${id}`} name={`price_${id}`} className="bg-cardColor rounded-sm p-2" />
        )
    }
    React.useEffect(async () => {
        try {
            const { data, status } = await productApi.getList()
            setTestData(data.data || [])
            const list = []
            data.data.forEach((item, index) => {
                list.push({
                    'col1': index + 1,
                    'col2': item.product_name || "",
                    'col3': PriceField(item.price || "",item._id),
                    'col4': DiscountField(item.discount || "",item._id),
                    'col5': DailyStockField("", item._id),
                })
            })
            setData(list)
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

    return (
        <div className="flex justify-center">
            <div className="w-full flex flex-col items-center justify-center p-8">
                <div className="w-full text-3xl font-medium">Load Daily Stock to Mobile Shops</div>
                <div className="mt-4 flex flex-col items-start w-full">
                    <label className="font-medium">Select the mobile shop for loading stock</label>
                    <select>
                        <option>Vehicle 1</option>
                        <option>Vehicle 2</option>
                        <option>Vehicle 3</option>
                    </select>
                </div>
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
                            {rows.map(row => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
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
                </CardTemplate>
                <div className="flex justify-end mt-4 w-full">
                    <button className="py-2 px-4 text-white bg-textLight rounded-lg" type="button" onClick={() => {}}>
                        Submit
                    </button>
                </div>
            </div>
        </div>

    )
}