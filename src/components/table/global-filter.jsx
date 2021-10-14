import React from "react"
import { useAsyncDebounce } from 'react-table'

export default function GlobalFilter ({
                          globalFilter,
                          setGlobalFilter,
                      }) {
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
                placeholder={`Search any column here...`}
                className={"p-1 outline-none w-2/3 rounded"}
            />
    </span>
    )
}