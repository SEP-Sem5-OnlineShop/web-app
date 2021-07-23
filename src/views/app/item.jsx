import ItemComeponent from '../../components/home/item';
import card from '../../../src/assets/svg/popup/credit-card.svg';
import star from '../../../src/assets/svg/home/star.svg';
import clock from '../../../src/assets/svg/home/clock.svg'

/**
 * This is the place where payment popup is created
 * popup element is called in here
 * src>view>app>item.jsx
 * 
 */

function Item() {
  const img1=card;
  const rate='4.3';
  const time='12min';
  return (
      <body class="">
    <div className="">
        
      <ItemComeponent class="w-32">
        
        {/* this.props.img1=img1; */}
          <div class="">
              <div className="w-34 md:w-auto border-black">
              <img width={116} src={img1} alt="card" />
              
              </div>

            
            <div class="flex justify-between">
                <img width={12} src={star} alt="star" />
                <p class="px-1">{rate}</p>
                <p class="px-3"> </p>
                <img width={12} src={clock} alt="clock" />
                <p class="px-1">{time}</p>
            </div>
            
          </div>
       
        
      </ItemComeponent>
      {/* <MainRouter /> */}
      
    </div>
    </body>
  );
}

export default Item;