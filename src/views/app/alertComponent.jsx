const AlertComponent = () => {
    return (
        <div className="flex justify-between rounded-2xl overflow-hidden shadow-md bg-white h-40 sm:h-36" >
            <img src="img/item1.png" alt="item1" className="h-40 w-36 sm:h-36"/>
            <div className="mx-2 my-4 flex flex-col justify-between items-center">
                <a className="text-base sm:text-xl text-secondary font-semibold" href="/vendor/product1">Burger with some</a>
                <a className="text-sm sm:text-lg text-secondary" href="/vendor">Yummy Bakers</a>
                <div className="mt-1 flex flex-row justify-between items-center">
                    <button className="rounded-xl shadow w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-white transform hover:scale-105 hover:shadow-md transition ease-out duration-400">
                        <span className="text-3xl sm:text-4xl text-text">-</span>
                    </button>
                    <span className="m-2 text-lg sm:text-xl text-secondary">10</span>
                    <button className="rounded-xl shadow w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-white transform hover:scale-105 hover:shadow-md transition ease-out duration-400">
                        <span className="text-3xl sm:text-4xl text-text">+</span>
                    </button>
                </div>
            </div>
            <div className="mr-1 my:4 sm:mx-4 flex flex-col items-end justify-between">
                <button className="rounded-xl shadow w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center bg-white transform hover:scale-110 hover:shadow-md transition ease-out duration-400">
                    <span className="text-3xl sm:text-4xl text-danger">x</span>
                </button>
                <div className="text-base sm:text-xl text-secondary flex justify-center">1200.00</div>
            </div>
        </div>
    );
};
 
export default AlertComponent;