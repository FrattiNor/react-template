import { HandledColumn, Column } from '../../type';
import { Opt } from './index';

const justifyContentMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
};

const getHandledColumns = <T>(opt: Opt<T>) => {
    const { totalColumns, defaultWidth, defaultFlexGrow, vScrollBarWidth, horizontalItemSizeCache, resized } = opt;

    const handledColumns: HandledColumn<T>[] = [];
    const handledLeftColumns: HandledColumn<T>[] = [];
    const handledRightColumns: HandledColumn<T>[] = [];

    const getSomeProps = (column: Column<T>) => {
        const flexGrow = resized ? 0 : column.flexGrow ?? defaultFlexGrow;
        const originWidth = column.width ?? defaultWidth;
        const width = horizontalItemSizeCache.get(column.key) ?? originWidth;
        const justifyContent = justifyContentMap[column.align ?? 'left'];
        const measureStyle = resized ? { width, flexGrow } : { width: originWidth, flexGrow };
        const style = { ...measureStyle, justifyContent };
        return { width, style, measureStyle };
    };

    // left
    let leftBefore = 0;
    let leftStartPing = 0;
    let leftPingDistance: number | null = null;
    let leftEndIndex: number | null = null;
    for (let i = 0; i <= totalColumns.length - 1; i++) {
        const column = totalColumns[i];

        if (column.fixed === 'left') {
            const { width, style, measureStyle } = getSomeProps(column);

            const res: HandledColumn<T> = {
                ...column,
                width,
                index: i,
                measureStyle,
                bodyStyle: { ...style, left: leftBefore },
                headStyle: { ...style, left: leftBefore },
            };

            leftEndIndex = i;
            leftBefore += res.width;
            handledColumns[i] = res;
            handledLeftColumns.push(res);
            if (leftPingDistance === null) leftPingDistance = leftStartPing;
        }

        if (column.fixed !== 'left' && column.fixed !== 'right') {
            const { width, style, measureStyle } = getSomeProps(column);

            const res: HandledColumn<T> = {
                ...column,
                width,
                index: i,
                measureStyle,
                bodyStyle: style,
                headStyle: style,
            };

            leftStartPing += res.width;
            handledColumns[i] = res;
        }
    }

    if (leftEndIndex) {
        handledColumns[leftEndIndex] = {
            ...handledColumns[leftEndIndex],
            showShadow: true,
        };
    }

    // right
    let rightBefore = 0;
    let rightStartPing = 0;
    let rightPingDistance: number | null = null;
    let rightEndIndex: number | null = null;
    for (let i = totalColumns.length - 1; i >= 0; i--) {
        const column = totalColumns[i];
        if (column.fixed === 'right') {
            const { width, style, measureStyle } = getSomeProps(column);
            const res: HandledColumn<T> = {
                ...column,
                width,
                index: i,
                measureStyle,
                bodyStyle: { ...style, right: rightBefore },
                headStyle: { ...style, right: rightBefore + vScrollBarWidth },
            };

            rightEndIndex = i;
            rightBefore += res.width;
            handledColumns[i] = res;
            handledRightColumns.push(res);
            if (rightPingDistance === null) rightPingDistance = rightStartPing;
        }
        if (column.fixed !== 'left' && column.fixed !== 'right') {
            rightStartPing += handledColumns[i].width;
        }
    }

    if (rightEndIndex) {
        handledColumns[rightEndIndex] = {
            ...handledColumns[rightEndIndex],
            showShadow: true,
        };
    }

    return {
        handledColumns,
        handledLeftColumns,
        handledRightColumns,
        leftPingDistance: leftPingDistance ?? 0,
        rightPingDistance: leftPingDistance ?? 0,
    };
};

export default getHandledColumns;
