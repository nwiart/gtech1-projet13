import star from '../img/star.png';
import star_half from '../img/star_half.png';
import star_empty from '../img/star_empty.png';

const Rating = (props) => {

	if (props.ratingOverFive === undefined) {
		return (
			<>
				<img width="16" height="16" src={props.rating == 1 ? star_half : (props.rating >= 2  ? star : star_empty)} />
				<img width="16" height="16" src={props.rating == 3 ? star_half : (props.rating >= 4  ? star : star_empty)} />
				<img width="16" height="16" src={props.rating == 5 ? star_half : (props.rating >= 6  ? star : star_empty)} />
				<img width="16" height="16" src={props.rating == 7 ? star_half : (props.rating >= 8  ? star : star_empty)} />
				<img width="16" height="16" src={props.rating == 9 ? star_half : (props.rating == 10 ? star : star_empty)} />
			</>
		);
	}
	else {
		return (
			<>
				<img width="16" height="16" src={props.ratingOverFive >= 1 ? star : star_empty} />
				<img width="16" height="16" src={props.ratingOverFive >= 2 ? star : star_empty} />
				<img width="16" height="16" src={props.ratingOverFive >= 3 ? star : star_empty} />
				<img width="16" height="16" src={props.ratingOverFive >= 4 ? star : star_empty} />
				<img width="16" height="16" src={props.ratingOverFive == 5 ? star : star_empty} />
			</>
		);
	}
};

export default Rating;