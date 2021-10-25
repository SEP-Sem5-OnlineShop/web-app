import { FaStar } from "react-icons/fa";

const RatingComponent = ({rating,size}) => {
    return (
        <div className="flex">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return <FaStar data-testid={`ratingstar-${ratingValue}`} key={ratingValue} color={ratingValue <= rating ? "#ffc107" : "#e4e5e9" } size={size} />;
            })}
        </div>
    );
};

export default RatingComponent;