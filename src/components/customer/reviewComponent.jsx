import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion"
import RatingComponent from "./ratingComponent";

const ReviewComponent = ({review}) => {
    
    const [expand, setExpand] = useState(false);

    const string = review.review;
    const stringArray = string.split(' ');
    let para1 = '';
    let para2 = '';
    if (stringArray.length > 18) {
        para1 = stringArray.slice(0, 18).join(' ');
        para2 = stringArray.slice(18).join(' ');
    } else {
        para1 = string;
    }


    return (
        <div className="flex items-start">
            <div className="ml-6">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <div className="inline-block relative">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                <img className="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src={review.imageUrl} alt="Profile" />
                                <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
                            </div>
                        </div>
                    </div>
                    <div className="ml-4">
                        <p className="flex items-baseline">
                            <span className="text-gray-600 font-bold text-text">{review.customer_name || 'anonymous'}</span>
                        </p>
                        <RatingComponent rating={review.rating} size={20} />
                    </div>
                </div>
                <div className="mt-1 mb-6">
                    <span className="mt-1 text-secondary">
                        {para1}
                    </span>
                    <AnimatePresence>
                        {expand &&
                            <motion.span
                                initial={{ opacity: 0, display: "none" }}
                                animate={{ opacity: 1, display: "inline" }}
                                exit={{ opacity: 0, display: "none" }} className="mt-1 text-secondary">
                                {` ${para2}`}
                            </motion.span>
                        }
                    </AnimatePresence>
                    <button className="text-text ml-2" onClick={() => { setExpand(!expand) }}>
                        {(!expand && para2) ? ('Read more') : (expand && para2) ? ('Read less') : ('')}
                    </button>
                </div>
            </div>
        </div>
    );
};
 
export default ReviewComponent;