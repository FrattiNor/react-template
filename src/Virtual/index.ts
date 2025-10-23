import type { State, Props } from './type';
import { binarySearch, getSizeList } from './utils';

class Virtual<T> {
	container: HTMLElement | null = null;
	props: Props<T> = {} as Props<T>;
	state: State = { sizeList: null, rangeStart: null, rangeEnd: null, totalSize: 0, scrollOffset: 0 };
	resizeObserver: null = null;

	scrollFun = (e: Event) => {
		const offset = (e.target as HTMLDivElement)[this.props.horizontal === true ? 'scrollLeft' : 'scrollTop'];
		this.state.scrollOffset = offset;
		this.calcRange();
	};

	// 初始化
	constructor(props: Props<T>) {
		this.coverProps(props);
		if (this.container !== null && this.props.enabled === true) this.start();
	}

	// 覆盖props，内部使用，用于更新props
	private coverProps(props: Props<T>) {
		this.props = {
			...props,
			enabled: props.enabled ?? true,
			overscan: props.overscan ?? [0, 0],
			horizontal: props.horizontal ?? false,
		};
		this.container = this.props.getContainer();
	}

	// 更新props，外部使用，用于更新props，并触发一系列修改
	updateProps(props: Props<T>) {
		// 判断propsChanged
		const dataChanged = props.data !== this.props.data;
		const overscanChanged = props.overscan !== this.props.overscan;
		const horizontalChanged = props.horizontal !== this.props.horizontal;
		const containerRectChanged = props.containerSize !== this.props.containerSize;
		const getItemKeyChanged = props.getItemKey !== this.props.getItemKey;
		const containerChanged = this.container !== this.props.getContainer();
		const getItemSizeChanged = props.getItemSize !== this.props.getItemSize;
		// 更新props
		this.coverProps(props);
		//
		if (!this.container || this.props.enabled !== true) {
			this.end();
			return;
		}
		if (containerChanged || horizontalChanged) {
			this.end();
			this.start();
			return;
		}
		if (dataChanged || getItemKeyChanged || getItemSizeChanged) {
			this.updateSizeList();
			this.calcRange();
			return;
		}
		if (overscanChanged || containerRectChanged) {
			this.calcRange();
			return;
		}
	}

	private updateSizeList() {
		this.state.sizeList = getSizeList(this.props.data, this.props.getItemKey, this.props.getItemSize);
		this.updateTotalSize();
	}

	private updateTotalSize() {
		const nextTotalSize = this.state.sizeList?.[this.state.sizeList?.length - 1]?.end ?? 0;
		if (this.state.totalSize !== nextTotalSize) {
			this.state.totalSize = nextTotalSize;
			if (this.props.onTotalSizeChange) this.props.onTotalSizeChange(nextTotalSize);
		}
	}

	private calcRange() {
		const _startIndex = binarySearch({
			startIndex: 0,
			endIndex: this.props.data.length - 1,
			getSize: (i) => this.state.sizeList?.[i].start ?? 0,
			target: this.state.scrollOffset,
		})[0];
		const _endIndex = binarySearch({
			startIndex: _startIndex,
			endIndex: this.props.data.length - 1,
			getSize: (i) => this.state.sizeList?.[i].end ?? 0,
			target: this.state.scrollOffset + this.props.containerSize,
		})[1];
		const startIndex = Math.max(0, _startIndex - (this.props.overscan?.[0] ?? 0));
		const endIndex = Math.min(this.props.data.length - 1, _endIndex + (this.props.overscan?.[1] ?? 0));
		if (this.state.rangeStart !== startIndex || this.state.rangeEnd !== endIndex) {
			this.state.rangeStart = startIndex;
			this.state.rangeEnd = endIndex;
			if (this.props.onRangeChange) this.props.onRangeChange({ start: startIndex, end: endIndex });
		}
	}

	private start() {
		this.updateSizeList();
		this.calcRange();
		this.container?.addEventListener('scroll', this.scrollFun, { passive: true });
	}

	end() {
		this.container?.removeEventListener('scroll', this.scrollFun);
	}
}

export default Virtual;
