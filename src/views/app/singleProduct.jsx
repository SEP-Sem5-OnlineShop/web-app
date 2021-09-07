import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import ReviewComponent from '../../components/Admin/reviewComponent'
import VendorProductComponent from '../../views/app/reviewVendorComponent'
import card from '../../../src/assets/img/bread.jpg';

export default function SingleProduct(props){
    const comProps = {
        name: props.name || '',
        img: props.img || '',
        description:  props.description || '',
        feedback: props.feedback || '',
    }

    return(
        <div className='bg-white pl-4 md:pl-20'>
            <h1 className="px-4 py-4 text-start text-4xl sm:text-6xl">{comProps.name}</h1>
            <br></br>
            {/* <div className='flex justify-between sm:justify-start '> */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 '>
            {/* <div className="flex flex-col md:flex-row"> */}
            <div className="flex justify-center">
                    
                    <br></br>
                    <div className='flex flex-col items-start px-8'>
                        <img src={comProps.img} alt="item1" className="h-24 w-24 sm:h-96 sm:w-96 rounded-2xl  shadow-md"/>
                    </div>
                
                </div>
                
                {/* <div className="flex justify-end "> */}
               <div>
                <div className="bg-white rounded-lg w-56 xl:w-96  m-auto">
                <h2><b><u>Ratings: </u></b></h2><br></br>
                    
                    <div className="w-full h-4 flex justify-between">
                        <label>5:</label>
                        <div className="w-3/4 h-full text-center text-xs text-white bg-warn rounded-full">
                             75%
                         </div>
                    </div><br></br>

                    <div className="w-full h-4 flex justify-between">
                        <label>4:</label>
                        <div className="w-1/4 h-full text-center text-xs text-white bg-warn rounded-full">
                             25%
                         </div>
                    </div><br></br>

                    <div className="w-full h-4 flex justify-between">
                        <label>3:</label>
                        <div className="w-1/2 h-full text-center text-xs text-white bg-warn rounded-full">
                             50%
                         </div>
                    </div><br></br>

                    <div className="w-full h-4 flex justify-between">
                        <label>2:</label>
                        <div className="w-1/5 h-full text-center text-xs text-white bg-warn rounded-full">
                             20%
                         </div>
                    </div><br></br>

                    <div className="w-full h-4 flex justify-between">
                        <label>1:</label>
                        <div className="w-1/2 h-full text-center text-xs text-white bg-warn rounded-full">
                             50%
                         </div>
                    </div>

                    
                    
                    
                    <br></br>

                </div>
                </div>

                <div className='pr-0 xl:pr-4 '>
                {/* <div className=' pl-24 text-lg sm:text-xlw-42  sm:w-1/3 '> */}
                <p className='flex justify-center'> 
                    {comProps.description}
                </p>
                <br>
                </br>
                <div className='flex flex-col justify-center items-center text-4xl sm:text-6xl px-4'>
            <StarRatingComponent 
                name="rate1" 
                starCount={5}
            />
             
            </div>
            </div>

            
            
                

            </div>
            


            <br></br>

            {/* <div className='flex flex-col justify-star items-start text-4xl sm:text-6xl px-4'>
            <StarRatingComponent 
                name="rate1" 
                starCount={5}
            />
             
            </div> */}
            <br></br>
            <br></br>

            {/* <div className='px-4 text-lg sm:text-xl'>
                <p> 
                    {comProps.description}
                </p>

            </div> */}

            <br></br>
            <br></br>
            <div className='flex justify-center md:justify-between '>
            <div className='pl-2 md:pl-4 text-lg sm:text-xl w-1/2 md:w-4/5'>
            {/* <div className='w-full'> */}
                <h2><b><u>Reviews: </u></b></h2><br></br>
                <ReviewComponent name='Perera' review='Really a good product' date='12/01/2021'/>
                <ReviewComponent name='Perera' review='Really a good product' date='12/01/2021'/>
                <ReviewComponent name='Perera' review='Really a good product' date='12/01/2021'/>
            </div>

            <div className='pr-0 md:py-5 md:pr-16 invisible md:visible'>
            {/* <div className='invisible md:visible'> */}
            <VendorProductComponent name='Burger' image={card} number='10' price='100.00'/><br></br>
            <VendorProductComponent name='Burger' image={card} number='10' price='100.00'/><br></br>
            <VendorProductComponent name='Burger' image={card} number='10' price='100.00'/>
            </div>

            </div>
            
            <br></br>
            <br></br>

            <div className='px-4 text-lg sm:text-xl '>
                <h2><b><u>Give your Feedback: </u></b></h2><br></br>
                </div>
                <br></br>
                <div className='px-4 text-lg sm:text-xl flex justify-between'>
                <input
                    feedback={comProps.feedback}
                    className={
                        `rounded-xl
                        bg-primary
                        w-1/2
                        mt-1 p-2
                        h-30 w-1/2
                        focus:outline-none
                        focus:shadow-md`}
                    
                        />
                     </div>
                <br></br>
                <div>
                    <button type="button" className="w-1/3 ml-4 py-3 mt-2 rounded-xl bg-primary text-secondary text-sm xs:text-lg md:text-base font-bold transform hover:scale-105 hover:shadow-md transition ease-out duration-400">
                    Submit
                    </button>
                </div>
                
                
            
            <br></br>
        </div>
    )

}