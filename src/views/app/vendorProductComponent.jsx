import React from 'react'
import add from '../../assets/svg/icons/add.svg'


/**
 * This is the place where payment popup is created
 * popup element is called in here
 * 
 */

function VendorProductComponent(props) {
    const comProps = {
        name: props.name || '',
        // vendor: props.vendor || '',
        image: props.image || '',
        number:props.number || '',
        price: props.price || '',
        
    }

  return (
    <div className="flex justify-between rounded-2xl overflow-hidden shadow-md bg-white h-40 sm:h-36" >
    <img src={comProps.image} alt="item1" className="h-40 w-36 sm:h-36"/>
    <div className="mx-2 my-4 flex flex-col justify-between items-center">
        <a className="text-base sm:text-xl text-secondary font-semibold" href="/">Item - {comProps.name}</a>


        <div className="mt-1 flex flex-row justify-between items-center">
                    <button className="rounded-xl shadow w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-white transform hover:scale-105 hover:shadow-md transition ease-out duration-400">
                        <span className="text-3xl sm:text-4xl text-text">-</span>
                    </button>
                    <span className="m-2 text-lg sm:text-xl text-secondary rounded-xl shadow w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-white">{comProps.number}</span>
                    <button className="rounded-xl shadow w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-white transform hover:scale-105 hover:shadow-md transition ease-out duration-400">
                        <span className="text-3xl sm:text-4xl text-text">+</span>
                    </button>
                </div>

        <div className="mt-1 flex flex-row justify-between items-center">
            
            <span className="m-2 text-lg sm:text-xl text-secondary">Rs.{comProps.price}</span>
        </div>
    </div>

    <button className="rounded-xl shadow w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-white transform hover:scale-105 hover:shadow-md transition ease-out duration-400">
                {/* <span className="text-3xl sm:text-4xl text-text">+</span> */}
                <img width={26} src={add} alt="add"/>
            </button>
</div>






     
  );
}

export default VendorProductComponent;
