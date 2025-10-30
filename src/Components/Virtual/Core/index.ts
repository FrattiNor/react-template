import { binarySearch, getSizeList } from './utils';

import type { VirtualInnerProps, VirtualProps, VirtualState } from './type';

class VirtualCore {
	props: VirtualInnerProps = {} as VirtualInnerProps;
	state: VirtualState = { sizeList: null, rangeStart: null, rangeEnd: null, totalSize: null, scrollOffset: null, containerSize: null };

	// 初始化
	constructor(virtual?: VirtualCore) {
		if (virtual) {
			this.props = virtual.props;
			this.state = virtual.state;
		}
	}

	// 更新props【外部使用】，用于更新props，并触发一系列修改
	updateProps(props: VirtualProps) {
		// 判断propsChanged
		const enabledChanged = props.enabled !== this.props.enabled;
		const countChanged = props.count !== this.props.count;
		const overscanChanged = props.overscan?.[0] !== this.props.overscan?.[0] || props.overscan?.[1] !== this.props.overscan?.[1];
		const gapChanged =
			props.gap?.itemGap !== this.props.gap?.itemGap ||
			props.gap?.startGap !== this.props.gap?.startGap ||
			props.gap?.endGap !== this.props.gap?.endGap;
		const getItemKeyChanged = props.getItemKey !== this.props.getItemKey;
		const getItemSizeChanged = props.getItemSize !== this.props.getItemSize;
		// 更新props
		this.props = {
			enabled: props.enabled ?? true,
			...props,
		};
		//
		if (enabledChanged) {
			if ((this.props.enabled ?? true) === true) {
				this.updateSizeList();
				this.updateRange({ isScroll: false });
			} else {
				this.end();
			}
			return;
		}
		if (countChanged || getItemKeyChanged || getItemSizeChanged || gapChanged) {
			this.updateSizeList();
			this.updateRange({ isScroll: false });
			return;
		}
		if (overscanChanged) {
			this.updateRange({ isScroll: false });
			return;
		}
	}

	// 更新sizeList，同时触发更新totalSize
	private updateSizeList() {
		// 更新sizeList
		this.state.sizeList = getSizeList({
			gap: this.props.gap,
			count: this.props.count,
			getItemKey: this.props.getItemKey,
			getItemSize: this.props.getItemSize,
		});
		// 更新totalSize
		const nextTotalSize = (() => {
			if (Array.isArray(this.state.sizeList) && this.state.sizeList.length > 0)
				return this.state.sizeList[this.state.sizeList.length - 1].nextStart;
			return null;
		})();
		if (this.state.totalSize !== nextTotalSize) {
			this.state.totalSize = nextTotalSize;
			// 触发totalSizeChange回调
			if (this.props.onTotalSizeChange) {
				this.props.onTotalSizeChange(this.state.totalSize);
			}
		}
	}

	// 更新range
	private updateRange({ isScroll }: { isScroll: boolean }) {
		const { startIndex, endIndex } = (() => {
			if (
				typeof this.state.scrollOffset === 'number' &&
				typeof this.state.containerSize === 'number' &&
				Array.isArray(this.state.sizeList) &&
				this.state.sizeList.length > 0
			) {
				const _startIndex = binarySearch({
					startIndex: 0,
					endIndex: this.props.count - 1,
					getSize: (i) => this.state.sizeList?.[i].start ?? 0,
					target: this.state.scrollOffset,
				})[0];
				const _endIndex = binarySearch({
					startIndex: _startIndex,
					endIndex: this.props.count - 1,
					getSize: (i) => this.state.sizeList?.[i].end ?? 0,
					target: this.state.scrollOffset + this.state.containerSize,
				})[1];
				const startIndex = Math.max(0, _startIndex - (this.props.overscan?.[0] ?? 0));
				const endIndex = Math.min(this.props.count - 1, _endIndex + (this.props.overscan?.[1] ?? 0));
				return { startIndex, endIndex };
			}
			return { startIndex: null, endIndex: null };
		})();
		if (this.state.rangeStart !== startIndex || this.state.rangeEnd !== endIndex) {
			this.state.rangeStart = startIndex;
			this.state.rangeEnd = endIndex;
			// 触发rangeChange回调
			if (this.props.onRangeChange) {
				this.props.onRangeChange({ start: this.state.rangeStart, end: this.state.rangeEnd, isScroll });
			}
		}
	}

	// 结束
	end() {
		// 清空state
		this.state = { sizeList: null, rangeStart: null, rangeEnd: null, totalSize: null, scrollOffset: null, containerSize: null };
		// 触发totalSizeChange回调
		if (this.props.onTotalSizeChange) this.props.onTotalSizeChange(null);
		// 触发rangeChange回调
		if (this.props.onRangeChange) this.props.onRangeChange({ start: null, end: null, isScroll: false });
	}

	// 更新容器size【外部使用】
	updateContainerSize(size: number | null) {
		if (this.state.containerSize !== size) {
			this.state.containerSize = size;
			this.updateRange({ isScroll: false });
		}
	}

	// 更新滚动offset【外部使用】
	updateScrollOffset(offset: number | null, { isScroll }: { isScroll: boolean }) {
		if (this.state.scrollOffset !== offset) {
			this.state.scrollOffset = offset;
			this.updateRange({ isScroll });
		}
	}
}

export default VirtualCore;
