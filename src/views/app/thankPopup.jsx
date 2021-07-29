import PopupComponent from '../../components/popup/popup';
import { useState } from 'react';
import smile from '../../../src/assets/svg/popup/smiling.svg';

/**
 * This is the place where thanks popup is created
 * popup element is called in here
 * 
 */

function ThankPopup() {
  const [buttonPopup,setButtonPopup]=useState(true);
//   const [buttonPopup,setButtonPopup]=useState(false);
  return (
      <body class="h-screen bg-accent content-around flex items-center flex justify-center text-success">
    <div className="">
      <main>
      <br></br>
      {/* <button onClick={()=>setButtonPopup(true)}>open</button> */}
      </main>
      <PopupComponent trigger={buttonPopup} setTrigger={setButtonPopup}>
        
        
          <div class="">
              <div className="flex justify-center text-green-600">
              <img width={152} src={smile} alt="smile" />
              {/* <svg xmlns="card" /> */}
              
              </div>
              <br></br>

              <div className="flex justify-center">
              <h1 class="font-sans md:font-serif text-base md:text-lg "><b>Thanks for Buying</b></h1>
              </div>
              <div className="flex justify-center">
              <h1 class="font-sans md:font-serif text-base md:text-lg "><b>Food from us!!</b></h1>
              </div>
              <br></br>
              <br></br>
            
          </div>

          {/* <button className="close-button" onClick={()=>setTrigger(false)}><b>close</b></button> */}
        
        
      </PopupComponent>
      {/* <MainRouter /> */}
      
    </div>
    </body>
  );
}

export default ThankPopup;
