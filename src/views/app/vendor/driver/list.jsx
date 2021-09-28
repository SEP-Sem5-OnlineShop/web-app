import React from "react"
import { useTable, useGlobalFilter } from 'react-table'
import parse from 'html-react-parser'
import { productApi } from "../../../../api";
import CardTemplate from "../../../../components/card/template";
import { Link } from "react-router-dom"

export default function DriverList() {
    const [data, setData] = React.useState([])
    React.useEffect(async () => {
        try {
            // const {data, status} =  await productApi.getList()
            const data = {
                data: [
                    {
                        _id: '456112354',
                        firstName: 'Saman',
                        lastName: 'Karunarathna',
                        telephone: '0712345678',
                        email: 'saman@gmail.com'
                    },
                    {
                        _id: '456114574',
                        firstName: 'Pasan',
                        lastName: 'Amarasingha',
                        telephone: '0712565678',
                        email: 'pasan@gmail.com'
                    },

                ]
            }
            const list = []
            data.data.forEach((item, index) => {
                list.push({
                    'col1': index + 1,
                    'col2': `${item.firstName} ${item.lastName}` || "",
                    'col3': item.telephone || "Not Set",
                    'col4': item.email || "",
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
                Header: 'Telephone',
                accessor: 'col3',
            },
            {
                Header: 'Email',
                accessor: 'col4',
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
            <div className="w-full flex flex-col items-center justify-center p-0 lg:p-8">
                <div className="w-full text-3xl font-medium">My Drivers</div>
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
            </div>
        </div>

    )
}