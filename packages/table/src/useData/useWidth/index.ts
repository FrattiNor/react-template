import { FixedColumn, TableProps } from '../../type';
import { RefObject, useEffect } from 'react';
import useResize from './useResize';

type Opt = {
    defaultFlex: number;
    defaultWidth: number;
    headPaddingRight: number;
    bodyRef: RefObject<HTMLDivElement | null>;
};

// 可以利用Table元素获取宽度
const useWidth = <T extends Record<string, any>>(props: TableProps<T>, opt: Opt) => {
    const { recordWidths, setRecordWidths, renderResizeTitle } = useResize();
    const { bodyRef, defaultWidth, defaultFlex, headPaddingRight } = opt;

    useEffect(() => {
        if (bodyRef.current) {
            const clientWidth = Math.floor(bodyRef.current.clientWidth);
            const totalColumnsWidth = props.columns.reduce((a, b) => a + (recordWidths[b.key] ?? b.width ?? defaultWidth), 0);
            const nextRecordWidths: Record<string, number> = {};
            if (clientWidth > totalColumnsWidth) {
                const flexTotalWidth = props.columns.reduce((a, b) => {
                    const flex = b.flex ?? defaultFlex;
                    const addWidth = typeof flex === 'number' && flex > 0 ? flex * (b.width ?? defaultWidth) : 0;
                    return a + addWidth;
                }, 0);
                props.columns.forEach((column) => {
                    nextRecordWidths[column.key] =
                        recordWidths[column.key] ??
                        (column.width ?? defaultWidth) +
                            ((column.flex ?? defaultFlex) * (clientWidth - totalColumnsWidth) * (column.width ?? defaultWidth)) / flexTotalWidth;
                });
            } else {
                props.columns.forEach((column) => {
                    nextRecordWidths[column.key] = recordWidths[column.key] ?? column.width ?? defaultWidth;
                });
            }
            setRecordWidths(nextRecordWidths);
        }
    }, []);

    const getFixedColumns = (): FixedColumn<T> => {
        const midColumns: FixedColumn<T> = [];
        const leftColumns: FixedColumn<T> = [];
        const rightColumns: FixedColumn<T> = [];

        props.columns.forEach((column) => {
            const nextColumn = {
                ...column,
                width: recordWidths[column.key] ?? column.width ?? defaultWidth,
            };

            if (column.fixed === 'left') {
                leftColumns.push(nextColumn);
            } else if (column.fixed === 'right') {
                rightColumns.push(nextColumn);
            } else {
                midColumns.push(nextColumn);
            }
        });

        // left
        let leftBefore = 0;
        const newLeftColumns = leftColumns.map((column, i) => {
            const res = {
                ...column,
                showShadow: i === leftColumns.length - 1,
                fixedStyle: { left: leftBefore },
                headFixedStyle: { left: leftBefore },
            };
            leftBefore += res.width;
            return res;
        });

        // right
        let rightBefore = 0;
        const newRightColumns: FixedColumn<T> = [];
        const rightColumnsCopy = [...rightColumns].reverse();
        rightColumnsCopy.forEach((column, i) => {
            const res = {
                ...column,
                showShadow: i === rightColumnsCopy.length - 1,
                fixedStyle: { right: rightBefore },
                headFixedStyle: { right: rightBefore + headPaddingRight },
            };
            rightBefore += res.width;
            newRightColumns.unshift(res);
        });

        return [...newLeftColumns, ...midColumns, ...newRightColumns];
    };

    return { newProps: { ...props, columns: getFixedColumns() }, renderResizeTitle };
};

export default useWidth;
