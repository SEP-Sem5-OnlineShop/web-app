import React from "react"

import { driverApi, axios} from "../../../../api";
import TableWithPaginationGlobalSearch from "../../../../components/table/table-with-pagination-global-search";

export default function DriverList() {
    const [data, setData] = React.useState([])
    React.useEffect(async () => {
        let mounted = true
        let source = axios.CancelToken.source()
        try {
            const {data, status} = await driverApi.getDrivers(source)
            const list = []
            if(data && data.data && status===200) {
                data.data.forEach((item, index) => {
                    list.push({
                        'col1': index + 1,
                        'col2': `${item.firstName} ${item.lastName}` || "",
                        'col3': item.telephone || "Not Set",
                        'col4': item.email || "",
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

    return (
        <TableWithPaginationGlobalSearch columns={columns} data={data} tableName={'My Drivers'} type={'Driver'} link={'driver'} />
    )
}