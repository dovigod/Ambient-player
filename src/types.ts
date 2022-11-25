import {ComponentType,Key,LazyExoticComponent} from 'react';

export type loaderType = () => () => Promise<{
    default: ComponentType<any>;
}>
export interface LazyComponent extends LazyExoticComponent<ComponentType<any>> {
    preload? : loaderType
}
export interface MusicMapType {
	id: number;
	type: string;
	background: string;
	music: string;
	image: string;
	diskImage: string;
	title: string;
}
export interface intersectionObserverOptionOverrider extends  IntersectionObserverInit{};
export interface DiskProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	type: MusicMapType;
	tilt?: string | undefined;
	setMusicSelected: any;
	setBackground: any;
	musicSelected: number | null;
	key: Key | null | undefined;
	setShow: any;
}

export enum playerState {
	INIT,
	PLAYING,
	PAUSE,
	FINISH,
	READY
}