import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

const App = () => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
			const container = ref.current;
			// 场景
			const scene = new THREE.Scene();
			// 相机
			const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
			// 渲染器
			const renderer = new THREE.WebGLRenderer();
			// 渲染器setSize
			renderer.setSize(container.clientWidth, container.clientHeight);
			// （立方体）对象
			const geometry = new THREE.BoxGeometry(1, 1, 1);
			// 材质
			const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
			//  Mesh（网格），网格包含一个几何体以及作用在此几何体上的材质
			const cube = new THREE.Mesh(geometry, material);
			// 场景添加网格【默认添加位置为0，0，0】
			scene.add(cube);
			// 设置相机位置【z轴拉开5的距离】
			camera.position.z = 5;
			// 循环渲染函数
			function animate() {
				// 使立方体动起来
				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;
				// render
				renderer.render(scene, camera);
				// 递归调用
				requestAnimationFrame(animate);
			}

			// 判断是否支持webgl2
			if (!WebGL.isWebGL2Available()) {
				// 插入渲染器dom
				container.appendChild(renderer.domElement);
				// 开始渲染
				animate();

				return () => {
					container.removeChild(renderer.domElement);
				};
			} else {
				// 不支持webgl2
				const warning = WebGL.getWebGL2ErrorMessage();
				container.appendChild(warning);

				return () => {
					container.removeChild(warning);
				};
			}
		}
	});

	return <div ref={ref} style={{ width: '100%', height: '100%' }} />;
};

export default App;
