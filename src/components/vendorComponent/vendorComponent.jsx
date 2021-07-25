import plus from '../../assets/svg/alert/plus.svg'

const VendorComponent = () => {
    return (
        <div className="p-2 flex flex-row bg-accent rounded-2xl justify-between text-2xl text-text mt-8 mr-10" >

            <div className="rounded-xl w-22 h-22 m-2 flex justify-center items-center bg-white">
                <img width={100} src="img/item1.png" alt="item" />
            </div>
            <div className="m-2 mx-20 flex flex-col justify-between">
                <div className="font-medium flex justify-center">Burger with some</div>
                <span>Price. 120.00</span>
            </div>
            <div className="m-2 flex flex-col items-end justify-center">
                <button className="rounded-xl w-12 h-12 flex justify-center items-center bg-white">
                        <img width={40} src={plus} alt="" />
                </button>
            </div>
        </div>
    );
};
 
export default VendorComponent;