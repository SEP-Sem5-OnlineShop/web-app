import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { CSVLink } from "react-csv";
import {vendorApi} from '../../../../api/index'
import CardDashboard from "../../../../components/card-desktop/index"

import "react-datepicker/dist/react-datepicker.css";

function convert(str) {
    let months = {
        Jan: "01",
        Feb: "02",
        Mar: "03",
        Apr: "04",
        May: "05",
        Jun: "06",
        Jul: "07",
        Aug: "08",
        Sep: "09",
        Oct: "10",
        Nov: "11",
        Dec: "12"
      },
      date = str.split(" ");
  
    return [date[3], months[date[1]], date[2]].join("-");
  }

export default function VendorReport(){
  const [startDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());
  let sDate =(convert(startDate.toString()))
  let eDate =(convert(EndDate.toString()))
  let today=convert((new Date()).toString())



  /////////////////////////////////
  // const validationSchema = Yup.object({
  //   sDate: Yup.date().default(() => new Date()),
  //   eDate: Yup.date().default(() => new Date()),
  // });

  // const initialValues = {
  //   sDate: convert(startDate.toString()),
  //   eDate: convert(startDate.toString()),
  // };
/////////////////////////


  const [purchases, setPurchases] = React.useState( [] );

  React.useEffect(async () => {
    try{
      const result = await vendorApi.getVendorPurchaseList('613eb365af0d5b2c142fa326'); /////////change this into params id
 
      setPurchases(result.data);
      console.log(typeof(result.data))
      console.log(result.data)
    }catch(e){
      console.log(e)
    }
    
  },[]);

  console.log(purchases)
const header = [
    ["vendor_id"],[ "totalItems"], ["totalCost"],["createdAt"],["discount"],[""],["Product id"]
    
  ];

    const csvData = [
        header,
      ];
      
      
      
  for(let index = 0; index < purchases.length; index++) {
    const element = purchases[index];
    const purchase=[];
    let date = (element.createdAt.substr(0,10))
    console.log(element.createdAt)
    console.log(date)
    console.log(convert((new Date()).toString()))
    console.log(sDate<=date && date<eDate)
    if(eDate<=(convert((new Date()).toString())) && sDate<=eDate){
    if(sDate<=date && date<=eDate){
    
        purchase.push((element.vendor_id).toString())
        purchase.push((element.totalItems).toString())
        purchase.push((element.totalCost).toString())
        purchase.push((element.createdAt).toString())
        purchase.push((element.discount).toString())
        purchase.push((element.products.product_id))
        for(let i= 0; i< element.products.length; i++){
          purchase.push(element.products[i].product_id)
        }
    
    csvData.push(purchase);
    }else{
      console.log("No det")
    }
  }else{
    console.log("Wrong date")
  }
  }
      
      console.log(csvData)

  console.log(sDate);
  console.log(eDate);




  return (
    <div className="text-xl ">
      <div className="flex justify-center grid grid-col-1 md:grid-cols-2 pl-2 md:pl-48">
          <div>
              Start date:
              
              <DatePicker className="bg-accent w-64 mt-4 pl-20 rounded-lg" selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
            

            <div>
              End date:
              <DatePicker className="bg-accent w-64 mt-4 pl-20 rounded-lg" selected={EndDate} onChange={(date) => setEndDate(date)} />
          </div>
            

            </div>

            <br></br>

            <div className="flex justify-center py-8">

            {/* <CardDashboard content= */}
            
            {(sDate<=eDate && eDate<=today)?(
              <CardDashboard content={
              <CSVLink data={csvData}>
                Purchase Details
            </CSVLink>}/>
            ):(
              ""
            )}

            


</div>
    </div>


    
  );
};