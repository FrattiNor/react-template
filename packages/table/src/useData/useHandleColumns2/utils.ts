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
    const midLeftShowHandledColumns: HandledColumn<T>[] = [];
    const midRightShowHandledColumns: HandledColumn<T>[] = [];
    const stickyLeftHandledColumns: HandledColumn<T>[] = [];
    const stickyRightHandledColumns: HandledColumn<T>[] = [];

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

    let stickyLeft = 0;
    let paddingLeft = 0;
    let horizontalMidSize = 0;
    let paddingRight = 0;
    let stickyRight = 0;
    let horizontalSize = 0;
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
                bodyStyle: { ...style, left: leftBefore },
                headStyle: { ...style, left: leftBefore },
            };

            leftBefore += width;
            leftPingDistance += width;
            handledColumns[i] = res;
            horizontalSize += resized ? width : originWidth;

            if (pinged) {
                stickyLeft += width;
                stickyLeftHandledColumns.push(res);
            } else {
                horizontalMidSize += width;
                if (hiddenLeft) paddingLeft += width;
                if (hiddenRight) paddingRight += width;
                if (!hiddenLeft && !hiddenRight) midLeftShowHandledColumns.push(res);
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

            leftPingDistance += res.width;
            handledColumns[i] = res;
            horizontalSize += resized ? width : originWidth;

            horizontalMidSize += width;
            if (hiddenLeft) paddingLeft += width;
            if (hiddenRight) paddingRight += width;
            if (!hiddenLeft && !hiddenRight) midLeftShowHandledColumns.push(res);
        }
    }

    // right
    let rightBefore = 0;
    let rightPingDistance = 0;

    for (let i = totalColumns.length - 1; i >= 0; i--) {
        const column = totalColumns[i];
        if (column.fixed === 'right') {
            const { hiddenLeft, hiddenRight } = getHidden(i);
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
                bodyStyle: { ...style, right: rightBefore },
                headStyle: { ...style, right: rightBefore + vScrollBarWidth },
            };

            rightBefore += width;
            rightPingDistance += width;
            handledColumns[i] = res;
            horizontalSize += resized ? width : originWidth;

            if (pinged) {
                stickyRight += width;
                stickyRightHandledColumns.unshift(res);
            } else {
                horizontalMidSize += width;
                if (hiddenLeft) paddingLeft += width;
                if (hiddenRight) paddingRight += width;
                if (!hiddenLeft && !hiddenRight) midRightShowHandledColumns.unshift(res);
            }
        }
        if (column.fixed !== 'left' && column.fixed !== 'right') {
            rightPingDistance += handledColumns[i].width;
        }
    }

    // console.log('horizontalSize', horizontalSize);
    // console.log('stickyLeft', stickyLeft);
    // console.log('paddingLeft', paddingLeft);
    // console.log('horizontalMidSize', horizontalMidSize);
    // console.log('paddingRight', paddingRight);
    // console.log('stickyRight', stickyRight);
    console.log('left', stickyLeftHandledColumns);
    console.log('left', midLeftShowHandledColumns);
    console.log('right', midRightShowHandledColumns);
    console.log('right', stickyRightHandledColumns);

    return {
        handledColumns,
        horizontalSize,
        stickyLeft,
        paddingLeft,
        horizontalMidSize,
        paddingRight,
        stickyRight,
    };
};

export default getHandledColumns;
