import React from "react"
import HomeItem from "./home-item";
import { useSelector } from "react-redux"

import IconPanel from "./icon-panel"
import SwiperSliderContainer from "./swiper-slider-container";
import { SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { axios } from "../../api";


export default function HomeDsand() {
    const dashboardStrings = useSelector(state => state.language.languageFile.dashboard)
    
    const [vendors, setVendors] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        (async function listVendors(){
            setLoading(true);
            try {
                const { data, status } = await axios.get(`gen/customer/vendorlist`);
                if(status === 200) {
                    if(mounted && Array.isArray(data)) setVendors(data);
                    if(mounted) setLoading(false);
                    if(mounted) setError(null);
                }
            } catch (err) {
                setLoading(false);
                console.log(err);
                setError(err);
            }
        })()
        return () => {
            mounted = false
        }
    }, []);

    return (
        <React.Fragment>
            <div className="flex flex-col items-center">

                <div className="h-32 mt-8 hidden lg:block" >
                    <IconPanel />
                </div>

                <div className="w-11/12 mb-10 mt-8">
                    <span className="text-xl lg:text-3xl font-medium">{dashboardStrings.todaysDeals}</span>
                    <div className="mt-4 lg:mt-8 w-full relative z-0">
                        <SwiperSliderContainer className="relative z-0">
                            {vendors && <>
                                {vendors.map((vendor) => (
                                    <SwiperSlide key={vendor._id}>
                                        <HomeItem vendor={vendor} />
                                    </SwiperSlide>
                                ))}
                            </>}
                        </SwiperSliderContainer>
                    </div>
                </div>

                <div className="w-11/12 mb-10">
                    <span className="text-xl lg:text-3xl font-medium">{dashboardStrings.hotDeals}</span>
                    <div className="mt-4 lg:mt-8 w-full">
                        <SwiperSliderContainer>
                            {vendors && <>
                                {vendors.map((vendor) => (
                                    <SwiperSlide key={vendor._id}>
                                        <HomeItem vendor={vendor} />
                                    </SwiperSlide>
                                ))}
                            </>}
                        </SwiperSliderContainer>
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}