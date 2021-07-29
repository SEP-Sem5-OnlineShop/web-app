import PopupComponent from '../../components/popup/popup';
import { useState } from 'react';
import card from '../../../src/assets/svg/popup/credit-card.svg';

/**
 * This is the place where payment popup is created
 * popup element is called in here
 * 
 */

function PaymentPopup() {
  const [buttonPopup,setButtonPopup]=useState(true);
//   const [buttonPopup,setButtonPopup]=useState(false);
  return (
      // <body class="h-screen bg-accent sm:bg-green content-around flex items-center flex justify-center">
        <div className="h-screen bg-accent content-around flex items-center flex justify-center">
    <div className="">
      <main>
      <br></br>
      {/* <button onClick={()=>setButtonPopup(true)}>open</button> */}
      </main>
      <PopupComponent trigger={buttonPopup} setTrigger={setButtonPopup}>
        
        
          <div className="">
              <div className="flex justify-center">
              <img width={152} src={card} alt="card" />
              
              </div>
              <br></br>

              <div className="flex justify-center">
              <h1 className="font-sans md:font-serif text-base md:text-lg"><b>Complete Your Payment!!</b></h1>
              </div>
              <br></br>
              <br></br>
            
            <div className="flex justify-between relative h-32">
                <button className="bg-accent h-10 w-20 rounded-sm  filter drop-shadow-lg lg:drop-shadow-xl">cancel</button>
                <button className="bg-accent h-10 w-20 rounded-sm  filter drop-shadow-lg lg:drop-shadow-xl">Pay</button>
            </div>
            
          </div>

          {/* <button className="close-button" onClick={()=>setTrigger(false)}><b>close</b></button> */}
        
        
      </PopupComponent>
      {/* <MainRouter /> */}
      
    </div>
    </div>
  );
}

export default PaymentPopup;
