import React from "react"
import { useTable, useGlobalFilter, useAsyncDebounce } from 'react-table'
import parse from 'html-react-parser'
import { driverApi, axios} from "../../../../api";
import CardTemplate from "../../../../components/card/template";

export default function DriverList() {
    const [data, setData] = React.useState([])
    React.useEffect(async () => {
        let mounted = true
        let source = axios.CancelToken.source()
        try {
            const {data, status} = await driverApi.getDrivers(source)
            const list = []
            data.data.forEach((item, index) => {
                list.push({
                    'col1': index + 1,
                    'col2': `${item.firstName} ${item.lastName}` || "",
                    'col3': item.telephone || "Not Set",
                    'col4': item.email || "",
                })
            })
            if (mounted) setData(list)
        }
        catch (e) {
            if(!axios.isCancel(e)) throw e
        }

        return () => {
            mounted = false
            source.cancel()
        }
    }, [])

    const GlobalFilter = ({
                              preGlobalFilteredRows,
                              globalFilter,
                              setGlobalFilter,
                          }) => {
        const count = preGlobalFilteredRows.length
        const [value, setValue] = React.useState(globalFilter)
        const onChange = useAsyncDebounce(value => {
            setGlobalFilter(value || undefined)
        }, 200)

        return (
            <span>
      Search:{' '}
                <input
                    value={value || ""}
                    onChange={e => {
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    placeholder={`${count} records...`}
                    style={{
                        fontSize: '1.1rem',
                        border: '0',
                    }}
                />
    </span>
        )
    }

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
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable({ columns, data }, useGlobalFilter)

    return (
        <div className="flex justify-center">
            <div className="w-full flex flex-col items-center justify-center p-0 lg:p-8">
                <div className="w-full text-3xl font-medium">My Drivers</div>
                <CardTemplate>
                    <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
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