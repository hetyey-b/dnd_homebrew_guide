import React from 'react';
import PropTypes from 'prop-types';

const Button = ({text, onClick, additionalCSS}) => {
	return(
		<button
			className={`
				border rounded shadow
				bg-steelBlue text-aliceBlue border-aliceBlue
				hover:bg-aliceBlue hover:text-steelBlue hover:border-steelBlue
				transition-colors duration-300 ease-in-out
				p-2 mt-4
				${additionalCSS}
				`}
			onClick={onClick}
		>
			{text}
		</button>
	)
}

Button.propTypes = {
	text: PropTypes.string,
	onClick: PropTypes.func,
	additionalCSS: PropTypes.string,
};

Button.defaultProps = {
	text: 'Click',
	onClick: () => {console.log('Click!')},
	additionalCSS: '',
}

export default Button;