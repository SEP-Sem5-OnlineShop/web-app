import React, {useEffect, useMemo, useState} from "react"

import {axios, vehicleApi} from "../../../../api";
import TableWithPaginationGlobalSearch from "../../../../components/table/table-with-pagination-global-search";
import ControlButtons from "../../../../components/table/control-buttons";
import vehicle from "../../../../api/app/vehicle";

export default function VehiclesList() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(async () => {
        let mounted = true

        let source = axios.CancelToken.source()

        try {
            setLoading(true)
            const {data, status} = await vehicleApi.getList(source)
            const list = []
            if (data && status === 200 && data.message === 'Success') {
                data.data.vendor.vehicles.forEach((item, index) => {
                    list.push({
                        'col1': index+1,
                        'col2': item.plateNumber || "",
                        'col3': `${item.brand} ${item.model}`,
                        'col4': item._id
                    })
                })
            }
            if(mounted) setData(list)
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

    const columns = useMemo(
        () => [
            {
                Header: '#',
                accessor: 'col1', // accessor is the "key" in the data
            },
            {
                Header: 'Plate Number ',
                accessor: 'col2',
            },
            {
                Header: 'Brand and Model',
                accessor: 'col3',
            },
            {
                Header: 'Operations',
                accessor: 'col4',
                Cell: ({cell: {value}}) => <ControlButtons id={value} type={'vehicle'} api={vehicleApi} />
            }
        ],
        []
    )

    return (
        <TableWithPaginationGlobalSearch loading={loading} columns={columns} data={data} tableName={'My Vehicles'} type={'Vehicle'} link={'vehicle'} />
    )
}