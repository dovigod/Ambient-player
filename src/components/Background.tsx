import { useState } from 'react';
import styled from 'styled-components';

import { useBackground } from 'hooks/useBackground';

export const Background = () => {
	const { background } = useBackground();
	return <Container src={background as string}></Container>;
};

const Container = styled.div<{ src: string }>`
	position: fixed;
	top: 0;
	left: 0;
	background: url(${({ src }) => src});
	width: 100vw;
	height: 100vh;
	background-repeat: no-repeat;
	background-size: cover;
	z-index: 0;
`;
