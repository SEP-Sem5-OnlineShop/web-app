import React from "react"
import {useTable, useGlobalFilter, usePagination} from 'react-table'
import Loader from "react-loader-spinner";

import CardTemplate from "../card/template";
import GlobalFilter from "./global-filter";
import Pagination from "./pagination";
import LoadingButton from "../form-components/loading-button";
import {Link} from "react-router-dom";

export default function TableWithPaginationGlobalSearch({columns, data, tableName, type, link, loading}) {

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
                <div className={'w-full flex justify-between'}>
                    <div className="w-full text-3xl font-medium">{tableName}</div>
                    <Link to={`/app/${link || ''}`}>
                        <LoadingButton dataTestId={`add-new-${link || ''}`} text={`Add New ${type || ''}`} />
                    </Link>
                </div>
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
                        {
                            !loading ?
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
                                : null
                        }
                    </table>
                    {
                        loading ?
                                <div className={'flex justify-center w-full'}>
                                    <Loader
                                        type="ThreeDots"
                                        color={'#000'}
                                        height={64}
                                        width={64}
                                    />
                                </div>
                                :
                                null
                    }
                    {
                        rows && !rows.length && !loading ? <div className="flex justify-center">No items to show</div> :
                            null
                    }
                    {
                        rows && rows.length && !loading ?
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
                            /> :
                            null
                    }
                </CardTemplate>
            </div>
        </div>

    )
}