import { HandledColumn, Column } from '../../type';
import { Opt } from './index';

const getHandledColumns = <T>(opt: Opt<T>) => {
    const { sortedColumns, defaultWidth, defaultFlexGrow, resizeWidth, virtual } = opt;
    const { resizeActiveKey, resizeActiveWidth, resized } = resizeWidth;
    const { horizontalRange, horizontalItemSizeCache } = virtual;

    let midLeftPadding = 0;
    let midRightPadding = 0;
    let horizontalTotalSize = 0;
    const handledColumns: HandledColumn<T>[] = [];
    const handledMidColumns: HandledColumn<T>[] = [];
    const handledFixedLeftColumns: HandledColumn<T>[] = [];
    const handledFixedRightColumns: HandledColumn<T>[] = [];

    const getSomeProps = (column: Column<T>) => {
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
                originWidth,
                measureStyle,
            };

            horizontalTotalSize += width;
            handledColumns.push(res);
            handledFixedLeftColumns.push(res);
        }

        if (column.fixed !== 'left' && column.fixed !== 'right') {
            const { hiddenLeft, hiddenRight } = getHidden(i);
            const { width, originWidth, measureStyle } = getSomeProps(column);

            const res: HandledColumn<T> = {
                ...column,
                width,
                index: i,
                originWidth,
                measureStyle,
            };

            horizontalTotalSize += width;
            handledColumns.push(res);

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

        if (column.fixed === 'right') {
            const { width, originWidth, measureStyle } = getSomeProps(column);

            const res: HandledColumn<T> = {
                ...column,
                width,
                index: i,
                originWidth,
                measureStyle,
            };

            horizontalTotalSize += width;
            handledColumns.push(res);
            handledFixedRightColumns.push(res);
        }
    }

    return {
        midLeftPadding,
        midRightPadding,
        horizontalTotalSize,
        handledColumns,
        handledFixedLeftColumns,
        handledFixedRightColumns,
        handledMidColumns,
    };
};

export default getHandledColumns;
