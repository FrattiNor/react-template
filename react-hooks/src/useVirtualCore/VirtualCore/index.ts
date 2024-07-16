/* eslint-disable @typescript-eslint/no-unused-vars */
import { findIndexByBinarySearchStart, findIndexByBinarySearchEnd } from './utils';

import type { IndexOffsetItem, VirtualCoreChangeableOption, VirtualCoreStaticOption, VirtualCoreState } from './type';

class VirtualCore {
    // 初始state默认值
    state: VirtualCoreState = {
        containerSize: undefined,
        containerOffset: undefined,
        startIndex: undefined,
        endIndex: undefined,
        indexOffsets: undefined,
    };
    // 初始option默认值
    staticOption: Required<VirtualCoreStaticOption> = {
        horizontal: false,
        getContainer: () => null,
    };
    // 初始可变option默认值
    changeableOption: Required<VirtualCoreChangeableOption> = {
        count: 0,
        startPadding: 0,
        endPadding: 0,
        gap: 0,
        height: 0,
        onChange: () => {},
    };

    constructor(staticOption: VirtualCoreStaticOption) {
        this.staticOption = {
            horizontal: staticOption.horizontal ?? this.staticOption.horizontal,
            getContainer: staticOption.getContainer ?? this.staticOption.getContainer,
        };
    }

    setOption(staticOption: Partial<VirtualCoreChangeableOption>) {
        const triggerChange =
            staticOption.startPadding !== this.changeableOption.startPadding ||
            staticOption.endPadding !== this.changeableOption.endPadding ||
            staticOption.height !== this.changeableOption.height ||
            staticOption.count !== this.changeableOption.count ||
            staticOption.gap !== this.changeableOption.gap;

        this.changeableOption = {
            count: staticOption.count ?? this.changeableOption.count,
            startPadding: staticOption.startPadding ?? this.changeableOption.startPadding,
            endPadding: staticOption.endPadding ?? this.changeableOption.endPadding,
            gap: staticOption.gap ?? this.changeableOption.gap,
            height: staticOption.height ?? this.changeableOption.height,
            onChange: staticOption.onChange ?? this.changeableOption.onChange,
        };

        if (triggerChange) {
            Promise.resolve().then(() => {
                this.getNewIndexOffsets();
                this.maybeChange();
            });
        }
    }

    getHeightByIndex(_index: number) {
        return this.changeableOption.height;
    }

    getNewIndexOffsets() {
        const nextIndexOffsets: IndexOffsetItem[] = [];
        for (let index = 0; index < this.changeableOption.count; index++) {
            if (index === 0) {
                nextIndexOffsets.push({
                    start: this.changeableOption.startPadding,
                    end: this.changeableOption.startPadding + this.getHeightByIndex(index),
                });
            } else {
                const beforeItemOffsetEnd = nextIndexOffsets[index - 1].end;
                nextIndexOffsets.push({
                    start: beforeItemOffsetEnd + this.changeableOption.gap,
                    end: beforeItemOffsetEnd + this.changeableOption.gap + this.getHeightByIndex(index),
                });
            }
        }

        this.state.indexOffsets = nextIndexOffsets;
    }

    maybeChange() {
        if (
            typeof this.state.containerSize !== 'number' ||
            this.state.containerSize === 0 ||
            typeof this.state.containerOffset !== 'number' ||
            !Array.isArray(this.state.indexOffsets) ||
            this.state.indexOffsets.length === 0
        ) {
            this.state.endIndex = undefined;
            this.state.startIndex = undefined;
            this.changeableOption.onChange();
        } else {
            const nextStartIndex = findIndexByBinarySearchStart(
                0,
                this.changeableOption.count - 1,
                this.state.indexOffsets,
                this.state.containerOffset,
            );

            const nextEndIndex = findIndexByBinarySearchEnd(
                nextStartIndex,
                this.changeableOption.count - 1,
                this.state.indexOffsets,
                this.state.containerOffset + this.state.containerSize,
            );

            this.state.endIndex = nextEndIndex;
            this.state.startIndex = nextStartIndex;
            this.changeableOption.onChange();
        }
    }

    getInfo() {
        const endIndex = this.state.endIndex;
        const startIndex = this.state.startIndex;
        const indexOffsets = this.state.indexOffsets;
        let scrollerSize = 0;
        if (Array.isArray(indexOffsets) && indexOffsets.length > 0) {
            scrollerSize = indexOffsets[indexOffsets.length - 1].end + this.changeableOption.endPadding;
        }
        let scrollerPadding = 0;
        if (Array.isArray(indexOffsets) && indexOffsets.length > 0 && typeof startIndex === 'number') {
            scrollerPadding = indexOffsets[startIndex].start;
        }
        return { startIndex, endIndex, scrollerSize, scrollerPadding };
    }

    init() {
        const container = this.staticOption.getContainer();

        if (container) {
            // 滚动事件
            const scrollFun = () => {
                const container = this.staticOption.getContainer();
                const nextOffset = container?.[this.staticOption.horizontal ? 'scrollLeft' : 'scrollTop'] ?? 0;
                if (nextOffset !== this.state.containerOffset) {
                    this.state.containerOffset = nextOffset;
                    this.maybeChange();
                }
            };
            container.addEventListener('scroll', scrollFun, { passive: true });

            // resize事件
            const resizeFun: ResizeObserverCallback = (entry) => {
                const { blockSize, inlineSize } = entry[0].borderBoxSize[0];
                const nextSize = this.staticOption.horizontal ? inlineSize : blockSize;
                if (nextSize !== this.state.containerSize) {
                    this.state.containerSize = nextSize;
                    this.maybeChange();
                }
            };
            const ro = new ResizeObserver(resizeFun);
            ro.observe(container);

            // ResizeObserver默认会执行一次
            // 默认执行一次 滚动事件【确定offset】
            scrollFun();

            // 返回dispose
            return () => {
                container.removeEventListener('scroll', scrollFun);
                ro.disconnect();
            };
        }

        return () => {};
    }
}

export default VirtualCore;
