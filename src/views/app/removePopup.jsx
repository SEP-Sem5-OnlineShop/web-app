import PopupComponent from '../../components/popup/popup';
import { useState } from 'react';
import MessageComponent from '../../components/Admin/messageComponent'

/**
 * This is the place where remove popup is created
 * popup element is called in here
 * 
 */

function RemovePopup() {
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
        
        
         <MessageComponent label='Remove Message' message='message'/>
    <div className='flex justify-between'>
    <button type="button" className="w-1/3 py-3 mt-2 rounded-xl bg-primary text-secondary text-sm xs:text-lg md:text-base font-bold">
                Remove
            </button>
            <button type="button" className="w-1/3 py-3 mt-2 rounded-xl bg-primary text-secondary text-sm xs:text-lg md:text-base font-bold">
                Cancel
            </button>
    </div>
         
        
        
      </PopupComponent>
      {/* <MainRouter /> */}
      
    </div>
    </div>
  );
}

export default RemovePopup;
