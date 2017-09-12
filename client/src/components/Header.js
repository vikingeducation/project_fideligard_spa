import React from 'react';

export default ({ text }) => {
	return (
		<nav className="navbar navbar-dark bg-primary fhps-navbar">
			<a className="navbar-brand" href="#">
				<img
					src="/img/page-logo.png"
					width="30"
					height="30"
					className="d-inline-block align-top"
					alt=""
				/>
				{' ' + text}
			</a>
		</nav>
	);
};
