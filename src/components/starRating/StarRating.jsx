import {Rating, StickerStar} from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ratingStyles = {
    itemShapes: StickerStar,
    activeFillColor: "#FABC2B",
    inactiveFillColor: "#E5E5E5"
};

const StarRating = ({
                        value,
                        onChange = () => {
                        },
                        readOnly = false,
                        maxWidth = 100
                    }) => {
    return (
        <Rating
            style={{maxWidth}}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            itemStyles={ratingStyles}
        />
    );
};

export default StarRating;