import React from "react"
import { useTable, useGlobalFilter } from 'react-table'
import {productApi} from "../../../../api";
import CardTemplate from "../../../../components/card/template";

export default function ProductList() {
    const [data, setData] = React.useState([])
    React.useEffect( async () => {
        try {
            const {data, status} =  await productApi.getList()
            const list = []
            data.data.forEach((item, index) => {
                list.push({
                    'col1': index+1,
                    'col2': item.product_name || "",
                    'col3': item.rating || "Not Set",
                    'col4': item.price || "",
                    'col5': item.discount || "Not Set",
                    'col6': item.stock || "0",
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
                Header: 'Rating',
                accessor: 'col3',
            },
            {
                Header: 'Price',
                accessor: 'col4',
            },
            {
                Header: 'Discount',
                accessor: 'col5',
            },
            {
                Header: 'Today Stock',
                accessor: 'col6',
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
    )
}