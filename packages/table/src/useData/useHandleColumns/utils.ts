import { HandledColumn, Column } from '../../type';
import { Opt } from './index';

const justifyContentMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
};

const getHandledColumns = <T>(opt: Opt<T>) => {
    const { totalColumns, defaultWidth, defaultFlexGrow, vScrollBarWidth, horizontalItemSizeCache, resizeWidth, ping, horizontalRange } = opt;
    const { resizeActiveKey, resizeActiveWidth, resized } = resizeWidth;

    const handledColumns: HandledColumn<T>[] = [];
    const hiddenFixedHandledLeftColumns: HandledColumn<T>[] = [];
    const hiddenFixedHandledRightColumns: HandledColumn<T>[] = [];

    const getSomeProps = (column: Column<T>) => {
        const flexGrow = resized ? 0 : column.flexGrow ?? defaultFlexGrow;
        const originWidth = Math.round(column.width ?? defaultWidth);
        const width = resizeActiveKey === column.key ? (resizeActiveWidth as number) : horizontalItemSizeCache.get(column.key) ?? originWidth;
        const justifyContent = justifyContentMap[column.align ?? 'left'];
        const measureStyle = resized ? { width, flexGrow } : { width: originWidth, flexGrow };
        const style = { ...measureStyle, justifyContent };
        return { width, originWidth, style, measureStyle };
    };

    const getHidden = (index: number) => {
        const hiddenLeft = horizontalRange && index < horizontalRange.startIndex;
        const hiddenRight = horizontalRange && index > horizontalRange.endIndex;
        return { hiddenLeft, hiddenRight };
    };

    let fixedCount = 0;
    let horizontalTotalSize = 0;
    let horizontalPaddingLeft = 0;
    let horizontalPaddingRight = 0;
    // left
    let leftBefore = 0;
    let leftPingDistance = 0;

    for (let i = 0; i <= totalColumns.length - 1; i++) {
        const column = totalColumns[i];

        if (column.fixed === 'left') {
            const { hiddenLeft, hiddenRight } = getHidden(i);
            const { width, originWidth, style, measureStyle } = getSomeProps(column);
            const distance = leftPingDistance - leftBefore;
            const pinged = (ping[column.fixed] ?? 0) > distance;

            const res: HandledColumn<T> = {
                ...column,
                width,
                pinged,
                index: i,
                originWidth,
                measureStyle,
                bodyStyle: { ...style, left: leftBefore, zIndex: fixedCount + 2 },
                headStyle: { ...style, left: leftBefore, zIndex: fixedCount + 2 },
            };

            fixedCount++;
            leftBefore += width;
            leftPingDistance += width;
            handledColumns[i] = res;
            horizontalTotalSize += resized ? width : originWidth;

            if (hiddenRight) {
                horizontalPaddingRight += width;
            }

            if (pinged && hiddenLeft) {
                hiddenFixedHandledLeftColumns.push(res);
            }
        }

        if (column.fixed !== 'left' && column.fixed !== 'right') {
            const { hiddenLeft, hiddenRight } = getHidden(i);
            const { width, originWidth, style, measureStyle } = getSomeProps(column);

            const res: HandledColumn<T> = {
                ...column,
                width,
                index: i,
                originWidth,
                measureStyle,
                bodyStyle: style,
                headStyle: style,
            };

            leftPingDistance += width;
            handledColumns[i] = res;
            horizontalTotalSize += resized ? width : originWidth;

            if (hiddenLeft) {
                horizontalPaddingLeft += width;
            }

            if (hiddenRight) {
                horizontalPaddingRight += width;
            }
        }
    }

    // right
    let rightBefore = 0;
    let rightPingDistance = 0;

    for (let i = totalColumns.length - 1; i >= 0; i--) {
        const column = totalColumns[i];
        if (column.fixed === 'right') {
            const { hiddenRight, hiddenLeft } = getHidden(i);
            const { width, originWidth, style, measureStyle } = getSomeProps(column);
            const distance = rightPingDistance - rightBefore;
            const pinged = (ping[column.fixed] ?? 0) > distance;

            const res: HandledColumn<T> = {
                ...column,
                width,
                pinged,
                index: i,
                originWidth,
                measureStyle,
                bodyStyle: { ...style, right: rightBefore, zIndex: fixedCount + 2 },
                headStyle: { ...style, right: rightBefore + vScrollBarWidth, zIndex: fixedCount + 2 },
            };

            fixedCount++;
            rightBefore += width;
            rightPingDistance += width;
            handledColumns[i] = res;
            horizontalTotalSize += resized ? width : originWidth;

            if (hiddenLeft) {
                horizontalPaddingLeft += width;
            }

            if (pinged && hiddenRight) {
                hiddenFixedHandledRightColumns.push(res);
            }
        }
        if (column.fixed !== 'left' && column.fixed !== 'right') {
            rightPingDistance += handledColumns[i].width;
        }
    }

    return {
        handledColumns,
        horizontalTotalSize,
        horizontalPaddingLeft,
        horizontalPaddingRight,
        hiddenFixedHandledLeftColumns,
        hiddenFixedHandledRightColumns,
    };
};

export default getHandledColumns;
