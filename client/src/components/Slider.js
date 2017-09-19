import React from "react";

export const Slider = ({ onChange, date }) => {
	return (
		<div className="slider">
			<h3>{date}</h3>
			<input
				type="range"
				min="0"
				max="364"
				defaultValue="40"
				onChange={onChange}
			/>
		</div>
	);
};
