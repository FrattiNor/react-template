/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';

// Scene 场景
//  |- Camera 相机
//  |- Renderer 渲染器
//  |- Mesh 网格模型
//      |- Geometry 几何体
//      |- Material 材质

const width = 800; // 宽度
const height = 500; // 高度

const AppPages = () => {
	const containerRef = useRef<HTMLDivElement | null>(null);

	// === 定义场景 ===
	const [scene] = useState(() => {
		// 创建3D场景对象Scene
		const scene = new THREE.Scene();
		scene.background = new THREE.Color('#fafafa');
		// AxesHelper：辅助观察的坐标系
		const axesHelper = new THREE.AxesHelper(150);
		scene.add(axesHelper);
		return scene;
	});

	// === 定义相机 ===
	const [camera] = useState(() => {
		// OrthographicCamera 正投影相机
		// PerspectiveCamera 透视投影相机

		// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
		const camera = new THREE.PerspectiveCamera(45, width / height, 1, 3000);
		// 相机视锥体
		// PerspectiveCamera( fov, aspect, near, far )
		// fov	相机视锥体竖直方向视野角度	50
		// aspect	相机视锥体水平方向和竖直方向长度比，一般设置为Canvas画布宽高比width / height	1
		// near	相机视锥体近裁截面相对相机距离	0.1
		// far	相机视锥体远裁截面相对相机距离，far-near构成了视锥体高度方向	2000

		// 相机在Three.js三维坐标系中的位置
		// 根据需要设置相机位置具体值
		camera.position.set(200, 200, 200);

		// 相机观察目标指向Threejs 3D空间中某个位置
		camera.lookAt(0, 0, 0); // 坐标原点
		// camera.lookAt(0, 10, 0);  // y轴上位置10
		// camera.lookAt(mesh.position);// 指向mesh对应的位置

		return camera;
	});

	// === 定义渲染器 ===
	const [renderer] = useState(() => {
		// 创建渲染器对象
		const renderer = new THREE.WebGLRenderer({
			antialias: true, // 渲染器锯齿属性.antialias
		});
		// 设置three.js渲染区域的尺寸(像素px)
		renderer.setSize(width, height);
		return renderer;
	});

	const [gui] = useState(() => {
		// 实例化一个gui对象
		const gui = new GUI();
		//改变交互界面style属性
		gui.domElement.style.right = '0px';
		gui.domElement.style.width = '300px';
		// gui.onChange = () => {
		// 	renderer.render(scene, camera); //执行渲染操作
		// 	return gui;
		// };
		return gui;
	});

	useState(() => {
		// 设置相机控件轨道控制器OrbitControls
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.panSpeed = 0.5;
		controls.zoomSpeed = 0.5;
		controls.keyPanSpeed = 0.5;
		controls.rotateSpeed = 0.5;
		controls.keyRotateSpeed = 0.5;
		controls.autoRotateSpeed = 0.5;
		// 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
		controls.addEventListener('change', function () {
			renderer.render(scene, camera); //执行渲染操作
		});
		return controls;
	});

	useState(() => {
		// 点光源：两个参数分别表示光源颜色和光照强度
		// 参数1：0xffffff是纯白光,表示光源颜色
		// 参数2：1.0,表示光照强度，可以根据需要调整
		const pointLight = new THREE.PointLight(0xffffff, 1.0);
		pointLight.intensity = 2; // 光照强度
		pointLight.decay = 0.2; // 设置光源不随距离衰减
		pointLight.position.set(200, 300, 400); // 点光源位置
		scene.add(pointLight); // 点光源添加到场景中
		// 光源辅助观察
		const pointLightHelper = new THREE.PointLightHelper(pointLight, 10);
		scene.add(pointLightHelper);
		//环境光:没有特定方向，整体改变场景的光照明暗
		const ambient = new THREE.AmbientLight(0xffffff, 0.4);
		scene.add(ambient);
		// 通过GUI改变mesh.position对象的xyz属性
		gui.add(ambient, 'intensity', 0, 2.0)
			.name('环境光强度')
			.onChange(() => {
				renderer.render(scene, camera); //执行渲染操作
			});
		return;
	});

	// 插入一个基础网格
	useState(() => {
		// === 定义网格模型 ===
		// BoxGeometry 长方体
		// CylinderGeometry 圆柱体
		// SphereGeometry 球体
		// ConeGeometry 圆锥
		// PlaneGeometry 矩形平面
		// CircleGeometry 圆形平面
		// 创建一个长方体几何对象Geometry
		const geometry = new THREE.BoxGeometry(100, 100, 100);

		// MeshBasicMaterial 基础材质
		// MeshLambertMaterial 漫反射材质
		// MeshPhongMaterial 高光材质
		// MeshStandardMaterial 物理材质
		// MeshPhysicalMaterial 物理材质
		// PointsMaterial 点材质
		// LineBasicMaterial 线材质
		// SpriteMaterial 精灵材质
		// 创建一个材质对象Material
		const material = new THREE.MeshBasicMaterial({
			color: 0xff0000, // 0xff0000设置材质颜色为红色
			transparent: true, // 开启透明
			opacity: 0.1, // 设置透明度
		});

		// 网格模型对象Mesh
		// 两个参数分别为几何体geometry、材质material
		const mesh = new THREE.Mesh(geometry, material);

		// 设置网格模型在三维空间中的位置坐标，默认是坐标原点
		mesh.position.set(0, 0, 0);

		// 把网格模型添加到场景中
		scene.add(mesh);
		console.log(scene.children);
		return;
	});

	// 插入一个漫反射网格
	useState(() => {
		const geometry = new THREE.BoxGeometry(100, 100, 100);

		const material = new THREE.MeshLambertMaterial({});

		const mesh = new THREE.Mesh(geometry, material);

		mesh.position.set(10, 10, 10);

		scene.add(mesh);
		console.log(scene.children);

		gui.add(mesh.position, 'x', 0, 180)
			.name('mesh x')
			.onChange(() => {
				renderer.render(scene, camera); //执行渲染操作
			});
		gui.add(mesh.position, 'y', 0, 180)
			.name('mesh y')
			.onChange(() => {
				renderer.render(scene, camera); //执行渲染操作
			});
		gui.add(mesh.position, 'z', 0, 180)
			.name('mesh z')
			.onChange(() => {
				renderer.render(scene, camera); //执行渲染操作
			});
		return;
	});

	useEffect(() => {
		renderer.render(scene, camera);
		containerRef.current?.appendChild(renderer.domElement);
	}, []);

	return (
		<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<div ref={containerRef}></div>
		</div>
	);
};

export default AppPages;
