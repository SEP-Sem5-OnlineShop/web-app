import { useState } from "react";
import { FaStar } from "react-icons/fa";

const SetRatingComponent = () => {
const [rate, setRate] = useState(0);
  return (
    <div className="flex">
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label>
            <input className="invisible" type="radio" value={givenRating} onClick={() => {setRate(givenRating);}}/>
            <FaStar color={ givenRating < rate || givenRating === rate ? "#ffc107" : "#e4e5e9" } size={25} />
          </label>
        );
      })}
    </div>
    );
};

export default SetRatingComponent;