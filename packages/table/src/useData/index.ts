import useVirtualColumns from './useVirtualColumns';
import useBodyObserver from './useBodyObserver';
import useResizeWidth from './useResizeWidth';
import { AnyObj, TableProps } from '../type';
import { useEffect, useRef } from 'react';
import useProps from './useProps';

const useData = <T extends AnyObj>(props: TableProps<T>) => {
    const defaultWidth = 150;
    const defaultFlexGrow = 1;
    const bodyRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);

    // title resize
    const resize = useResizeWidth();
    // observer body resize and scroll
    const bodyObserver = useBodyObserver({ bodyRef, headRef });
    // add and del some props
    const { columns, rowKey, dataSource, autoScrollTop, newProps } = useProps(props);
    // virtual scroll
    const { virtual, _columns } = useVirtualColumns({
        rowKey,
        columns,
        bodyRef,
        dataSource,
        defaultWidth,
        bodyObserver,
        defaultFlexGrow,
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
        bodyObserver,
        columns: _columns,
    };
};

export default useData;
