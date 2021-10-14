import React from "react"
import {useTable, useGlobalFilter, usePagination} from 'react-table'

import CardTemplate from "../card/template";
import GlobalFilter from "./global-filter";
import Pagination from "./pagination";

export default function TableWithPaginationGlobalSearch({columns, data, tableName}) {

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

    return (
        <div className="flex justify-center">
            <div className="w-full flex flex-col items-center justify-center p-0 lg:p-8">
                <div className="w-full text-3xl font-medium">My Products</div>
                <CardTemplate style={{overFlowX: "auto"}}>
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
                        {rows && rows.length ? rows.map(row => {
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
                        }) : null
                        }
                        </tbody>
                    </table>
                    {
                        rows && !rows.length ? <div className="flex justify-center">No items to show</div> :
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
                </CardTemplate>
            </div>
        </div>

    )
}