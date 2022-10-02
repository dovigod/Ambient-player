import { useContext, createContext, useState, ReactNode, useRef, useEffect ,useCallback} from 'react';

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


	const pause = () => {
		player.pause();
	};
	const play = () => {
		player.play();
	};
	const SpacePressEvent = useCallback((e : any) => {
		if(e.code ==='Space'){
			console.log(state)
			if(state === playerState.PLAYING){
				pause();
			} 
			else if(state === playerState.PAUSE || state === playerState.READY || state === playerState.FINISH){ play()}
		}

	},[state])


	if (!player) {
		console.log("Player isn't initialized. Check player context for detail");
		return;
	}
	const setMusic = (src: string) => {
		player.src = src;
	};

	const addToPlaylist = (src: string) => {
		setPlaylist((current: string[]) => current.push(src));
	};

	const initializePlayer = () => {
		player.src = null;
		setState(playerState.INIT);
	};

	const isInitializationFin = () => {
		if(player.src){
			return true;
		}
		return false;
	}
	
	return {
		player,
		setMusic,
		pause,
		playlist,
		addToPlaylist,
		play,
		state,
		initializePlayer,
		isInitializationFin,
		SpacePressEvent
	};
};

export default usePlayer;
