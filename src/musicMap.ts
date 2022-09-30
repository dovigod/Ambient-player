export interface MusicMapType {
	type: string;
	background: string;
	music: string;
	image: string;
	diskImage: string;
	title: string;
}
const DISK_IMAGE = '/assets/disk/';
const COVER_IMAGE = '/assets/cover/';

const getMp3File = (name: string) => `/assets/mp3/${name}.mp3`;

const MusicMap = {
	city_night: {
		type: 'city_night',
		background: '',
		music: getMp3File('city-lights'),
		image: COVER_IMAGE + 'city_night.gif',
		diskImage: DISK_IMAGE + 'city_night.webp',
		title: 'City Night'
	}
};
export default MusicMap;
