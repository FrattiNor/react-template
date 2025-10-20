/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import CannonDebugger from 'cannon-es-debugger';

const width = 800;
const height = 400;

const AppPages = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);

	// 场景
	const [scene] = useState(() => {
		const scene = new THREE.Scene();
		// scene.background = new THREE.Color('#fafafa');
		return scene;
	});

	// 创建物理世界
	const [world] = useState(() => {
		const world = new CANNON.World();
		world.gravity.set(0, -9.82, 0);
		return world;
	});

	const [cannonDebugger] = useState(() => {
		const cannonDebugger = CannonDebugger(scene, world, {
			onInit(_body, mesh) {
				mesh.visible = true;
			},
		});
		return cannonDebugger;
	});

	// 摄影机
	const [camera] = useState(() => {
		const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
		camera.position.set(4, 4, 15);
		camera.lookAt(0, 0, 0);
		return camera;
	});

	// 渲染器
	const [renderer] = useState(() => {
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(width, height);
		renderer.shadowMap.enabled = true;
		return renderer;
	});

	// 设置相机控件轨道控制器OrbitControls
	useState(() => {
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.panSpeed = 0.5;
		controls.zoomSpeed = 0.5;
		controls.keyPanSpeed = 0.5;
		controls.rotateSpeed = 0.5;
		controls.keyRotateSpeed = 0.5;
		controls.autoRotateSpeed = 0.5;
		return;
	});

	// AxesHelper：辅助观察的坐标系
	useState(() => {
		const axesHelper = new THREE.AxesHelper(150);
		scene.add(axesHelper);
	});

	// 物理材质
	const [defaultMaterial] = useState(() => {
		const defaultMaterial = new CANNON.Material('default');
		const defaultContactMaterial = new CANNON.ContactMaterial(defaultMaterial, defaultMaterial, {
			friction: 0.1,
			restitution: 0.7,
		});
		world.addContactMaterial(defaultContactMaterial);
		return defaultMaterial;
	});

	// 球体
	const [{ sphere, sphereBody }] = useState(() => {
		// 创建球体（物理）
		const sphereShape = new CANNON.Sphere(1);
		const sphereBody = new CANNON.Body({
			mass: 1,
			position: new CANNON.Vec3(0, 3, 0),
			shape: sphereShape,
			material: defaultMaterial,
		});
		world.addBody(sphereBody);
		// 创建球体（视觉）
		const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 16), new THREE.MeshStandardMaterial());
		sphere.position.setY(1);
		sphere.castShadow = true;
		scene.add(sphere);

		sphereBody.applyForce(new CANNON.Vec3(100, 0, 0), new CANNON.Vec3(0, 0, 0));

		return { sphere, sphereBody };
	});

	// 地面
	useState(() => {
		// 创建地面（物理）
		const floorShape = new CANNON.Plane();
		const floorBody = new CANNON.Body();
		floorBody.mass = 0; // 表示固定在这里。
		floorBody.addShape(floorShape);
		floorBody.material = defaultMaterial;
		floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
		world.addBody(floorBody);
		// 创建地面（视觉）
		const plane = new THREE.Mesh(new THREE.PlaneGeometry(15, 15), new THREE.MeshStandardMaterial());
		plane.rotateX(-Math.PI / 2);
		plane.receiveShadow = true;
		scene.add(plane);
		return plane;
	});

	// 光线
	useState(() => {
		const directionLight = new THREE.DirectionalLight();
		directionLight.castShadow = true;
		directionLight.position.set(5, 5, 6);
		const ambientLight = new THREE.AmbientLight(new THREE.Color('#ffffff'), 0.3);
		scene.add(ambientLight, directionLight);

		const directionLightHelper = new THREE.DirectionalLightHelper(directionLight, 2);
		directionLightHelper.visible = true;
		scene.add(directionLightHelper);
	});

	// 循环渲染
	const timeoutRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
	useEffect(() => {
		containerRef.current?.appendChild(renderer.domElement);
		const render = () => {
			if (timeoutRef.current) cancelAnimationFrame(timeoutRef.current);
			timeoutRef.current = requestAnimationFrame(() => {
				world.fixedStep();
				sphere.position.copy(sphereBody.position);
				cannonDebugger.update();
				renderer.render(scene, camera);
				render();
			});
		};
		render();
		return () => {
			if (timeoutRef.current) cancelAnimationFrame(timeoutRef.current);
		};
	}, []);

	return (
		<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
			<div ref={containerRef}></div>
		</div>
	);
};

export default AppPages;
