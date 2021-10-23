import React from "react"
import {Link} from "react-router-dom"

import {axios, productApi} from "../../../../api";
import TableWithPaginationGlobalSearch from "../../../../components/table/table-with-pagination-global-search";
import ControlButtons from "../../../../components/table/control-buttons";

export default function ProductList() {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    React.useEffect( async () => {
        let mounted = true
        let source = axios.CancelToken.source()
        try {
            setLoading(true)
            const {data, status} =  await productApi.getList(source)
            const list = []
            if(data && data.data && status===200) {
                data.data.forEach((item, index) => {
                    list.push({
                        'col1': index+1,
                        'col2': item.product_name || "",
                        'col3': item.rating || "Not Set",
                        'col4': item.price || "",
                        'col5': item.discount || "Not Set",
                        'col6': item.stock || "0",
                        'col7': item._id
                    })
                })
            }
            if (mounted) setData(list)
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
            {
                Header: 'Operations',
                accessor: 'col7',
                Cell: ({cell: {value}}) => <ControlButtons id={value} type={'product'} api={productApi} />
            },
        ],
        []
    )

    return (
        <TableWithPaginationGlobalSearch loading={loading} columns={columns} data={data} tableName={'My Products'} type={'Product'} link={'product'} />
    )

}