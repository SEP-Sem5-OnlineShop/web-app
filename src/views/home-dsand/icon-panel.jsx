import * as React from "react";
import { useSelector } from "react-redux"

import fruits from "../../assets/svg/icons/Property 1=Pineapple.svg"
import bread from "../../assets/svg/icons/Property 1=Cup cake.svg"
import plant from "../../assets/svg/icons/Property 1=3.svg"
import egg from "../../assets/svg/icons/Property 1=Egg.svg"
import iceCream from "../../assets/svg/icons/Property 1=Ice cream.svg"
import mushroom from "../../assets/svg/icons/Property 1=Mushroom.svg"

export default function IconPanel() {
    const dashboardStrings = useSelector(state => state.language.languageFile.dashboard)
    return (
        <div className='h-full flex'>
            <div className='h-full flex flex-col items-center justify-between mx-4'>
                <img className="w-16" src={fruits} alt='fruit' />
                <span className='text-sm font-semibold dark:text-white'>{dashboardStrings.iconPanel.fruits}</span>
            </div>
            <div className='h-full flex flex-col items-center justify-between mx-4'>
                <img className="w-16" src={mushroom} alt='fruit' />
                <span className='text-sm font-semibold dark:text-white'>{dashboardStrings.iconPanel.vegetables}</span>
            </div>
            <div className='h-full flex flex-col items-center justify-between mx-4'>
                <img className="w-16" src={bread} alt='fruit' />
                <span className='text-sm font-semibold dark:text-white'>{dashboardStrings.iconPanel.bakery}</span>
            </div>
            <div className='h-full flex flex-col items-center justify-between mx-4'>
                <img className="w-16" src={plant} alt='fruit' />
                <span className='text-sm font-semibold dark:text-white'>{dashboardStrings.iconPanel.plants}</span>
            </div>
            <div className='h-full flex flex-col items-center justify-between mx-4'>
                <img className="w-16" src={egg} alt='fruit' />
                <span className='text-sm font-semibold dark:text-white'>{dashboardStrings.iconPanel.eggs}</span>
            </div>
            <div className='h-full flex flex-col items-center justify-between mx-4'>
                <img className="w-16" src={iceCream} alt='fruit' />
                <span className='text-sm font-semibold dark:text-white'>{dashboardStrings.iconPanel.desserts}</span>
            </div>
        </div>
    )
}