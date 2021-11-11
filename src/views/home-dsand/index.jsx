import React from "react"
import HomeItem from "./home-item";
import { useSelector } from "react-redux"

import IconPanel from "./icon-panel"
import SwiperSliderContainer from "./swiper-slider-container";
import { SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { axios } from "../../api";
import LoadingBox from "../../components/customer/loadingBox";
import MessageBox from "../../components/customer/messageBox";
import HomeProductItem from "./home-item/homeproductitem";


export default function HomeDsand() {
    const dashboardStrings = useSelector(state => state.language.languageFile.dashboard)
    
    const [vendors, setVendors] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setPoducts] = useState([])

    const [loading1, setLoading1] = useState(true);
    const [error1, setError1] = useState(null);
    const [products1, setPoducts1] = useState([])
    
    const [loading2, setLoading2] = useState(true);
    const [error2, setError2] = useState(null);
    const [products2, setPoducts2] = useState([])

    const [loading3, setLoading3] = useState(true);
    const [error3, setError3] = useState(null);
    const [products3, setPoducts3] = useState([])

    const [loading4, setLoading4] = useState(true);
    const [error4, setError4] = useState(null);
    const [products4, setPoducts4] = useState([])

    const [loading5, setLoading5] = useState(true);
    const [error5, setError5] = useState(null);
    const [products5, setPoducts5] = useState([])

    const [openTab, setOpenTab] = React.useState(0);

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
    
    useEffect(() => {
        let mounted = true;
        (async function listProducts(){
            try {
                const { data } = await axios.get(`gen/customer/home/productlist/deals`);
                console.log('home screen deals list');
                console.log(data);
                if(mounted) setPoducts(data);
                // if(mounted) setLoading0(false);
                // if(mounted) setError0(null);
            } catch (err) {
                // setLoading0(false);
                console.log(err);
                // setError0(err);
            }
        })()
        return () => {
            mounted = false
        }
    }, []);
    
    useEffect(() => {
        let mounted = true;
        async function listFruits(){
            try {
                const { data } = await axios.get(`gen/customer/home/productlist/fruit`);
                console.log('home screen fruits list');
                console.log(data);
                if(mounted) setPoducts1(data);
                if(mounted) setLoading1(false);
                if(mounted) setError1(null);
            } catch (err) {
                setLoading1(false);
                console.log(err);
                setError1(err);
            }
        }
        if(openTab===1){
            listFruits();
        }
        return () => {
            mounted = false
        }
    }, [openTab]);
    
    useEffect(() => {
        let mounted = true;
        async function listVegetables(){
            try {
                const { data } = await axios.get(`gen/customer/home/productlist/vegetable`);
                console.log('home screen vegetables list');
                console.log(data);
                if(mounted) setPoducts2(data);
                if(mounted) setLoading2(false);
                if(mounted) setError2(null);
            } catch (err) {
                setLoading2(false);
                console.log(err);
                setError2(err);
            }
        }
        if(openTab===2){
            listVegetables();
        }
        return () => {
            mounted = false
        }
    }, [openTab]);
    
    useEffect(() => {
        let mounted = true;
        async function listBakery(){
            try {
                const { data } = await axios.get(`gen/customer/home/productlist/bakery`);
                console.log('home screen bakery list');
                console.log(data);
                if(mounted) setPoducts3(data);
                if(mounted) setLoading3(false);
                if(mounted) setError3(null);
            } catch (err) {
                setLoading3(false);
                console.log(err);
                setError3(err);
            }
        }
        if(openTab===3){
            listBakery();
        }
        return () => {
            mounted = false
        }
    }, [openTab]);
    
    useEffect(() => {
        let mounted = true;
        async function listPlants(){
            try {
                const { data } = await axios.get(`gen/customer/home/productlist/plant`);
                console.log('home screen plant list');
                console.log(data);
                if(mounted) setPoducts4(data);
                if(mounted) setLoading4(false);
                if(mounted) setError4(null);
            } catch (err) {
                setLoading4(false);
                console.log(err);
                setError4(err);
            }
        }
        if(openTab===4){
            listPlants();
        }
        return () => {
            mounted = false
        }
    }, [openTab]);
    
    useEffect(() => {
        let mounted = true;
        async function listDessert(){
            try {
                const { data } = await axios.get(`gen/customer/home/productlist/dessert`);
                console.log('home screen dessert list');
                console.log(data);
                if(mounted) setPoducts5(data);
                if(mounted) setLoading5(false);
                if(mounted) setError5(null);
            } catch (err) {
                setLoading5(false);
                console.log(err);
                setError5(err);
            }
        }
        if(openTab===5){
            listDessert();
        }
        return () => {
            mounted = false
        }
    }, [openTab]);

    return (
        <React.Fragment>
            <div className="flex flex-col items-center">

                <div className="h-24 xs:h-28 sm:h-32 mt-6 xs:mt-7 sm:mt-8 " >
                    <IconPanel setOpenTab={setOpenTab} openTab={openTab} />
                </div>

                <div className={`w-11/12 mb-10 mt-2 sm:mt-8 ${openTab===0 ? 'block' : 'hidden'}`} >
                    <span className="text-xl lg:text-3xl font-medium dark:text-white">{dashboardStrings.todaysDeals}</span>
                    <div className="mt-4 lg:mt-8 w-full relative z-0">
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <SwiperSliderContainer className="relative z-0">
                            {vendors && <>
                                {vendors.map((vendor) => (
                                    <SwiperSlide key={vendor._id}>
                                        <HomeItem vendor={vendor} />
                                    </SwiperSlide>
                                ))}
                            </>}
                        </SwiperSliderContainer>
                    )}
                    </div>
                </div>

                <div className={`w-11/12 mb-10 ${openTab===0 ? 'block' : 'hidden'}`} >
                    <span className="text-xl lg:text-3xl font-medium dark:text-white">{dashboardStrings.hotDeals}</span>
                    <div className="mt-4 lg:mt-8 w-full">
                    {loading ? (
                        <LoadingBox></LoadingBox>
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <SwiperSliderContainer>
                            {products && <>
                                {products.map((product) => (
                                    <SwiperSlide key={product._id}>
                                        <HomeProductItem product={product} />
                                    </SwiperSlide>
                                ))}
                            </>}
                        </SwiperSliderContainer>
                    )}
                    </div>
                </div>
                
                
                <div className={`w-11/12 mb-10 sm:mt-8 ${openTab===1 ? 'block' : 'hidden'}`} >
                    <span className="text-xl lg:text-3xl font-medium dark:text-white">Fruits</span>
                        {(products1 && products1.length < 1) && <>
                            <div className="text-xs sm:text-sm text-text ml-2 sm:ml-6 mt-2 sm:mt-6 dark:text-white">No Products</div>
                        </>}
                    <div className="mt-4 lg:mt-8 w-full">
                    {loading1 ? (
                        <LoadingBox></LoadingBox>
                    ) : error1 ? (
                        <MessageBox variant="danger">{error1}</MessageBox>
                    ) : (
                        <SwiperSliderContainer>
                            {products1 && <>
                                {products1.map((product) => (
                                    <SwiperSlide key={product._id}>
                                        <HomeProductItem product={product} />
                                    </SwiperSlide>
                                ))}
                            </>}
                        </SwiperSliderContainer>
                    )}
                    </div>
                </div>
                <div className={`w-11/12 mb-10 sm:mt-8 ${openTab===2 ? 'block' : 'hidden'}`} >
                    <span className="text-xl lg:text-3xl font-medium dark:text-white">Vegitables</span>
                        {(products2 && products2.length < 1) && <>
                            <div className="text-xs sm:text-sm text-text ml-2 sm:ml-6 mt-2 sm:mt-6 dark:text-white">No Products</div>
                        </>}
                    <div className="mt-4 lg:mt-8 w-full">
                    {loading2 ? (
                        <LoadingBox></LoadingBox>
                    ) : error2 ? (
                        <MessageBox variant="danger">{error2}</MessageBox>
                    ) : (
                        <SwiperSliderContainer>
                            {products2 && <>
                                {products2.map((product) => (
                                    <SwiperSlide key={product._id}>
                                        <HomeProductItem product={product} />
                                    </SwiperSlide>
                                ))}
                            </>}
                        </SwiperSliderContainer>
                    )}
                    </div>
                </div>
                <div className={`w-11/12 mb-10 sm:mt-8 ${openTab===3 ? 'block' : 'hidden'}`} >
                    <span className="text-xl lg:text-3xl font-medium dark:text-white">Bakery</span>
                        {(products3 && products3.length < 1) && <>
                            <div className="text-xs sm:text-sm text-text ml-2 sm:ml-6 mt-2 sm:mt-6 dark:text-white">No Products</div>
                        </>}
                    <div className="mt-4 lg:mt-8 w-full">
                    {loading3 ? (
                        <LoadingBox></LoadingBox>
                    ) : error3 ? (
                        <MessageBox variant="danger">{error3}</MessageBox>
                    ) : (
                        <SwiperSliderContainer>
                            {products3 && <>
                                {products3.map((product) => (
                                    <SwiperSlide key={product._id}>
                                        <HomeProductItem product={product} />
                                    </SwiperSlide>
                                ))}
                            </>}
                        </SwiperSliderContainer>
                    )}
                    </div>
                </div>
                <div className={`w-11/12 mb-10 sm:mt-8 ${openTab===4 ? 'block' : 'hidden'}`} >
                    <span className="text-xl lg:text-3xl font-medium dark:text-white">Plants</span>
                        {(products4 && products4.length < 1) && <>
                            <div className="text-xs sm:text-sm text-text ml-2 sm:ml-6 mt-2 sm:mt-6 dark:text-white">No Products</div>
                        </>}
                    <div className="mt-4 lg:mt-8 w-full">
                    {loading4 ? (
                        <LoadingBox></LoadingBox>
                    ) : error4 ? (
                        <MessageBox variant="danger">{error4}</MessageBox>
                    ) : (
                        <SwiperSliderContainer>
                            {products4 && <>
                                {products4.map((product) => (
                                    <SwiperSlide key={product._id}>
                                        <HomeProductItem product={product} />
                                    </SwiperSlide>
                                ))}
                            </>}
                        </SwiperSliderContainer>
                    )}
                    </div>
                </div>
                <div className={`w-11/12 mb-10 sm:mt-8 ${openTab===5 ? 'block' : 'hidden'}`} >
                    <span className="text-xl lg:text-3xl font-medium dark:text-white">Dessert</span>
                        {(products5 && products5.length < 1) && <>
                            <div className="text-xs sm:text-sm text-text ml-2 sm:ml-6 mt-2 sm:mt-6 dark:text-white">No Products</div>
                        </>}
                    <div className="mt-4 lg:mt-8 w-full">
                    {loading5 ? (
                        <LoadingBox></LoadingBox>
                    ) : error5 ? (
                        <MessageBox variant="danger">{error5}</MessageBox>
                    ) : (
                        <SwiperSliderContainer>
                            {products5 && <>
                                {products5.map((product) => (
                                    <SwiperSlide key={product._id}>
                                        <HomeProductItem product={product} />
                                    </SwiperSlide>
                                ))}
                            </>}
                        </SwiperSliderContainer>
                    )}
                    </div>
                </div>

            </div>
        </React.Fragment>
    )
}