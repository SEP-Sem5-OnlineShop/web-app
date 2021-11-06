import React from "react"

export default function Pagination({
    gotoPage,
    canPreviousPage,
    previousPage,
    nextPage,
    canNextPage,
    pageCount,
    pageIndex,
    pageOptions,
    pageSize,
    setPageSize
}) {
    return (
        <div className="p-2 flex justify-end items-center">
            <button className={"mx-2"} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
            </button>{' '}
            <button className={"mx-2"} onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
            </button>{' '}
            <button className={"mx-2"} onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
            </button>{' '}
            <button className={"mx-2"} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'>>'}
            </button>{' '}
            <span className={"ml-2"}>
              Page{' '}
                    <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <span className={"ml-2"}>
              | Go to page:{' '}
                    <input
                        className={"mx-2 outline-none p-1 rounded w-10"}
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                    />
            </span>{' '}
            <select
                className={"mx-2 outline-none p-1 rounded"}
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
            >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
        </div>
    )
}