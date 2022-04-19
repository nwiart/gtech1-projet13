import { useNavigate } from "react-router-dom"

// Stupid react router v6 navigation only feasible with hooks.
// Gotta make a whole wrapper for it, ugh.
export const withRouter = (Comp) => {
	const Wrapper = (props) => {
		const navigate = useNavigate();

		return (
			<Comp
				navigate={navigate}
				{...props}
				/>
		);
	};

	return Wrapper;
}