import { useParams } from "react-router-dom";

const ProductScreen = () => {
    const { id: vendor_id } = useParams();
    const { pid: product_id } = useParams();

    const product = {
        product_id: '1',
        product_name: 'Burger with some',
        vendor_id: '613a23c0dd295c38362b2cbe',
        image: '/img/item1.png',
        description: 'ingredients: flour, vegetables, cheese, ketchup, mayoneese',
        price: 100,
        stock: 10,
        status: 'available',
        rating: 4.5,
        numReviews: 2,
        reviews: [
            {
                rating: 4,
                comment: 'good product',
                customer_id: '613a23c0dd295c38362b2cbe',
                customer_name: 'Asta',
            },
            {
                rating: 5,
                comment: 'good product',
                customer_id: '613a23c0dd295c38362b2cbe',
                customer_name: 'Yuno',
            },
        ]
    };

    return (
        <div className="px-2 py-4 sm:px-12 sm:py-12">
            <h1 className="text-4xl sm:text-5xl text-secondary flex flex-col">{product.product_name}</h1>
            <div className='mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4 '>
                <div className="flex justify-center">
                    <div className='flex flex-col items-start px-8 w-full'>
                        <img src={ product.image } alt="" className="w-full h-48 md:h-96 md:w-96 rounded-2xl  shadow-md object-cover"/>
                    </div>
                </div>
                <div>
                    <div className="bg-white rounded-lg w-56 xl:w-96  m-auto">
                        <h2><b><u>Ratings: </u></b></h2><br></br>
                        <div className="w-full h-4 flex justify-between">
                            <label>5:</label>
                            <div className="w-3/4 h-full text-center text-xs text-white bg-warn rounded-full">75%</div>
                        </div><br></br>
                        <div className="w-full h-4 flex justify-between">
                            <label>4:</label>
                            <div className="w-1/4 h-full text-center text-xs text-white bg-warn rounded-full">25%</div>
                        </div><br></br>
                        <div className="w-full h-4 flex justify-between">
                            <label>3:</label>
                            <div className="w-1/2 h-full text-center text-xs text-white bg-warn rounded-full">50%</div>
                        </div><br></br>
                        <div className="w-full h-4 flex justify-between">
                            <label>2:</label>
                            <div className="w-1/5 h-full text-center text-xs text-white bg-warn rounded-full">20%</div>
                        </div><br></br>
                        <div className="w-full h-4 flex justify-between">
                            <label>1:</label>
                            <div className="w-1/2 h-full text-center text-xs text-white bg-warn rounded-full">50%</div>
                        </div>
                    </div>
                </div>
                <div className='pr-0 xl:pr-4 '>
                    <p className='flex justify-center'> 
                        {product.description}
                    </p>
                </div>
            </div>
            <div className='flex md:justify-between '>
                <div className='mt-8 pl-2 md:pl-8 text-lg sm:text-xl w-full md:w-4/5'>
                    <h2><b>Reviews: </b></h2><br></br>
                </div>
            </div>
        </div>
    );
};
 
export default ProductScreen;