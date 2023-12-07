import { useEffect, useRef, useState } from 'react';
import useHandleColumns from './useHandleColumns';
import useResizeWidth from './useResizeWidth';
import { AnyObj, TableProps } from '../type';
import useVirtual from './useVirtual';
import useScroll from './useScroll';

const useData = <T extends AnyObj>(props: TableProps<T>) => {
    const defaultFlex = 1;
    const defaultWidth = 150;
    const bodyRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);
    const [headPaddingRight, setHeadPaddingRight] = useState(0);

    const isEmpty = (props.dataSource || [])?.length === 0;
    const resize = useResizeWidth();
    const virtual = useVirtual(props, { bodyRef, defaultWidth });
    const { onBodyScroll, ping } = useScroll({ bodyRef, headRef, setHeadPaddingRight });
    const newProps = useHandleColumns(props, {
        defaultFlex,
        defaultWidth,
        headPaddingRight,
        horizontalItemSizeCache: virtual.horizontalItemSizeCache,
    });

    // 非空时重置横向监测缓存
    // 原因：非空时可能产生纵向滚动条，empty情况监测不含滚动条
    useEffect(() => {
        if (!isEmpty) {
            virtual.horizontalMeasure();
        }
    }, [isEmpty]);

    // 数据变更时触发滚动回顶部
    useEffect(() => {
        if (props.autoScrollTop === undefined || props.autoScrollTop === true) {
            bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [props.dataSource]);

    return {
        ping,
        resize,
        virtual,
        headRef,
        bodyRef,
        isEmpty,
        defaultFlex,
        defaultWidth,
        onBodyScroll,
        props: newProps,
        headPaddingRight,
        setHeadPaddingRight,
    };
};

export default useData;
