import { createContext, useContext, useState, SetStateAction, Dispatch } from 'react';


const backgroundContext = createContext<[string, Dispatch<SetStateAction<string>>] | null>(null);

export const BackgroundStore = ({ children }: { children: React.ReactNode }) => {
	const [background, setBackground] = useState<string>('');
	return <backgroundContext.Provider value={[background, setBackground]}>{children}</backgroundContext.Provider>;
};

export const useBackground = () => {
	const [background, setBackground] = useContext<[string, Dispatch<SetStateAction<string>>]>(
		backgroundContext as any
	);
	return {
		background,
		setBackground
	};
};
