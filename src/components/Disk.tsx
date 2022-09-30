import { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Cursive from 'components/Basics/Cursive';
import { usePlayer, playerState } from 'hooks/usePlayer';
import useAnimationFrame from 'hooks/useAnimationFrame';
import { MusicMapType } from 'musicMap';

const Disk = ({ type }: { type: MusicMapType }) => {
	const [selected, setSelected] = useState(false);
	const { setMusic, pause, play, state, initializePlayer }: any = usePlayer();
	const [clicked, setClicked] = useState(false);
	const [popRecord, setPopRecord] = useState(false);
	const [hideCover, setHideCover] = useState(false);
	const [ready, setReady] = useState(false);
	const rotationRef = useRef(0);
	const recordRef = useRef<HTMLImageElement>(null);

	const rotate = useCallback(() => {
		if (recordRef.current) {
			rotationRef.current += 1;
			recordRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
		}
	}, [recordRef]);

	const { playAnimation, stopAnimation } = useAnimationFrame(rotate);

	const openCover = () => {
		if (!clicked) {
			setClicked(true);
			return;
		} else if (!ready) {
			setPopRecord(true);
			setTimeout(() => {
				setHideCover(true);
				setReady(true);
				setMusic('/assets/mp3/city-lights.mp3');
			}, 500);
		}
	};
	useEffect(() => {
		if (ready) {
			if (state === playerState.PLAYING) {
				playAnimation();
			} else {
				stopAnimation();
			}
		}
	}, [ready, state]);

	return selected ? (
		<Container onClick={openCover}>
			<UnderCover src={type ? type.image : undefined} hideCover={hideCover} />
			<RecordWrapper popRecord={popRecord}>
				<Record
					ref={recordRef}
					src={type ? type.diskImage : undefined}
					onClick={() => {
						if (ready) {
							if (
								state === playerState.PAUSE ||
								state === playerState.READY ||
								state === playerState.FINISH
							) {
								play();
							} else if (state === playerState.PLAYING) {
								pause();
							} else if (state === playerState.FINISH) {
								// setMusic('/assets/mp3/city-lights.mp3');
							}
						}
					}}
				/>
			</RecordWrapper>

			<Cover
				src={type ? type.image : undefined}
				clicked={clicked}
				hideCover={hideCover}
				onClick={() => {
					if (hideCover) {
						initializePlayer();
						setHideCover(false);
						setClicked(false);
						setPopRecord(false);
						setReady(false);
					}
				}}
			>
				<TitleContainer>
					<Cursive elem="span" size={30}>
						{type.title}
					</Cursive>
				</TitleContainer>
				<Author src="/assets/author.png" />
			</Cover>
		</Container>
	) : (
		<Container>
			<Cover src={type.image}>
				<TitleContainer>
					<Cursive elem="span" size={30}>
						{type.title}
					</Cursive>
				</TitleContainer>
				<Author src="/assets/author.png" />
			</Cover>
		</Container>
	);
};

export default Disk;

const RecordWrapper = styled.div<{ popRecord: boolean }>`
	position: absolute;
	left: 0;
	top: 0;
	transition: all 1s cubic-bezier(0.4, 0.78, 0.26, -0.74);
	transform: ${({ popRecord }) => (popRecord ? 'translateX(400px)' : null)};
`;
const Record = styled.img`
	width: 88vh;
	height: 88vh;
	object-fit: cover;
`;

const Cover = styled.div<{ src: string | undefined; clicked?: boolean; hideCover?: boolean }>`
	background-image: url(${({ src }) => src});
	background-repeat: no-repeat;
	background-size: cover;
	position: absolute;
	width: 88vh;
	height: 88vh;
	left: 0;
	top: 0;
	transform-origin: left center;
	transition: all 0.5s ease;
	transform: ${({ clicked, hideCover }) =>
		hideCover ? 'translateX(-90%)' : clicked ? 'rotate3d(0.1, 1, 0, 30deg)' : null};
	border-radius: 5px;
`;
const UnderCover = styled.img<{ hideCover: boolean }>`
	filter: brightness(30%);
	width: 88vh;
	height: 88vh;
	border-radius: 5px;
	transform: ${({ hideCover }) => (hideCover ? 'translateX(-90%)' : null)};
	transition: all 0.5s ease;
`;

const Container = styled.div`
	position: relative;
	width: 88vh;
	height: 88vh;
	cursor: pointer;
`;

const TitleContainer = styled.div`
	margin-top: 50px;
	border-top: 1px solid white;
	border-bottom: 1px solid white;
	width: 100%;
	display: flex;
	justify-content: center;
	padding: 20px 0;
	color: white;
`;

const Author = styled.img`
	width: 50px;
	height: 50px;
	position: absolute;
	bottom: 20px;
	left: calc(50% - 25px);
`;
