import React from "react";

export const Slider = ({ onChange }) => {
	return (
		<div className="slider">
			<input
				type="range"
				min="0"
				max="363"
				defaultValue="40"
				onChange={onChange}
			/>
		</div>
	);
};
