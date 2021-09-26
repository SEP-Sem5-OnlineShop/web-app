import React from 'react'

/**
 * This is the place where payment popup is created
 * popup element is called in here
 * 
 */

function VendorComponent(props) {
    const comProps = {
        name: props.name || '',
        // vendor: props.vendor || '',
        image: props.image || '',
        description:props.description || '',
        vehicleNumber: props.vehicleNumber || '',
        permitNumber: props.permitNumber || ''
        
    }

  return (
    <div className="" >
    
    <div className="flex flex-col justify-start items-start">
        <h1 className="text-3xl sm:text-4xl text-secondary font-bold flex item-justify">{comProps.name}</h1>
        </div><br></br>
<div className="flex flex-col justify-center items-center">
<img src={comProps.image} alt="item1" className="h-40 w-36 sm:h-80 w-72 flex item-center rounded-2xl overflow-hidden shadow-md"/><br></br>
</div>
        
<div className="flex flex-col justify-start items-start">
        <h2 className="text-sm sm:text-lg text-secondary">{comProps.description}</h2><br></br>

        <h3 className="m-2 text-sm sm:text-lg text-secondary"><b>Vehicle Number: </b>{comProps.vehicleNumber}</h3>
            <h3 className="m-2 text-sm sm:text-lg text-secondary"><b>Permit Number: </b>{comProps.permitNumber}</h3><br></br>

        
       
        <div className="mt-1 flex flex-row justify-between items-center">
            {/* <button className="rounded-xl shadow w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-white transform hover:scale-105 hover:shadow-md transition ease-out duration-400">
                <span className="text-3xl sm:text-4xl text-text">-</span>
            </button> */}
            {/* <h3 className="m-2 text-lg sm:text-xl text-secondary">Vehicle Number:{comProps.vehicleNumber}</h3>
            <h3 className="m-2 text-lg sm:text-xl text-secondary">Permit Number:{comProps.PermitNumber}</h3> */}
            {/* <button className="rounded-xl shadow w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-white transform hover:scale-105 hover:shadow-md transition ease-out duration-400">
                <span className="text-3xl sm:text-4xl text-text">+</span>
            </button> */}
        </div>
    </div>

    {/* <button className="rounded-xl shadow w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-white transform hover:scale-105 hover:shadow-md transition ease-out duration-400">
                <span className="text-3xl sm:text-4xl text-text">+</span>
            </button> */}
    
</div>
     
  );
}

export default VendorComponent;
