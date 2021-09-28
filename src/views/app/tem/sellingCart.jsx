import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { axios } from '../../../api';

// const SellingCart = () => {
//     const [imageUrl, setImageUrl] = useState('');
//     // const orderId='613eba8b94acbe3710fed691';

//     const [order, setOrder] = useState({a:'aaa',b:'bbb'});
//     const [orderId, setOrderId] = useState(null);

//     const handleSubmit = () => {
//         async function saveOrder(){
//             try {
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
//                 const { data } = await axios.post(`app/customer/purchase/`,{order});
//                 console.log('new order id');
//                 console.log(data);
//                 setOrderId(data);
//                 // alert('added alert');
//             } catch (error) {
//                 console.log(error);
//             };
//         };
//         saveOrder();
//     };

//     useEffect(() => {
//         async function generateQRCode(orderId){
//             try {
//                 const response = await QRCode.toDataURL(orderId);
//                 setImageUrl(response);
//             } catch (error) {
//                 console.log(error);
//             };
//         };
//         if(orderId){
//             generateQRCode(orderId);
//         }
//     }, [orderId])

//     return (
//         <div>
//             <div>
//                 {!orderId ? (<button className="p-2 bg-text" onClick={handleSubmit}>Submit</button>) : null}
//             </div>
//             <div>
//                 {imageUrl ? (<a href={imageUrl} download><img src={imageUrl} alt="qr" /></a>) : null}
//             </div>
//         </div>
//     )
// }




import { useTable, useGlobalFilter } from 'react-table'
import { useFormik } from 'formik';
import React from 'react';

const SellingCart = () => {
    const [data, setData] = React.useState([])
    const [formikInitial, setFormikInitial] = useState([])
    const vendor_id = "613eb365af0d5b2c142fa326";
    
    useEffect(() => {
        async function listProducts(vendor_id){
            try {
                const { data } = await axios.get(`gen/customer/products/sell/${vendor_id}`);
                console.log(data);
                const list = []
                const testData = []
                data.forEach((item, index) => {
                    list.push({
                        'col1': index + 1,
                        'col2': item.product_name || "",
                        'col3': [item.price || "", item._id],
                        'col4': [item.discount || "", item._id],
                        'col5': ["", item._id],
                    })
                    testData.push({
                        [item._id]: {
                            price: item.price || "0",
                            discount: item.discount || "0",
                            stock: item.stock || "0",
                        }
                    })
                })
                setData(list)
                setFormikInitial(testData)
            } catch (error) {
                console.log("product felch error");
              };
        };
        if (vendor_id) {
          listProducts(vendor_id);
        };
    }, [vendor_id]);

    const columns = React.useMemo(
        () => [
            {Header: '#',accessor: 'col1',},
            {Header: 'Name',accessor: 'col2',},
            {Header: 'Price',accessor: 'col3',},
            {Header: 'Discount',accessor: 'col4',},
            {Header: 'Today Stock',accessor: 'col5',},
        ],
        []
    )

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, } = useTable({ columns, data })


    const formik = useFormik({enableReinitialize: true,initialValues: {stockDetails: formikInitial,},onSubmit: values => {console.log(values)},});

    return (
        <div className="flex justify-center">
            <div className="w-full flex flex-col items-center justify-center p-8">
                <div className="w-full text-3xl font-medium">Sell</div>
                <form onSubmit={formik.handleSubmit}>
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
                                {rows.map((row, rowIndex) => {
                                    prepareRow(row)
                                    return (
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell, index) => {
                                                if (index === 2) return (
                                                    <td
                                                        {...cell.getCellProps()}
                                                        className="px-6 py-4 whitespace-nowrap text-center text-sm text-text"
                                                    >
                                                        {(formik.values.stockDetails[rowIndex] && formik.values.stockDetails[rowIndex][cell.value[1]]) ?
                                                            <input
                                                                value={formik.values.stockDetails[rowIndex][cell.value[1]]['price']}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                id={`stockDetails.${rowIndex}.${cell.value[1]}.price`} name={`stockDetails.${rowIndex}.${cell.value[1]}.price`}
                                                                className="bg-cardColor rounded-sm p-2" /> : ""}
                                                    </td>
                                                )
                                                if (index === 3) return (
                                                    <td
                                                        {...cell.getCellProps()}
                                                        className="px-6 py-4 whitespace-nowrap text-center text-sm text-text"
                                                    >
                                                        {(formik.values.stockDetails[rowIndex] && formik.values.stockDetails[rowIndex][cell.value[1]]) ?
                                                            <input
                                                                value={formik.values.stockDetails[rowIndex][cell.value[1]]['discount']}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                id={`stockDetails.${rowIndex}.${cell.value[1]}.discount`} name={`stockDetails.${rowIndex}.${cell.value[1]}.discount`}
                                                                className="bg-cardColor rounded-sm p-2" /> : ""}
                                                    </td>
                                                )
                                                if (index === 4) return (
                                                    <td
                                                        {...cell.getCellProps()}
                                                        className="px-6 py-4 whitespace-nowrap text-center text-sm text-text"
                                                    >
                                                        {(formik.values.stockDetails[rowIndex] && formik.values.stockDetails[rowIndex][cell.value[1]]) ?
                                                            <input
                                                                value={formik.values.stockDetails[rowIndex][cell.value[1]]['stock']}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                id={`stockDetails.${rowIndex}.${cell.value[1]}.stock`} name={`stockDetails.${rowIndex}.${cell.value[1]}.stock`}
                                                                className="bg-cardColor rounded-sm p-2" /> : ""}
                                                    </td>
                                                )
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
                    <div className="flex justify-end mt-4 w-full">
                        <button className="py-2 px-4 text-white bg-textLight rounded-lg" type="submit">
                            Submit
                    </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default SellingCart;