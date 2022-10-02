import { createContext, FC, useContext, useEffect, useState, SetStateAction, Dispatch } from 'react';


const backgroundContext = createContext<[string, Dispatch<SetStateAction<string>>] | null>(null);

export const BackgroundStore = ({ children }: { children: React.ReactNode }) => {
	const [background, setBackground] = useState<string>('');

	//'assets/gif/city_night.gif'
	// const findInitialBackground = () => {
	// 	setBackground(null);
	// };
	// useEffect(() => {
	// 	findInitialBackground();
	// }, []);

	return <backgroundContext.Provider value={[background, setBackground]}>{children}</backgroundContext.Provider>;
};

export const useBackground = () => {
	const [background, setBackground] = useContext<[string, Dispatch<SetStateAction<string>>]>(
		backgroundContext as any
	);

	// const setBG = (type: string) => {
	// 	set
	// };

	return {
		background,
		setBackground
	};
};
