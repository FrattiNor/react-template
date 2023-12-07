import { Column, HandledColumn, TableProps } from '../../type';

type Opt = {
    defaultFlex: number;
    defaultWidth: number;
    headPaddingRight: number;
    horizontalItemSizeCache: Map<number, number>;
};

// 可以利用Table元素获取宽度
const useHandleColumns = <T extends Record<string, any>>(props: TableProps<T>, opt: Opt) => {
    const { defaultWidth, defaultFlex, headPaddingRight, horizontalItemSizeCache } = opt;

    const getFixedColumns = (): HandledColumn<T>[] => {
        const midColumns: Column<T>[] = [];
        const leftColumns: Column<T>[] = [];
        const rightColumns: Column<T>[] = [];

        props.columns.forEach((column) => {
            if (column.fixed === 'left') {
                leftColumns.push(column);
            } else if (column.fixed === 'right') {
                rightColumns.push(column);
            } else {
                midColumns.push(column);
            }
        });

        const getSomeProps = (column: Column<T>, index: number) => {
            const showFixed = midColumns.length > 0;
            const flex = column.flex ?? defaultFlex;
            const width = horizontalItemSizeCache.get(index) ?? column.width ?? defaultWidth;
            return { flex, width, fixed: showFixed ? column.fixed : undefined };
        };

        // left
        let leftBefore = 0;
        const newLeftColumns = leftColumns.map((column, _index) => {
            const index = _index;
            const { flex, width, fixed } = getSomeProps(column, index);

            const res = {
                ...column,
                flex,
                fixed,
                index,
                width,
                fixedStyle: fixed ? { left: leftBefore } : {},
                headFixedStyle: fixed ? { left: leftBefore } : {},
                showShadow: fixed ? _index === leftColumns.length - 1 : false,
            };

            leftBefore += res.width;
            return res;
        });

        const newMidColumns = midColumns.map((column, _index) => {
            const index = _index + newLeftColumns.length;
            const { flex, width } = getSomeProps(column, index);

            const res = {
                ...column,
                flex,
                index,
                width,
            };

            return res;
        });

        // right
        let rightBefore = 0;
        const newRightColumns: HandledColumn<T>[] = [];
        const rightColumnsCopy = [...rightColumns].reverse();
        rightColumnsCopy.forEach((column, _index) => {
            const index = newLeftColumns.length + newMidColumns.length + rightColumnsCopy.length - _index - 1;
            const { flex, width, fixed } = getSomeProps(column, index);

            const res = {
                ...column,
                flex,
                fixed,
                index,
                width,
                fixedStyle: fixed ? { right: rightBefore } : {},
                showShadow: fixed ? _index === rightColumnsCopy.length - 1 : false,
                headFixedStyle: fixed ? { right: rightBefore + headPaddingRight } : {},
            };

            rightBefore += res.width;
            newRightColumns.unshift(res);
        });

        return [...newLeftColumns, ...newMidColumns, ...newRightColumns];
    };

    return { ...props, columns: getFixedColumns() };
};

export default useHandleColumns;
