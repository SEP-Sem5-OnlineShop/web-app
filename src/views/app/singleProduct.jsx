import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-component';
import ReviewComponent from '../../components/Admin/reviewComponent'

export default function SingleProduct(props){
    const comProps = {
        name: props.name || '',
        img: props.img || '',
        description:  props.description || '',
        feedback: props.feedback || '',
    }

    return(
        <div className='bg-primary'>
            <div classNmae="">
                <h1 className="text-center text-4xl sm:text-6xl">{comProps.name}</h1>
                <br></br>
                <div className='flex flex-col justify-center items-center'>
                    <img src={comProps.img} alt="item1" className="h-40 w-40 sm:h-96 sm:w-96 rounded-2xl  shadow-md"/>
                </div>
                
            </div>
            <br></br>

            <div className='flex flex-col justify-center items-center text-4xl sm:text-6xl'>
            <StarRatingComponent 
                name="rate1" 
                starCount={5}
            />
             
            </div>
            <br></br>
            <br></br>

            <div className='px-4 text-lg sm:text-xl'>
                <p> 
                    {comProps.description}
                </p>

            </div>

            <br></br>
            <br></br>

            <div className='px-4 text-lg sm:text-xl'>
                <h2><b><u>Reviews: </u></b></h2><br></br>
                <ReviewComponent name='Perera' review='Really a good product' date='12/01/2021'/>
                <ReviewComponent name='Perera' review='Really a good product' date='12/01/2021'/>
                <ReviewComponent name='Perera' review='Really a good product' date='12/01/2021'/>
            </div>
            <br></br>
            <br></br>

            <div className='px-4 text-lg sm:text-xl '>
                <h2><b><u>Give your Feedback: </u></b></h2><br></br>
                </div>
                <div className='px-4 text-lg sm:text-xl flex justify-between'>
                <input
                    feedback={comProps.feedback}
                    className={
                        `rounded-xl
                        bg-white
                        w-1/2
                        mt-1 p-2
                        h-30 w-1/2
                        focus:outline-none
                        focus:shadow-md`}
                    
                        />
                    <button type="button" className="w-1/3 py-3 mt-2 rounded-xl bg-white text-secondary text-sm xs:text-lg md:text-base font-bold transform hover:scale-105 hover:shadow-md transition ease-out duration-400">
                    Submit
                    </button>
                </div>
                
                
            
            <br></br>
        </div>
    )

}