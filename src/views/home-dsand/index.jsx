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


export default function HomeDsand() {
    const dashboardStrings = useSelector(state => state.language.languageFile.dashboard)

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
                            <SwiperSlide>
                                <HomeItem
                                    image={pizza}
                                    vendor='Pizza Master'
                                    road='19 Araliya Road'
                                    city='Moratuwa'
                                    price='Rs 980/='
                                    time='40 - 50 min'
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <HomeItem
                                    image={bread}
                                    vendor='Bread Master'
                                    road='19 Araliya Road'
                                    city='Moratuwa'
                                    price='Rs 980/='
                                    time='40 - 50 min'
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <HomeItem
                                    image={cherry}
                                    vendor='Fruit Master'
                                    road='19 Araliya Road'
                                    city='Moratuwa'
                                    price='Rs 980/='
                                    time='40 - 50 min'
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <HomeItem
                                    image={vegetables}
                                    vendor='Vegetable Master'
                                    road='19 Araliya Road'
                                    city='Moratuwa'
                                    price='Rs 980/='
                                    time='40 - 50 min'
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <HomeItem
                                    image={plants}
                                    vendor='Plants Master'
                                    road='19 Araliya Road'
                                    city='Moratuwa'
                                    price='Rs 980/='
                                    time='40 - 50 min'
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <HomeItem
                                    image={bread}
                                    vendor='Bread Master'
                                    road='19 Araliya Road'
                                    city='Moratuwa'
                                    price='Rs 980/='
                                    time='40 - 50 min'
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <HomeItem
                                    image={cherry}
                                    vendor='Fruit Master'
                                    road='19 Araliya Road'
                                    city='Moratuwa'
                                    price='Rs 980/='
                                    time='40 - 50 min'
                                />
                            </SwiperSlide>
                        </SwiperSliderContainer>
                    </div>
                </div>

                <div className="w-11/12">
                    <span className="text-xl lg:text-3xl font-medium">{dashboardStrings.hotDeals}</span>
                    <div className="mt-4 lg:mt-8 w-full">
                        <SwiperSliderContainer>
                            <SwiperSlide>
                                <HomeItem
                                    image={pizza}
                                    vendor='Pizza Master'
                                    road='19 Araliya Road'
                                    city='Moratuwa'
                                    price='Rs 980/='
                                    time='40 - 50 min'
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <HomeItem
                                    image={bread}
                                    vendor='Bread Master'
                                    road='19 Araliya Road'
                                    city='Moratuwa'
                                    price='Rs 980/='
                                    time='40 - 50 min'
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <HomeItem
                                    image={cherry}
                                    vendor='Fruit Master'
                                    road='19 Araliya Road'
                                    city='Moratuwa'
                                    price='Rs 980/='
                                    time='40 - 50 min'
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <HomeItem
                                    image={vegetables}
                                    vendor='Vegetable Master'
                                    road='19 Araliya Road'
                                    city='Moratuwa'
                                    price='Rs 980/='
                                    time='40 - 50 min'
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <HomeItem
                                    image={plants}
                                    vendor='Plants Master'
                                    road='19 Araliya Road'
                                    city='Moratuwa'
                                    price='Rs 980/='
                                    time='40 - 50 min'
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <HomeItem
                                    image={bread}
                                    vendor='Bread Master'
                                    road='19 Araliya Road'
                                    city='Moratuwa'
                                    price='Rs 980/='
                                    time='40 - 50 min'
                                />
                            </SwiperSlide>
                            <SwiperSlide>
                                <HomeItem
                                    image={cherry}
                                    vendor='Fruit Master'
                                    road='19 Araliya Road'
                                    city='Moratuwa'
                                    price='Rs 980/='
                                    time='40 - 50 min'
                                />
                            </SwiperSlide>
                        </SwiperSliderContainer>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}