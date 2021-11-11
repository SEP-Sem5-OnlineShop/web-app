import * as React from "react";
import { useSelector } from "react-redux"

import fruits from "../../assets/svg/icons/Property 1=Pineapple.svg"
import bread from "../../assets/svg/icons/Property 1=Cup cake.svg"
import plant from "../../assets/svg/icons/Property 1=3.svg"
// import egg from "../../assets/svg/icons/Property 1=Egg.svg"
import iceCream from "../../assets/svg/icons/Property 1=Ice cream.svg"
import mushroom from "../../assets/svg/icons/Property 1=Mushroom.svg"

export default function IconPanel( {setOpenTab,openTab}) {
    const dashboardStrings = useSelector(state => state.language.languageFile.dashboard)
    return (
        <div className='h-full flex'>
            <div className='h-full flex flex-col items-center mx-1 xs:mx-2 sm:mx-4'>
                <a onClick={e => {e.preventDefault(); if(openTab === 1){setOpenTab(0);} else {setOpenTab(1);} }} href="#link1" >
                    <img className={"w-8 xs:w-10 sm:w-16 "+ (openTab === 1 ? "h-14 xs:h-16 sm:h-20" : "h-10 xs:h-12 sm:h-16")} src={fruits} alt='fruit' />
                </a>
                <span className='text-xs sm:text-sm font-medium xs:font-semibold dark:text-white'>{dashboardStrings.iconPanel.fruits}</span>
            </div>
            <div className='h-full flex flex-col items-center mx-1 xs:mx-2 sm:mx-4'>
                <a onClick={e => {e.preventDefault(); if(openTab === 2){setOpenTab(0);} else {setOpenTab(2);} }} href="#link1" >
                    <img className={"w-8 xs:w-10 sm:w-16 "+ (openTab === 2 ? "h-14 xs:h-16 sm:h-20" : "h-10 xs:h-12 sm:h-16")} src={mushroom} alt='vegetable' />
                </a>
                <span className='text-xs sm:text-sm font-medium xs:font-semibold dark:text-white'>{dashboardStrings.iconPanel.vegetables}</span>
            </div>
            <div className='h-full flex flex-col items-center mx-1 xs:mx-2 sm:mx-4'>
                <a onClick={e => {e.preventDefault(); if(openTab === 3){setOpenTab(0);} else {setOpenTab(3);} }} href="#link1" >
                    <img className={"w-8 xs:w-10 sm:w-16 "+ (openTab === 3 ? "h-14 xs:h-16 sm:h-20" : "h-10 xs:h-12 sm:h-16")} src={bread} alt='bakery' />
                </a>
                <span className='text-xs sm:text-sm font-medium xs:font-semibold dark:text-white'>{dashboardStrings.iconPanel.bakery}</span>
            </div>
            <div className='h-full flex flex-col items-center mx-1 xs:mx-2 sm:mx-4'>
                <a onClick={e => {e.preventDefault(); if(openTab === 4){setOpenTab(0);} else {setOpenTab(4);} }} href="#link1" >
                    <img className={"w-8 xs:w-10 sm:w-16 "+ (openTab === 4 ? "h-14 xs:h-16 sm:h-20" : "h-10 xs:h-12 sm:h-16")} src={plant} alt='plant' />
                </a>
                <span className='text-xs sm:text-sm font-medium xs:font-semibold dark:text-white'>{dashboardStrings.iconPanel.plants}</span>
            </div>
            <div className='h-full flex flex-col items-center mx-1 xs:mx-2 sm:mx-4'>
                <a onClick={e => {e.preventDefault(); if(openTab === 5){setOpenTab(0);} else {setOpenTab(5);} }} href="#link1" >
                    <img className={"w-8 xs:w-10 sm:w-16 "+ (openTab === 5 ? "h-14 xs:h-16 sm:h-20" : "h-10 xs:h-12 sm:h-16")} src={iceCream} alt='dessert' />
                </a>
                <span className='text-xs sm:text-sm font-medium xs:font-semibold dark:text-white'>{dashboardStrings.iconPanel.desserts}</span>
            </div>
            {/* <div className='h-full flex flex-col items-center justify-between mx-1 xs:mx-2 sm:mx-4'>
                <a onClick={e => {e.preventDefault(); setOpenTab(6); }} href="#link1" >
                    <img className={"w-8 xs:w-10 sm:w-16 "+ (openTab === 1 ? "h-14 xs:h-16 sm:h-20" : "h-10 xs:h-12 sm:h-16")} src={egg} alt='fruit' />
                </a>
                <span className='text-xs sm:text-sm font-medium xs:font-semibold dark:text-white'>{dashboardStrings.iconPanel.eggs}</span>
            </div> */}
        </div>
    )
}