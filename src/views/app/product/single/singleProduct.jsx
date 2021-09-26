import React from 'react';
import Review from '../../../../components/review'
import ProductComponent from '../../productComponent'
import { IconContext } from "react-icons";
import { FaBell } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Rating from "react-rating"
import { BsStar } from "react-icons/bs"
import { BsStarFill } from "react-icons/bs"

export default function SingleProduct(props) {
    const comProps = {
        name: props.name || '',
        img: props.img || '',
        description: props.description || '',
        feedback: props.feedback || '',
    }

    const [alert, setAlert] = React.useState(false)
    const [favorite, setFavorite] = React.useState(false)

    return (
        <React.Fragment>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="relative">
                    <div className="w-full h-full bg-pizza bg-center bg-cover rounded-xl" style={{ minHeight: '50vh' }} />

                    <div className="absolute flex top-3 right-3">
                        <div className="p-4 bg-textLight bg-opacity-60 rounded-xl">
                            <IconContext.Provider value={{ color: alert ? "rgb(255, 193, 7)" : "#fff", className: "global-class-name", size: "1.5rem" }}>
                                <button onClick={() => setAlert(!alert)}>
                                    <FaBell />
                                </button>
                            </IconContext.Provider>
                        </div>
                        <div className="p-4 bg-textLight bg-opacity-60 rounded-xl ml-2">
                            <IconContext.Provider value={{ color: favorite ? "#EF4444" : "#fff", className: "global-class-name", size: "1.5rem" }}>
                                <button onClick={() => setFavorite(!favorite)}>
                                    <FaHeart />
                                </button>
                            </IconContext.Provider>
                        </div>
                    </div>
                </div>
                <div>
                    <span className="text-5xl font-bold text-textLight">Tasty Pizza</span>
                    <div>
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
                    <div className="mt-8">
                        <span className="text-secondary">
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and scrambled it to make a type
                            specimen book. It has survived not only five centuries, but also the leap into
                            electronic typesetting, remaining essentially unchanged. It was popularised in
                            the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                            and more recently with desktop publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum.

                        </span>
                    </div>
                    <div>
                        <div className="mt-8 text-lg text-secondary font-medium">Highlights</div>
                        <div>
                            <span className="text-secondary">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                                when an unknown printer took a galley of type and scrambled it to make a type
                                specimen book.
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-xl text-textLight font-medium">Reviews</div>
                    <div className="mt-4">
                        <div className=""><Review /></div>
                        <div className="mt-8"><Review /></div>

                        <section class="text-gray-600 body-font relative mt-16">
                            <div>
                                <div class="bg-white rounded-lg flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                                    <h2 class="text-xl text-textLight font-medium">Your Experience</h2>
                                    {/* <div className="w-2/5 h-1 bg-textLight" /> */}
                                    <p class="leading-relaxed mt-4 mb-5 text-gray-600">We always appreciate your concerns about the product</p>
                                    <div class="relative mb-4">
                                        <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                                        <input type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                    </div>
                                    <div class="relative mb-4">
                                        <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
                                        <textarea id="message" name="message" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="px-8 py-2 rounded-lg text-white bg-textLight">Post</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}