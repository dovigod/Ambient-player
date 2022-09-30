import { useRef } from 'react';

const useAnimationFrame = (animation: Function) => {
	const animationFrameRef = useRef(-1);

	const playAnimation = () => {
		animation();
		animationFrameRef.current = requestAnimationFrame(playAnimation);
	};

	const stopAnimation = () => {
		cancelAnimationFrame(animationFrameRef.current);
	};

	return {
		playAnimation,
		stopAnimation
	};
};
export default useAnimationFrame;
