import React from 'react';
import PropTypes from 'prop-types';

const Button = ({text, onClick, additionalCSS}) => {
	return(
		<button
			className={`
				border rounded shadow
				hover:bg-slate-500
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