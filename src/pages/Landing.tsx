import styled from 'styled-components';
import Disk from 'components/Disk';
import { useBackground } from 'hooks/useBackground';
import musicMap from 'musicMap';
import { useState } from 'react';

const Landing = () => {
	const [musicSelected, setMusicSelected] = useState<number | null>(null);

	const { background, setBackground } = useBackground();
	const [show, setShow] = useState(false);

	return (
		<Container>
			<Background src={background} show={show} />

			<Main>
				<Carousel>
					{musicMap.map((record, idx) => {
						let tilt = null;

						if (idx === 0) {
							tilt = 'left';
						} else if (idx === 3) {
							tilt = 'right';
						}

						if (musicSelected) {
							if (record.id === musicSelected) {
								return (
									<Disk
										key={idx}
										type={record}
										setMusicSelected={setMusicSelected}
										musicSelected={musicSelected}
										setBackground={setBackground}
										setShow={setShow}
									/>
								);
							}
						} else {
							return (
								<Disk
									key={idx}
									type={record}
									tilt={tilt as string}
									setMusicSelected={setMusicSelected}
									musicSelected={musicSelected}
									setBackground={setBackground}
									setShow={setShow}
								/>
							);
						}
					})}
				</Carousel>
			</Main>
		</Container>
	);
};
export default Landing;

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	overflow-x: hidden;
	overflow-y: hidden;
	min-width: 1000px;
`;
const Background = styled.div<{ src: string; show: boolean }>`
	width: 100vw;
	height: 100vh;
	background: url(${({ src }) => src});
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	align-items: center;
	transition: all 0.4s ease;
	overflow-x: hidden;
	overflow-y: hidden;
	min-width: 1000px;
	transition: opacity 0.3s ease;
	position: fixed;
	z-index: 0;
	top: 0;
	left: 0;
	opacity: ${({ show }) => (show ? '1' : '0')};
`;

const Main = styled.main`
	z-index: 1;
	width: 100%;
`;

const Carousel = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	width: 100%;
	min-width: 1000px;
`;

const Volume = styled.div`
	width: 200px;
	height: 20px;
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 15px;
	position: fixed;
	bottom: 40px;
	left: calc(50% - 100px);
`;
