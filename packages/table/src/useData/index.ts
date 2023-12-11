import useBodyResizeObserver from './useBodyResizeObserver';
import useBodyScrollObserver from './useBodyScrollObserver';
import useHandleColumns from './useHandleColumns';
import useResizeWidth from './useResizeWidth';
import { AnyObj, TableProps } from '../type';
import { useEffect, useRef } from 'react';
import useVirtual from './useVirtual';
import useProps from './useProps';

const useData = <T extends AnyObj>(props: TableProps<T>) => {
    const defaultWidth = 150;
    const defaultFlexGrow = 1;
    const bodyRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);

    // title resize
    const resize = useResizeWidth();
    // observer body resize
    const bodyResizeObserver = useBodyResizeObserver({ bodyRef });
    // observer body scroll
    const bodyScrollObserver = useBodyScrollObserver({ bodyRef, headRef });
    // add and del some props
    const { columns, dataSource, autoScrollTop, newProps } = useProps(props);
    // virtual scroll
    const virtual = useVirtual(props, { bodyRef, defaultWidth, bodyResizeObserver, bodyScrollObserver });
    // handle columns
    const _columns = useHandleColumns({
        columns,
        defaultWidth,
        defaultFlexGrow,
        horizontalRange: virtual.horizontalRange,
        vScrollBarWidth: bodyScrollObserver.vScrollBarWidth,
        horizontalItemSizeCache: virtual.horizontalItemSizeCache,
    });

    // 数据变更时触发滚动回顶部
    useEffect(() => {
        if (autoScrollTop === undefined || autoScrollTop === true) {
            bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [dataSource]);

    return {
        scroll,
        resize,
        virtual,
        headRef,
        bodyRef,
        newProps,
        columns: _columns,
        bodyScrollObserver,
    };
};

export default useData;
