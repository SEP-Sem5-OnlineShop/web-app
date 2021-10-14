import React from "react"
import {Link} from "react-router-dom"

import {axios, productApi} from "../../../../api";
import TableWithPaginationGlobalSearch from "../../../../components/table/tableWithPaginationGLobalSearch";

const EditButton = (id) => {
    return (
        <Link to={`/app/product/${id}`}>
            <button>Edit</button>
        </Link>
    )
}

export default function ProductList() {
    const [data, setData] = React.useState([])
    React.useEffect( async () => {
        let mounted = true
        let source = axios.CancelToken.source()
        try {
            const {data, status} =  await productApi.getList(source)
            const list = []
            if(data && status===200) {
                data.data.forEach((item, index) => {
                    list.push({
                        'col1': index+1,
                        'col2': item.product_name || "",
                        'col3': item.rating || "Not Set",
                        'col4': item.price || "",
                        'col5': item.discount || "Not Set",
                        'col6': item.stock || "0",
                        'col7': EditButton(item._id)
                    })
                })
            }
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
            },
        ],
        []
    )

    return (
        <TableWithPaginationGlobalSearch columns={columns} data={data} tableName={'My Products'} />
    )

}