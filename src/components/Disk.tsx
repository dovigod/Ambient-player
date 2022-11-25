import { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Cursive from 'components/Basics/Cursive';
import { usePlayer } from 'hooks/usePlayer';
import useAnimationFrame from 'hooks/useAnimationFrame';
import useOutsideDetector from 'hooks/useOutsideDetector';
import {playerState , DiskProps} from 'types';

const Disk = ({ key, type, tilt, setMusicSelected, setBackground, musicSelected, setShow, ...rest }: DiskProps) => {
	const [selected, setSelected] = useState(false);
	const { setMusic, pause, play, state, initializePlayer, isInitializationFin, SpacePressEvent }: any = usePlayer();
	const [clicked, setClicked] = useState(false);
	const [popRecord, setPopRecord] = useState(false);
	const [hideCover, setHideCover] = useState(false);
	const [ready, setReady] = useState(false);
	const rotationRef = useRef(0);
	const recordRef = useRef<HTMLImageElement>(null);
	const coverRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useOutsideDetector(
		[recordRef, coverRef, containerRef],
		() => {
			setMusicSelected(false);
			setSelected(false);
			setHideCover(false);
			setReady(false);
			setPopRecord(false);
			setClicked(false);
			rotationRef.current = 0;
			initializePlayer();
			setShow(false);
		},
		musicSelected === type.id
	);
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
				if (window.innerWidth > 1070) {
					setHideCover(true);
				}
				setReady(true);
				setMusic(type.music);
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

	useEffect(() => {
		window.addEventListener('resize', () => {
			const width = window.innerWidth;

			if (width > 1070) {
				if (clicked && popRecord) {
					setHideCover(true);
				}
			} else {
				if (clicked && popRecord) {
					setHideCover(true);
				}
			}
		});
		window.addEventListener('keypress', SpacePressEvent);
	}, []);

	let id: NodeJS.Timeout | string | number | undefined;

	const mouseenterHandler = () => {
		id = setTimeout(() => {
			setBackground(type.background);
			setShow(true);
		}, 200);
	};
	const mouseleaveHandler = () => {
		clearTimeout(id);
		setShow(false);
		setTimeout(() => setBackground(''), 200);
	};

	return selected ? (
		<Container ref={containerRef} onClick={openCover} selected={selected} tilt={tilt}>
			<UnderCover src={type ? type.image : undefined} hideCover={hideCover} />
			<RecordWrapper
				popRecord={popRecord}
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
			>
				<Record ref={recordRef} src={type ? type.diskImage : undefined} />
			</RecordWrapper>

			<Cover
				ref={coverRef}
				src={type ? type.image : undefined}
				clicked={clicked}
				hideCover={hideCover}
				onClick={() => {
					if (isInitializationFin) {
						initializePlayer();
						setHideCover(false);
						setClicked(false);
						setPopRecord(false);
						setReady(false);
						stopAnimation();
					}
				}}
			>
				<TitleContainer>
					<Cursive elem="span" size={2.5}>
						{type.title}
					</Cursive>
				</TitleContainer>
				<Author src={process.env.PUBLIC_URL + '/assets/author.png'} />
			</Cover>
		</Container>
	) : (
		<Container
			ref={containerRef}
			selected={selected}
			tilt={tilt}
			onClick={() => {
				setBackground(type.background);
				setSelected(true);
				setMusicSelected(type.id);
			}}
			onMouseEnter={mouseenterHandler}
			onMouseLeave={mouseleaveHandler}
		>
			<Cover src={type.image}>
				<TitleContainer>
					<Cursive elem="span" size={0.1}>
						{type.title}
					</Cursive>
				</TitleContainer>
				<Author src={process.env.PUBLIC_URL + '/assets/author.png'} />
			</Cover>
		</Container>
	);
};

export default Disk;

const RecordWrapper = styled.div<{ popRecord: boolean }>`
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	transition: all 1s cubic-bezier(0.4, 0.78, 0.26, -0.74);
	transform: ${({ popRecord }) => (popRecord ? 'translateX(20vw)' : null)};
	@media screen and (max-width: 1070px) {
		transform: none;
	}
`;
const Record = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`;

const Cover = styled.div<{ src: string | undefined; clicked?: boolean; hideCover?: boolean }>`
	background-image: url(${({ src }) => src});
	background-repeat: no-repeat;
	background-size: cover;
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	transform-origin: left center;
	transition: all 0.5s ease;
	transform: ${({ clicked, hideCover }) =>
		hideCover ? 'translateX(-20vw)' : clicked ? 'rotate3d(0, 1, 0, -30deg)' : null};
	border-radius: 5px;
	@media screen and (max-width: 1070px) {
		transform: ${({ clicked, hideCover }) =>
			hideCover ? 'rotate3d(0, 1, 0, 0deg)' : clicked ? 'rotate3d(0, 1, 0, -180deg)' : null};
	}
`;
const UnderCover = styled.img<{ hideCover: boolean }>`
	filter: brightness(30%);
	width: 100%;
	height: 100%;
	border-radius: 5px;

	transform: ${({ hideCover }) => (hideCover ? 'translateX(-20vw)' : null)};
	transition: all 0.5s ease;
	@media screen and (max-width: 1070px) {
		transform: none;
	}
`;

const Container = styled.div<{ selected: boolean; tilt?: string }>`
	position: relative;
	font-size: 100%;
	transition: all 0.5s ease;
	transform-style: preserve-3d;

	${({ selected, tilt }) =>
		selected
			? {
					width: 'max(min(40vh,40vw),400px)',
					height: 'max(min(40vh,40vw) , 400px)',
					cursor: 'pointer',
					position: 'fixed',
					top: 'calc(50vh - max(min(40vh,40vw) , 400px)/2)',
					left: 'calc(50vw - max(min(40vh,40vw) , 400px)/2)'
			  }
			: {
					width: '20rem',
					height: '20rem',
					marginRight: '20px',

					transform:
						tilt === 'left'
							? 'perspective(300px) rotateY(20deg)  translateZ(-100px)'
							: tilt === 'right'
							? 'perspective(300px) rotateY(-20deg) translateZ(-100px)'
							: 'perspective(300px) translateZ(-100px)',
					cursor: 'pointer',
					opacity: '0.6',
					'&:hover': {
						opacity: '1'
					}
			  }}
`;
//vis 1 ,2 , 3 , 4
// [ 1, 2, 3, 4, 5, 6, 7]
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
	width: 12%;
	height: auto;
	position: absolute;
	bottom: 20px;
	left: 44%;
`;
