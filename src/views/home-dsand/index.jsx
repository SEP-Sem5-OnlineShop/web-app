import React from "react"
import HomeItem from "./home-item";
import { useSelector } from "react-redux"

import pizza from "../../assets/img/pizza.jpg"
import bread from "../../assets/img/bread.jpg"
import cherry from "../../assets/img/cherry.jpg"
import plants from "../../assets/img/plants.jpg"
import vegetables from "../../assets/img/vegetables.jpg"

import IconPanel from "./icon-panel"
import SwiperSliderContainer from "./swiper-slider-container";
import { SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";


export default function HomeDsand() {
    const dashboardStrings = useSelector(state => state.language.languageFile.dashboard)
    
    const [vendors, setVendors] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
    async function listVendors(){
        setLoading(true);
        try {
        // const { data } = await Axios.get(`app/customer/vendors/`);
        const data = [
            {
                _id: "613eb365af0d5b2c142fa326",
                vendor_name: "Yummy Backers",
                vendor_description: "Healthy eating means eating a variety of foods that give you the nutrients you need to maintain your health, feel good, and have energy.",
                image:"/img/vendor.jpg",
                rating: '4.0',
                ratingCount: 2,
            },
            {
                _id: "2",
                vendor_name: "Yummy Backers",
                vendor_description: "Healthy eating means eating a variety of foods that give you the nutrients you need to maintain your health, feel good, and have energy.",
                image:"/img/vendor.jpg",
                rating: '4.0',
                ratingCount: 2,
            },
            {
                _id: "3",
                vendor_name: "Yummy Backers",
                vendor_description: "Healthy eating means eating a variety of foods that give you the nutrients you need to maintain your health, feel good, and have energy.",
                image:"/img/vendor.jpg",
                rating: '4.0',
                ratingCount: 2,
            },
            {
                _id: "4",
                vendor_name: "Yummy Backers",
                vendor_description: "Healthy eating means eating a variety of foods that give you the nutrients you need to maintain your health, feel good, and have energy.",
                image:"/img/vendor.jpg",
                rating: '4.0',
                ratingCount: 2,
            },
            {
                _id: "5",
                vendor_name: "Yummy Backers",
                vendor_description: "Healthy eating means eating a variety of foods that give you the nutrients you need to maintain your health, feel good, and have energy.",
                image:"/img/vendor.jpg",
                rating: '4.0',
                ratingCount: 2,
            },
        ];
        setVendors(data);
        setLoading(false);
        setError(null);
        } catch (err) {
        setLoading(false);
        console.log(err);
        setError(err);
        };
    };
    listVendors();
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