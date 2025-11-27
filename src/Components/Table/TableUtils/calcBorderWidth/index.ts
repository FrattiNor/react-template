import styles from './index.module.less';

const calcBorderWidth = (container: HTMLElement) => {
	const calcDom = document.createElement('div');
	calcDom.style.width = '100px';
	calcDom.style.height = '100px';
	calcDom.style.visibility = 'hidden';
	calcDom.style.opacity = '0';
	calcDom.style.zIndex = '-1';
	calcDom.style.overflow = 'scroll';
	calcDom.style.position = 'absolute';
	calcDom.style.top = '0px';
	calcDom.style.left = '0px';
	calcDom.className = styles['scrollbar'];
	container.appendChild(calcDom);
	// 创建内部元素并放置在容器中
	const calcDomInner = document.createElement('div');
	calcDomInner.style.width = '1000px';
	calcDomInner.style.height = '1000px';
	calcDom.appendChild(calcDomInner);

	const vScrollbarWidth = calcDom.offsetWidth - calcDom.clientWidth;
	const hScrollbarWidth = calcDom.offsetHeight - calcDom.clientHeight;

	return { calcDom, vScrollbarWidth, hScrollbarWidth };
};

export default calcBorderWidth;
