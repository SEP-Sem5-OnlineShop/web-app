import { FaStar } from "react-icons/fa";

const StarRating = ({rating}) => {
    return (
        <div className="flex">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return <FaStar color={ratingValue <= rating ? "#ffc107" : "#e4e5e9" } size={20} />;
            })}
        </div>
    );
};

export default StarRating;