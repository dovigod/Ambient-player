import styled from 'styled-components';
import Disk from 'components/Disk';
import endPoint from 'routes/endPoint';
import AxiosClient from 'utils/AxiosClient';
import { useBackground } from 'hooks/useBackground';
import musicMap from 'musicMap';

const Landing = () => {
	// console.log(endPoint.getLocation('Seoul'));
	// AxiosClient.get(endPoint.getLocation('Seoul')).then((res: any) => console.dir(res.json()));
	const { background, setBG } = useBackground();
	return (
		<Container src={background}>
			<Main>
				<Disk type={musicMap.city_night} />
			</Main>
		</Container>
	);
};
export default Landing;

const Container = styled.div<{ src: string }>`
	width: 100vw;
	height: 100vh;
	background: url(${({ src }) => src});
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	align-items: center;
	transition: all 0.4s ease;
`;

const Main = styled.main`
	z-index: 1;
`;
