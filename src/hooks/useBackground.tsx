import { createContext, FC, useContext, useEffect, useState, SetStateAction, Dispatch } from 'react';

const bgType = {
	a: '123'
};
const backgroundContext = createContext<[string, Dispatch<SetStateAction<string>>] | null>(null);

export const BackgroundStore = ({ children }: { children: React.ReactNode }) => {
	const [background, setBackground] = useState<string>('');

	const findInitialBackground = () => {
		setBackground('assets/gif/rain.gif');
	};
	useEffect(() => {
		findInitialBackground();
	}, []);

	return <backgroundContext.Provider value={[background, setBackground]}>{children}</backgroundContext.Provider>;
};

export const useBackground = () => {
	const [background, setBackground] = useContext<[string, Dispatch<SetStateAction<string>>]>(
		backgroundContext as any
	);

	const setBG = (type: string) => {};

	return {
		background,
		setBG
	};
};
