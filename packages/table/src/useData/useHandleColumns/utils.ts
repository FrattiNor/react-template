import { HandledColumn, Column } from '../../type';
import { Opt } from './index';

type GetHandledColumnsRes<T> = {
    handledColumns: HandledColumn<T>[];
    handledLeftColumns: HandledColumn<T>[];
    handledRightColumns: HandledColumn<T>[];
};

const getHandledColumns = <T extends Record<string, any>>(opt: Opt<T>): GetHandledColumnsRes<T> => {
    const { columns, defaultWidth, defaultFlexGrow, vScrollBarWidth, horizontalItemSizeCache } = opt;

    const midColumns: Column<T>[] = [];
    const leftColumns: Column<T>[] = [];
    const rightColumns: Column<T>[] = [];

    columns.forEach((column) => {
        if (column.fixed === 'left') {
            leftColumns.push(column);
        } else if (column.fixed === 'right') {
            rightColumns.push(column);
        } else {
            midColumns.push(column);
        }
    });

    const showFixed = midColumns.length > 0;

    const getSomeProps = (column: Column<T>) => {
        const flexGrow = column.flexGrow ?? defaultFlexGrow;
        const width = horizontalItemSizeCache.get(column.key) ?? column.width ?? defaultWidth;
        return { flexGrow, width, fixed: showFixed ? column.fixed : undefined };
    };

    // left
    let leftBefore = 0;
    const handledLeftColumns = leftColumns.map((column, _index) => {
        const index = _index;
        const { flexGrow, width, fixed } = getSomeProps(column);

        const res = {
            ...column,
            fixed,
            index,
            width,
            flexGrow,
            fixedStyle: fixed ? { left: leftBefore } : {},
            headFixedStyle: fixed ? { left: leftBefore } : {},
            showShadow: fixed ? _index === leftColumns.length - 1 : false,
        };

        leftBefore += res.width;
        return res;
    });

    // mid
    const handledMidColumns = midColumns.map((column, _index) => {
        const index = _index + handledLeftColumns.length;
        const { flexGrow, width } = getSomeProps(column);

        const res = {
            ...column,
            index,
            width,
            flexGrow,
        };

        return res;
    });

    // right
    let rightBefore = 0;
    const handledRightColumns: HandledColumn<T>[] = [];
    const rightColumnsCopy = [...rightColumns].reverse();
    rightColumnsCopy.forEach((column, _index) => {
        const index = handledLeftColumns.length + handledMidColumns.length + rightColumnsCopy.length - _index - 1;
        const { flexGrow, width, fixed } = getSomeProps(column);

        const res = {
            ...column,
            fixed,
            index,
            width,
            flexGrow,
            fixedStyle: fixed ? { right: rightBefore } : {},
            showShadow: fixed ? _index === rightColumnsCopy.length - 1 : false,
            headFixedStyle: fixed ? { right: rightBefore + vScrollBarWidth } : {},
        };

        rightBefore += res.width;
        handledRightColumns.unshift(res);
    });

    return {
        handledLeftColumns: showFixed ? [...handledLeftColumns] : [],
        handledRightColumns: showFixed ? [...handledRightColumns] : [],
        handledColumns: [...handledLeftColumns, ...handledMidColumns, ...handledRightColumns],
    };
};

export default getHandledColumns;
