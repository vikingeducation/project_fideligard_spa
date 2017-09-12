import React from 'react';

export default ({ icon, className }) => {
	var useTag = `<use xlink:href="/svg/solid.svg#${icon}" />`;
	return (
		<svg className={className} dangerouslySetInnerHTML={{ __html: useTag }} />
	);
};
