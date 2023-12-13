import { HandledColumn, Column } from '../../type';
import { Opt } from './index';

const justifyContentMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
};

type GetHandledColumnsRes<T> = {
    handledColumns: HandledColumn<T>[];
    handledLeftColumns: HandledColumn<T>[];
    handledRightColumns: HandledColumn<T>[];
};

const getHandledColumns = <T>(opt: Opt<T>): GetHandledColumnsRes<T> => {
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
    };
};

export default getHandledColumns;
