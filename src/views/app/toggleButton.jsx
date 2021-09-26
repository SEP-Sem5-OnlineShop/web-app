import React from 'react'
import bell2 from '../../assets/svg/icons/bell_2.svg'

function Toggle() {
    

  return (
    <div class="flex items-end pr-0 pb-24 sm:pr-2">
        {/* <button class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-500 dark:focus:bg-gray-700">Download</button> */}
        
        <span class="border border-transparent"></span>

        <div class="relative">

            {/* <button class="relative z-10 block p-2 transition-colors duration-200 transform bg-primary rounded-md dark:bg-secondary hover:bg-accent dark:hover:bg-secondary focus:outline-none focus:bg-link dark:focus:bg-success"> */}
            <button class="relative block  transition-colors duration-200 transform bg-white rounded-md dark:bg-white hover:bg-accent dark:hover:bg-accent focus:outline-none focus:bg-warn dark:focus:bg-success">
                <img width={30} src={bell2} alt="bell2"/>
            </button>

        </div>
    </div>
     
  );
}

export default Toggle;



