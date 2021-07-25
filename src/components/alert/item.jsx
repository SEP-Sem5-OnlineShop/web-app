import x from '../../assets/svg/alert/x.svg'
import min from '../../assets/svg/alert/min.svg'
import plus from '../../assets/svg/alert/plus.svg'

const Item = () => {
    return (
        <div className="w-1/3 p-8 flex flex-row bg-accent mt-8 rounded-2xl justify-between" >

        <div className="flex justify-center">
            <div className="rounded-xl w-20 h-20 flex justify-center items-center p-1 bg-white">
                <img width={20} src="../../assets/png/items/item1.png" alt="item1" />
            </div>
        </div>
        <div className="flex flex-col justify-between">
            <div className="text-base text-text flex justify-center mt-1">Burger with some</div>
            <div className="flex flex-row justify-between">
                <button className="rounded-xl w-15 h-12 flex justify-center items-center p-1 bg-white">
                    <img width={40} src={min} alt="" />
                </button>
                <p>10</p>
                <button className="rounded-xl w-15 h-12 flex justify-center items-center p-1 bg-white">
                    <img width={40} src={plus} alt="" />
                </button>
            </div>
        </div>
        <button className="rounded-xl w-15 h-12 flex justify-center items-center p-1 bg-white">
                <img width={40} src={x} alt="" />
        </button>
    </div>
    );
}
 
export default Item;