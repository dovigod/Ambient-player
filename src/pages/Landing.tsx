import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, extend, useThree, ReactThreeFiber, MeshProps } from '@react-three/fiber';
import styled from 'styled-components';
import { BufferGeometry, Material, Mesh } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

extend({ OrbitControls });
const Orbit = () => {
	const { camera, gl } = useThree();
	return <orbitControls args={[camera, gl.domElement]} />;
};
const Box = (props: MeshProps) => {
	const ref = useRef<Mesh<BufferGeometry, Material | Material[]>>(null);
	useFrame((state) => {
		const box = ref.current as Mesh;
		box.rotation.x += 0.01;
		box.rotation.y += 0.01;
	});

	return (
		<mesh ref={ref} {...props}>
			<boxBufferGeometry />
			<meshBasicMaterial color="blue" />
		</mesh>
	);
};
const Landing = () => {
	return (
		<Container>
			<Canvas style={{ background: '#FFE6A7' }} camera={{ position: [3, 3, 3] }}>
				<Box position={[-1, 0, -5]} />
				<axesHelper args={[5]} />
				<Orbit />
			</Canvas>
		</Container>
	);
};
export default Landing;

const Container = styled.div`
	width: 100vw;
	height: 100vh;
`;
