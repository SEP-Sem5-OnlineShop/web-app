const AlertComponent = () => {
    const item = 'Burger with some';
    const vendor = 'Yummy Bakers';
    const image = 'img/item1.png';
    let count = 10;
    let price = '1200.00';
    return (
        <div className="flex justify-between rounded-2xl overflow-hidden shadow-md bg-white h-28 sm:h-36 transform hover:scale-105 hover:shadow-lg transition ease-out duration-400" >
            <img src={ image } alt="" className="h-full w-20 sm:w-36 sm:h-36 object-cover"/>
            <div className="mx-2 my-2 flex flex-col justify-between items-center">
                <a className="text-base sm:text-xl text-secondary font-semibold" href="/vendor/product1">{ item }</a>
                <a className="text-sm sm:text-lg text-secondary" href="/vendor">{ vendor }</a>
                <div className="sm:mt-1 flex flex-row justify-between items-center">
                    <button className="rounded-xl shadow w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-white transform hover:scale-105 hover:shadow-md transition ease-out duration-400" onClick=''>
                        <span className="text-3xl sm:text-4xl text-text">-</span>
                    </button>
                    <span className="mx-1 text-lg sm:text-xl text-secondary">{ count }</span>
                    <button className="rounded-xl shadow w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-white transform hover:scale-105 hover:shadow-md transition ease-out duration-400" onClick=''>
                        <span className="text-3xl sm:text-4xl text-text">+</span>
                    </button>
                </div>
            </div>
            <div className="mr-1 my:4 sm:mx-4 flex flex-col items-end justify-between">
                <button className="rounded-xl shadow w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center bg-white transform hover:scale-110 hover:shadow-md transition ease-out duration-400" onClick=''>
                    <span className="text-3xl sm:text-4xl text-danger">x</span>
                </button>
                <div className="text-base sm:text-xl text-secondary flex justify-center">{ price }</div>
            </div>
        </div>
    );
};
 
export default AlertComponent;