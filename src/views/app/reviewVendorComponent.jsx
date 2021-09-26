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
    <div className="flex justify-start rounded-2xl overflow-hidden shadow-md bg-white h-28 w-42 sm:h-36 sm:w-96" >
    <img src={comProps.image} alt="item1" className="h-16 w-16 sm:h-36 sm:w-36"/>
    <div className="mx-2 my-1 sm:my-4 flex flex-col justify-start items-start">
        <a className="text-xs sm:text-xl text-secondary font-semibold" href="/">Item - {comProps.name}</a>


        <div className="mt-1 flex justify-start items-start">
                   
                    <div className="m-2 text-xs sm:text-lg sm:text-xl text-secondary w-4 h-8 sm:w-10 sm:h-10 flex justify-start items-start">available: {comProps.number}</div>
                    
                </div>

        <div className="mt-1 flexjustify-start items-start">
            
            <span className="m-1 text-xs sm:text-lg sm:text-xl text-secondary">Rs.{comProps.price}</span>
        </div>
    </div>

</div>






     
  );
}

export default VendorProductComponent;
