import {Swiper} from "swiper/react";

export default function SwiperSliderContainer(props) {
    return (
        <>
            <Swiper slidesPerView={1} spaceBetween={10}
                    pagination={{"clickable": true}}
                    breakpoints={{
                        "480": {
                            "slidesPerView": 2,
                            "spaceBetween": 20,
                        },
                        "976": {
                            "slidesPerView": 4,
                            "spaceBetween": 20,
                        },
                        "1440": {
                            "slidesPerView": 5,
                            "spaceBetween": 20,
                        },
                    }}
            >
                {props.children}
            </Swiper>
        </>
    )
}