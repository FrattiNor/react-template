/* eslint-disable @typescript-eslint/no-unused-vars */
import useHandleColumns from './useHandleColumns';
import useHiddenFixed from './useHiddenFixed';
import useResizeWidth from './useResizeWidth';
import { AnyObj, TableProps } from '../type';
import { useRef, useState } from 'react';
import useVirtual from './useVirtual';
import useScroll from './useScroll';

const useData = <T extends AnyObj>(props: TableProps<T>) => {
    const defaultFlex = 1;
    const defaultWidth = 150;
    const bodyRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);
    const [headPaddingRight, setHeadPaddingRight] = useState(0);

    // 排除掉columns，避免内部使用未处理的columns
    const { columns: _columns, ...restProps } = props;
    const isEmpty = (props.dataSource || [])?.length === 0;
    const resize = useResizeWidth();
    const virtual = useVirtual(props, { bodyRef, isEmpty, defaultWidth });

    const scroll = useScroll({
        bodyRef,
        headRef,
        setHeadPaddingRight,
        dataSource: props.dataSource,
        autoScrollTop: props.autoScrollTop,
    });

    const { handledColumns, handledLeftColumns, handledRightColumns } = useHandleColumns(props, {
        defaultFlex,
        defaultWidth,
        headPaddingRight,
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
        headPaddingRight,
        props: restProps,
    };
};

export default useData;
