
import card from '../../../src/assets/img/bread.jpg';
import VendorProductComponent from '../../views/app/vendorProductComponent'
import VendorProductComponentAdded from '../../views/app/vendorComponentAdded'
/**
 * This is the place where payment popup is created
 * popup element is called in here
 * 
 */

function VendorProductList() {
  
  return (
      // <body class="h-screen bg-accent sm:bg-green content-around flex items-center flex justify-center">
        
      

      <div className="px-2 py-4 sm:px-12 sm:py-12 bg-white">
{/* 
<div className="h-32 mt-4 flex justify-center" >
                        <IconPanel />
                    </div> */}

                    
{/* <div className="mt-4" >
                        <VendorComponent name='vendor1' image={card} description='really good' vehicleNumber='kdu-1234' permitNumber='1234'/>
                    </div> */}

                    <br></br>


    <h1 className="text-2xl sm:text-3xl text-secondary flex flex-col font-bold">Today Items</h1>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
      <VendorProductComponentAdded name='Burger' image={card} number='10' price='100.00'/>
     <VendorProductComponentAdded name='Burger' image={card} number='10' price='100.00'/>
     <VendorProductComponentAdded name='Burger' image={card} number='10' price='100.00'/>
     <VendorProductComponentAdded name='Burger' image={card} number='10' price='100.00'/>
      
    </div>
    <br></br>
<br></br>

      <h1 className="text-2xl sm:text-3xl text-secondary flex flex-col font-bold">Bakery</h1>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
     <VendorProductComponent name='Burger' image={card} number='10' price='100.00'/>
     <VendorProductComponent name='Burger' image={card} number='10' price='100.00'/>
     <VendorProductComponent name='Burger' image={card} number='10' price='100.00'/>
     <VendorProductComponent name='Burger' image={card} number='10' price='100.00'/>
     <VendorProductComponent name='Burger' image={card} number='10' price='100.00'/>
     <VendorProductComponent name='Burger' image={card} number='10' price='100.00'/>
     <VendorProductComponent name='Burger' image={card} number='10' price='100.00'/>

     <br></br>
     {/* <VendorProductComponent name='Burger' image={card} number='10' price='100.00'/> */}
                    
    </div>
    <br></br>
    <h1 className="text-2xl sm:text-3xl text-secondary flex flex-col font-bold">Fruit</h1>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
      <VendorProductComponent name='Burger' image={card} number='10' price='100.00'/>
     <VendorProductComponent name='Burger' image={card} number='10' price='100.00'/>
     <VendorProductComponent name='Burger' image={card} number='10' price='100.00'/>
     <VendorProductComponent name='Burger' image={card} number='10' price='100.00'/>
     <VendorProductComponent name='Burger' image={card} number='10' price='100.00'/>
     <VendorProductComponent name='Burger' image={card} number='10' price='100.00'/>
      
    </div>

    </div>

  )
}

export default VendorProductList;
