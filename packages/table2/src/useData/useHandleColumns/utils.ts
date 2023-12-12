import { HandledColumn, Column } from '../../type';
import { Opt } from './index';

type GetHandledColumnsRes<T> = {
    handledColumns: HandledColumn<T>[];
    handledLeftColumns: HandledColumn<T>[];
    handledRightColumns: HandledColumn<T>[];
};

const getHandledColumns = <T>(opt: Opt<T>): GetHandledColumnsRes<T> => {
    const { sortedColumns, defaultWidth, defaultFlexGrow, vScrollBarWidth, horizontalItemSizeCache } = opt;
    const { leftColumns, midColumns, rightColumns } = sortedColumns;

    const showFixed = midColumns.length > 0;

    const getSomeProps = (column: Column<T>) => {
        const flexGrow = column.flexGrow ?? defaultFlexGrow;
        const originWidth = column.width ?? defaultWidth;
        const width = horizontalItemSizeCache.get(column.key) ?? originWidth;
        return { flexGrow, originWidth, width, fixed: showFixed ? column.fixed : undefined };
    };

    // left
    let leftBefore = 0;
    const handledLeftColumns = leftColumns.map((column, _index) => {
        const index = _index;
        const { flexGrow, fixed, originWidth, width } = getSomeProps(column);

        const res = {
            ...column,
            fixed,
            index,
            flexGrow,
            originWidth,
            width,
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
        const { flexGrow, originWidth, width } = getSomeProps(column);

        const res = {
            ...column,
            index,
            flexGrow,
            originWidth,
            width,
        };

        return res;
    });

    // right
    let rightBefore = 0;
    const handledRightColumns: HandledColumn<T>[] = [];
    const rightColumnsCopy = [...rightColumns].reverse();
    rightColumnsCopy.forEach((column, _index) => {
        const index = handledLeftColumns.length + handledMidColumns.length + rightColumnsCopy.length - _index - 1;
        const { flexGrow, fixed, originWidth, width } = getSomeProps(column);

        const res = {
            ...column,
            fixed,
            index,
            flexGrow,
            originWidth,
            width,
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
