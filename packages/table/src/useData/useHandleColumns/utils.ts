import { HandledColumn, Column } from '../../type';
import { Opt } from './index';

const justifyContentMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
};

const getHandledColumns = <T>(opt: Opt<T>) => {
    const { totalColumns, defaultWidth, defaultFlexGrow, vScrollBarWidth, horizontalItemSizeCache, resizeWidth, ping } = opt;
    const { resizeActiveKey, resizeActiveWidth, resized } = resizeWidth;

    const handledColumns: HandledColumn<T>[] = [];
    const handledLeftColumns: HandledColumn<T>[] = [];
    const handledRightColumns: HandledColumn<T>[] = [];

    const getSomeProps = (column: Column<T>) => {
        const flexGrow = resized ? 0 : column.flexGrow ?? defaultFlexGrow;
        const originWidth = Math.round(column.width ?? defaultWidth);
        const width = resizeActiveKey === column.key ? (resizeActiveWidth as number) : horizontalItemSizeCache.get(column.key) ?? originWidth;
        const justifyContent = justifyContentMap[column.align ?? 'left'];
        const measureStyle = resized ? { width, flexGrow } : { width: originWidth, flexGrow };
        const style = { ...measureStyle, justifyContent };
        return { width, originWidth, style, measureStyle };
    };

    let fixedCount = 0;
    // left
    let leftBefore = 0;
    let leftPingDistance = 0;

    for (let i = 0; i <= totalColumns.length - 1; i++) {
        const column = totalColumns[i];

        if (column.fixed === 'left') {
            const { width, originWidth, style, measureStyle } = getSomeProps(column);
            const distance = leftPingDistance - leftBefore;

            const res: HandledColumn<T> = {
                ...column,
                width,
                index: i,
                originWidth,
                measureStyle,
                pinged: (ping[column.fixed] ?? 0) > distance,
                bodyStyle: { ...style, left: leftBefore, zIndex: fixedCount + 1 },
                headStyle: { ...style, left: leftBefore, zIndex: fixedCount + 1 },
            };

            fixedCount++;
            leftBefore += res.width;
            leftPingDistance += res.width;
            handledColumns[i] = res;
            handledLeftColumns.push(res);
        }

        if (column.fixed !== 'left' && column.fixed !== 'right') {
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

            leftPingDistance += res.width;
            handledColumns[i] = res;
        }
    }

    // right
    let rightBefore = 0;
    let rightPingDistance = 0;

    for (let i = totalColumns.length - 1; i >= 0; i--) {
        const column = totalColumns[i];
        if (column.fixed === 'right') {
            const { width, originWidth, style, measureStyle } = getSomeProps(column);
            const distance = rightPingDistance - rightBefore;

            const res: HandledColumn<T> = {
                ...column,
                width,
                index: i,
                originWidth,
                measureStyle,
                pinged: (ping[column.fixed] ?? 0) > distance,
                bodyStyle: { ...style, right: rightBefore, zIndex: fixedCount + 1 },
                headStyle: { ...style, right: rightBefore + vScrollBarWidth, zIndex: fixedCount + 1 },
            };

            fixedCount++;
            rightBefore += res.width;
            rightPingDistance += res.width;
            handledColumns[i] = res;
            handledRightColumns.push(res);
        }
        if (column.fixed !== 'left' && column.fixed !== 'right') {
            rightPingDistance += handledColumns[i].width;
        }
    }

    return {
        handledColumns,
        handledLeftColumns,
        handledRightColumns,
    };
};

export default getHandledColumns;
