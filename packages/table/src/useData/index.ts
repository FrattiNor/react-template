/* eslint-disable @typescript-eslint/no-unused-vars */
import useHandleColumns from './useHandleColumns';
import useHiddenFixed from './useHiddenFixed';
import useResizeWidth from './useResizeWidth';
import { AnyObj, TableProps } from '../type';
import { useRef, useState } from 'react';
import useVirtual from './useVirtual';
import useScroll from './useScroll';

const useData = <T extends AnyObj>(props: TableProps<T>) => {
    const defaultFlexGrow = 1;
    const defaultWidth = 150;
    const bodyRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);
    const [verticalScrollBarWidth, setVerticalScrollBarWidth] = useState(0);

    // 排除掉columns，避免内部使用未处理的columns
    const { columns: _columns, ...restProps } = props;
    const isEmpty = (props.dataSource || [])?.length === 0;
    const resize = useResizeWidth();
    const virtual = useVirtual(props, { bodyRef, defaultWidth });

    const scroll = useScroll({
        bodyRef,
        headRef,
        setVerticalScrollBarWidth,
        dataSource: props.dataSource,
        autoScrollTop: props.autoScrollTop,
        horizontalMeasure: virtual.horizontalMeasure,
    });

    const { handledColumns, handledLeftColumns, handledRightColumns } = useHandleColumns(props, {
        defaultWidth,
        defaultFlexGrow,
        verticalScrollBarWidth,
        horizontalItemSizeCache: virtual.horizontalItemSizeCache,
    });

    const hiddenFixed = useHiddenFixed({ handledLeftColumns, handledRightColumns, horizontalRange: virtual.horizontalRange });

    return {
        scroll,
        resize,
        virtual,
        headRef,
        bodyRef,
        isEmpty,
        hiddenFixed,
        handledColumns,
        props: restProps,
        verticalScrollBarWidth,
    };
};

export default useData;
