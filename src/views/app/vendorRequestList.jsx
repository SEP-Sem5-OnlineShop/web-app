import React from 'react'
import VComponenet from '../../components/Admin/vendorRequestComponent';
import bread from '../../../src/assets/img/bread.jpg';


function VendorRequestList() {
    

  return (
    
        <div class="container flex flex-col mx-auto px-2 sm:px-4 items-center justify-center">

            <h1 className='pb-4 sm:pb-6 pt-4 sm:pt-12 text-2xl sm:text-4xl'><b><u>Vendor Requests</u></b></h1>
            
            <ul class="flex flex-col">
            <VComponenet image={bread} name='John Perera' region='Gampaha' date='12/01/2021' />
            <VComponenet image={bread} name='John Perera' region='Gampaha' date='12/01/2021' />
            <VComponenet image={bread} name='John Perera' region='Gampaha' date='12/01/2021' />
            <VComponenet image={bread} name='John Perera' region='Gampaha' date='12/01/2021' />

                
            </ul>
        </div>

     
  );
}

export default VendorRequestList;



