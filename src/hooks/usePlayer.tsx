import { useContext, createContext, useState, ReactNode, useRef, useEffect } from 'react';

const playerContext = createContext<any | undefined | null>(null);
export enum playerState {
	INIT,
	PLAYING,
	PAUSE,
	FINISH,
	READY
}
export const PlayerContextProvider = ({ children }: { children: ReactNode }) => {
	const [player, _] = useState(new Audio());
	const [state, setState] = useState<playerState>(playerState.INIT);
	const [playlist, setPlaylist] = useState([]);
	const playerRef = useRef(player);

	useEffect(() => {
		playerRef.current.addEventListener('canplay', () => setState(playerState.READY));
		playerRef.current.addEventListener('ended', () => setState(playerState.FINISH));
		playerRef.current.addEventListener('play', () => setState(playerState.PLAYING));
		playerRef.current.addEventListener('pause', () => setState(playerState.PAUSE));
	}, []);

	return (
		<playerContext.Provider value={[player, playlist, setPlaylist, state, setState]}>
			{children}
		</playerContext.Provider>
	);
};

export const usePlayer = () => {
	const [player, playlist, setPlaylist, state, setState]: any = useContext(playerContext);

	useEffect(() => {
		console.log(state);
	}, [state]);

	if (!player) {
		console.log("Player isn't initialized. Check player context for detail");
		return;
	}
	const setMusic = (src: string) => {
		player.src = src;
	};
	const pause = () => {
		player.pause();
	};
	const play = () => {
		player.play();
	};
	const addToPlaylist = (src: string) => {
		setPlaylist((current: string[]) => current.push(src));
	};

	const initializePlayer = () => {
		player.src = null;
		setState(playerState.INIT);
	};

	return {
		player,
		setMusic,
		pause,
		playlist,
		addToPlaylist,
		play,
		state,
		initializePlayer
	};
};

export default usePlayer;
