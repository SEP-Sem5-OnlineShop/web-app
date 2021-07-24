import React from "react"
import sideDesign from "../../assets/svg/fixes/edge-corner-white.svg";
import HomeItem from "./home-item";


import pizza from "../../assets/img/pizza.jpg"

export default function HomeDsand() {
    return (
        <div className="w-screen min-h-screen overflow-x-hidden bg-primary">
            <div className="w-full min-h-screen overflow-x-hidden
                            bg-food-style bg-contain bg-center">
                <div className="h-44 w-full">

                </div>
                <div className="w-full bg-white rounded-t-6xl relative pt-32 flex justify-center" style={{minHeight: 'calc(100vh - 11rem)'}}>

                    {/*<div className="absolute right-0" style={{top: '-49px'}}>*/}
                    {/*    <img src={sideDesign} alt='sideDesign'/>*/}
                    {/*</div>*/}
                    <div className="w-11/12">
                        <span className="text-3xl font-medium">Today's Deals</span>
                        <div className="mt-8 flex justify-between">
                            <HomeItem
                                image={pizza}
                                vendor='Pizza Master'
                                road='19 Araliya Road'
                                city='Moratuwa'
                                price='Rs 980/='
                                time='40 - 50 min'
                            />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}