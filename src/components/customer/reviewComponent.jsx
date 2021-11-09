import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import RatingComponent from "./ratingComponent";
import { useEffect } from "react";
import { axios } from "../../api";

const ReviewComponent = ({ review, width }) => {
    
    const [expand, setExpand] = useState(false);

    const string = (review.review ? review.review : "");
    const stringArray = string.split(' ');
    let para1 = '';
    let para2 = '';
    if (stringArray.length > 18) {
        para1 = stringArray.slice(0, 18).join(' ');
        para2 = stringArray.slice(18).join(' ');
    } else {
        para1 = string;
    }

    const [customer, setCustomer] = useState({})
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        async function detailsCustomer(customer_id){
          try {
            const { data } = await axios.get(`gen/customer/details/${customer_id}`);
            // const data = {name:"aaaaa", imageUrl:"b07915a3-66f3-409d-8350-24b804c04dca.jfif"};
            // data.imageUrl = "b07915a3-66f3-409d-8350-24b804c04dca.jfif";
            console.log('product screen customer details');
            // console.log(data);
            if (mounted) {
                setCustomer(data);
            };
            // setLoading(false);
          } catch (err) {
            console.log("customer felch error");
            // setError("customer felch error");
            // setLoading(false);
          };
        };
        if(review.customer){
            detailsCustomer(review.customer);
        }
        return () => {
            mounted = false;
            // console.log("cleanup")
        };
      }, [review.customer]);


    return (
        <div>
        {(review.customer && review.createdAt && review.rating && review.review) ?
        <div className="flex items-start w-full">
            <div className="ml-6 w-full">
                <div className="flex w-full">
                    <div className="flex-shrink-0">
                        <div className="inline-block relative">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                <img className="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src="/img/person2.jpg" alt="Profile" />
                                <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
                            </div>
                        </div>
                    </div>
                    <div className="ml-4">
                        <p className="flex">
                            <span className="font-bold text-text text-sm xxs:text-base sm:text-base dark:text-white">{customer.name || 'anonymous'}</span>
                        </p>
                        <p className="text-text text-xs xxs:text-sm sm:text-sm dark:text-white">{new Date(review.createdAt).toUTCString() || ''}</p>
                        <RatingComponent rating={review.rating} size={width>600?20:width>480?18:width>400?16:14} />
                    </div>
                </div>
                <div className="mt-1 mb-6 sm:mb-10">
                    <span className="mt-1 text-secondary text-xs xxs:text-sm sm:text-base dark:text-white">
                        {para1}
                    </span>
                    <AnimatePresence>
                        {expand &&
                            <motion.span
                                initial={{ opacity: 0, display: "none" }}
                                animate={{ opacity: 1, display: "inline" }}
                                exit={{ opacity: 0, display: "none" }} className="mt-1 text-secondary text-xs xxs:text-sm sm:text-base dark:text-white">
                                {` ${para2}`}
                            </motion.span>
                        }
                    </AnimatePresence>
                    <button className={`ml-2 text-xs xxs:text-sm sm:text-base + ${expand ? 'text-buttonColor' : 'text-info'}`} onClick={() => { setExpand(!expand) }}>
                        {(!expand && para2) ? ('Read more') : (expand && para2) ? ('Read less') : ('')}
                    </button>
                </div>
            </div>
        </div>
        : null
        }
        </div>
    );
};
 
export default ReviewComponent;