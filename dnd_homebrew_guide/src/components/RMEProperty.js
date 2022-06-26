import React from 'react'
import Tooltip from 'rc-tooltip';

const RMEProperty = ({property}) => {
	return(
		<Tooltip placement="bottom" trigger={['hover', 'click', 'focus']} overlay={<span>{property}</span>}>
			<span>
				{property}
			</span>
		</Tooltip>
	)
}

export default RMEProperty;