export interface MusicMapType {
	id: number;
	type: string;
	background: string;
	music: string;
	image: string;
	diskImage: string;
	title: string;
}
const DISK_IMAGE = process.env.PUBLIC_URL + '/assets/disk/';
const COVER_IMAGE = process.env.PUBLIC_URL + '/assets/cover/';

const getMp3File = (name: string) => process.env.PUBLIC_URL + `/assets/mp3/${name}.mp3`;

const MusicMap = [
	{
		id: 1,
		type: 'city_night',
		background: process.env.PUBLIC_URL + '/assets/gif/city_night.gif',
		music: getMp3File('city-lights'),
		image: COVER_IMAGE + 'city_night.gif',
		diskImage: DISK_IMAGE + 'city_night.webp',
		title: 'City Night'
	},
	{
		id: 2,
		type: 'room_night',
		background: process.env.PUBLIC_URL + '/assets/gif/home-alone2.webp',
		music: getMp3File('room_night'),
		image: COVER_IMAGE + 'room_night.gif',
		diskImage: DISK_IMAGE + 'room_night.webp',
		title: 'Alone at 3AM'
	},
	{
		id: 3,
		type: 'sad_man',
		background: process.env.PUBLIC_URL + '/assets/gif/alone.gif',
		music: getMp3File('Alien-Sky'),
		image: COVER_IMAGE + 'sad_man.webp',
		diskImage: DISK_IMAGE + 'sad_man.webp',
		title: 'Emotions at Dawn'
	},
	{
		id: 4,
		type: 'flower',
		background: process.env.PUBLIC_URL + '/assets/gif/peace.gif',
		music: getMp3File('luminense'),
		image: COVER_IMAGE + 'flower.webp',
		diskImage: DISK_IMAGE + 'flower.webp',
		title: 'Flower Bundle'
	}
];
export default MusicMap;
