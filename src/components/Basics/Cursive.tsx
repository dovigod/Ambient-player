import styled from 'styled-components';
import React, { createElement } from 'react';

interface CursiveProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
	elem?: string;
	children?: React.ReactNode | string | number | null;
	size?: number | string;
	margin?: string;
	padding?: string;
}
const Cursive = ({ elem = 'span', children, size, margin, padding, ...rest }: CursiveProps) => {
	return createElement(
		elem,
		{
			style: {
				fontFamily: `'Pacifico', cursive`,
				fontSize: typeof size === 'number' ? size + 'px' : size,
				margin,
				padding
			},
			...rest
		},
		children
	);
};

export default Cursive;
