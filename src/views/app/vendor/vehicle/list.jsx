import React from "react"
import {useTable, useGlobalFilter, usePagination} from 'react-table'
import {Link} from "react-router-dom";

import {axios, productApi} from "../../../../api";
import CardTemplate from "../../../../components/card/template";
import GlobalFilter from "../../../../components/table/global-filter";
import Pagination from "../../../../components/table/pagination";

const EditButton = (id) => {
    return (
        <Link to={`/app/product/${id}`}>
            <button>Edit</button>
        </Link>
    )
}

export default function VehiclesList() {

}