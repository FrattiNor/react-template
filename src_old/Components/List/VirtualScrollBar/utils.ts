export const getScrollBarWidth = () => {
	const container = document.createElement('div');
	container.setAttribute(
		'style',
		'position: fixed; z-index: -9999; opacity: 0; top: -9999px; left: -9999px; width: 100px; height: 100px; overflow: auto',
	);
	const content = document.createElement('div');
	content.setAttribute('style', 'width: 1000px; height: 1000px;');
	container.appendChild(content);
	document.body.appendChild(container);
	const scrollbarWidth = container.offsetWidth - container.clientWidth;
	const scrollbarHeight = container.offsetHeight - container.clientHeight;
	document.body.removeChild(container);
	return { height: scrollbarHeight, width: scrollbarWidth };
};
