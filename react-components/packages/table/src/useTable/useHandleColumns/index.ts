import { HandledColumn, TableColumn, TableColumns } from '../../type';
import { defaultFlexGrow, defaultWidth } from '../index';
import { ResizeWidth } from '../useResizeWidth';
import { VirtualCore } from '../useVirtual';
import { CSSProperties } from 'react';

export type Opt<T> = {
    virtual: VirtualCore;
    resizeWidth: ResizeWidth;
    sortedColumns: TableColumns<T>;
};

// 可以利用Table元素获取宽度
const useHandleColumns = <T>(opt: Opt<T>) => {
    const { sortedColumns, resizeWidth, virtual } = opt;
    const { resizeActiveKey, resizeActiveWidth, resized } = resizeWidth;
    const { horizontalRange, horizontalItemSizeCache } = virtual;

    let midLeftPadding = 0;
    let midRightPadding = 0;
    let horizontalTotalSize = 0;
    let originHorizontalTotalSize = 0;
    const handledColumns: HandledColumn<T>[] = [];
    const handledMidColumns: HandledColumn<T>[] = [];
    const handledTotalMidColumns: HandledColumn<T>[] = [];
    const handledFixedLeftColumns: HandledColumn<T>[] = [];
    const handledFixedRightColumns: HandledColumn<T>[] = [];

    const getSomeProps = (column: TableColumn<T>) => {
        const flexGrow = resized ? 0 : column.flexGrow ?? defaultFlexGrow;
        const originWidth = Math.round(column.width ?? defaultWidth);
        const width = resizeActiveKey === column.key ? (resizeActiveWidth as number) : horizontalItemSizeCache.get(column.key) ?? originWidth;
        const measureStyle = resized ? { width, flexGrow } : { width: originWidth, flexGrow };
        return { width, originWidth, measureStyle };
    };

    const getHidden = (index: number) => {
        const hiddenLeft = horizontalRange && index < horizontalRange.startIndex;
        const hiddenRight = horizontalRange && index > horizontalRange.endIndex;
        return { hiddenLeft, hiddenRight };
    };

    for (let i = 0; i <= sortedColumns.length - 1; i++) {
        const column = sortedColumns[i];

        if (column.fixed === 'left') {
            const { width, originWidth, measureStyle } = getSomeProps(column);

            const res: HandledColumn<T> = {
                ...column,
                width,
                index: i,
                measureStyle,
            };

            horizontalTotalSize += width;
            originHorizontalTotalSize += originWidth;
            handledColumns.push(res);
            handledFixedLeftColumns.push(res);
        }

        if (column.fixed !== 'left' && column.fixed !== 'right') {
            const { width, originWidth, measureStyle } = getSomeProps(column);

            const res: HandledColumn<T> = {
                ...column,
                width,
                index: i,
                measureStyle,
            };

            horizontalTotalSize += width;
            originHorizontalTotalSize += originWidth;
            handledColumns.push(res);
            handledTotalMidColumns.push(res);

            // 强制渲染
            if (!!column.edit || column.forceRender === true) {
                handledMidColumns.push(res);
            } else {
                const { hiddenLeft, hiddenRight } = getHidden(i);

                if (hiddenLeft) {
                    midLeftPadding += width;
                }
                if (hiddenRight) {
                    midRightPadding += width;
                }
                if (!hiddenLeft && !hiddenRight) {
                    handledMidColumns.push(res);
                }
            }
        }

        if (column.fixed === 'right') {
            const { width, originWidth, measureStyle } = getSomeProps(column);

            const res: HandledColumn<T> = {
                ...column,
                width,
                index: i,
                measureStyle,
            };

            horizontalTotalSize += width;
            originHorizontalTotalSize += originWidth;
            handledColumns.push(res);
            handledFixedRightColumns.push(res);
        }
    }

    // 避免纵向滚动条出现导致 body的横向区域变窄出现横向滚动条，然后触发重新计算宽度后恢复正常，横向滚动条又消失的闪烁问题
    // resized后宽度固定不存在滚动条闪烁
    // resized前，horizontalTotalSize > originHorizontalTotalSize 说明经过了flexGrow，可以判断没有横向滚动的情况
    const bodyOverflowX: CSSProperties['overflowX'] = resized ? 'auto' : horizontalTotalSize > originHorizontalTotalSize ? 'hidden' : 'auto';

    return {
        bodyOverflowX,
        midLeftPadding,
        midRightPadding,
        horizontalTotalSize,
        handledColumns,
        handledFixedLeftColumns,
        handledFixedRightColumns,
        handledMidColumns,
        handledTotalMidColumns,
    };
};

export default useHandleColumns;