import React from "react"
import { IconContext } from "react-icons";
import Rating from "react-rating"
import { BsStar } from "react-icons/bs"
import { BsStarFill } from "react-icons/bs"
import { AnimatePresence, motion } from "framer-motion"

const string = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
const stringArray = string.split(' ')
let para1 = ''
let para2 = ''
if (stringArray.length > 20) {
    para1 = stringArray.slice(0, 20).join(' ')
    para2 = stringArray.slice(20).join(' ')
} else para1 = string

export default function Review() {

    const [expand, setExpand] = React.useState(false)

    return (
        <React.Fragment>
            <div class="flex items-start">
                <div class="ml-6">
                    <div className="flex">
                        <div class="flex-shrink-0">
                            <div class="inline-block relative">
                                <div class="relative w-16 h-16 rounded-full overflow-hidden">
                                    <img class="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src="https://picsum.photos/id/646/200/200" alt="Profile picture" />
                                    <div class="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
                                </div>
                                <svg class="fill-current text-white bg-green-600 rounded-full p-1 absolute bottom-0 right-0 w-6 h-6 -mx-1 -my-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-4">
                            <p class="flex items-baseline">
                                <span class="text-gray-600 font-bold text-text">Mary T.</span>
                                <span class="ml-2 text-green-600 text-xs">Verified Buyer</span>
                            </p>
                            <Rating
                                initialRating={3}
                                emptySymbol={<BsStar href="#icon-star-empty" className="icon" />}
                                fullSymbol={
                                    <IconContext.Provider value={{ color: "rgb(255, 193, 7)" }}>
                                        <BsStarFill href="#icon-star-full" className="icon" />
                                    </IconContext.Provider>}
                                readonly
                            />
                        </div>
                    </div>
                    <div class="mt-3">
                        <span class="mt-1 text-secondary">
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
                        <button className="text-text ml-2" onClick={() => { setExpand(!expand); console.log('test') }}>
                            {!expand ? 'Read more' : 'Read less'}
                        </button>
                    </div>
                    <div class="flex items-center justify-between mt-4 text-sm text-gray-600 fill-current">
                        <div class="flex items-center">
                            <span className="text-text">Was this review helplful?</span>
                            <button class="flex items-center ml-6">
                                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 0h1v3l3 7v8a2 2 0 0 1-2 2H5c-1.1 0-2.31-.84-2.7-1.88L0 12v-2a2 2 0 0 1 2-2h7V2a2 2 0 0 1 2-2zm6 10h3v10h-3V10z" /></svg>
                                <span class="ml-2">56</span>
                            </button>
                            <button class="flex items-center ml-4">
                                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 20a2 2 0 0 1-2-2v-6H2a2 2 0 0 1-2-2V8l2.3-6.12A3.11 3.11 0 0 1 5 0h8a2 2 0 0 1 2 2v8l-3 7v3h-1zm6-10V0h3v10h-3z" /></svg>
                                <span class="ml-2">10</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}