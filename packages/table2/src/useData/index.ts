import useBodyResizeObserver from './useBodyResizeObserver';
import useBodyScrollObserver from './useBodyScrollObserver';
import useCalcScrollBarWidth from './useCalcScrollBarWidth';
import useHandleColumns from './useHandleColumns';
import useResizeWidth from './useResizeWidth';
import useHandleProps from './useHandleProps';
import { AnyObj, TableProps } from '../type';
import useCalcPing from './useCalcPing';
import useVirtual from './useVirtual';
import { useRef } from 'react';

const useData = <T extends AnyObj>(props: TableProps<T>) => {
    const defaultWidth = 150;
    const defaultFlexGrow = 1;
    const defaultLineHeight = 32;
    const defaultAutoScrollTop = true;
    const bodyRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);

    // props and auto scrollTop
    const handledProps = useHandleProps(props, {
        bodyRef,
        defaultLineHeight,
        defaultAutoScrollTop,
    });

    // // 增加展开
    // const { totalDataSource, showDataSource, expandableColumns } = useExpandable({ rowKey, expandable, dataSource });

    // // 增加多选
    // const { selectedRowKeysObj, rowSelectionColumns } = useRowSelection({ rowKey, rowSelection, dataSource: totalDataSource });

    // // 整合后的 columns
    // const totalColumns = useSortColumns([...rowSelectionColumns, ...expandableColumns, ...columns]);

    // // title resize
    const resizeWidth = useResizeWidth();

    // ping
    const { calcPing, ping } = useCalcPing({ bodyRef });

    // v scrollbar
    const { calcScrollBarWidth, vScrollBarWidth } = useCalcScrollBarWidth({ bodyRef });

    //  body resize observer
    const bodyResizeObserver = useBodyResizeObserver({
        bodyRef,
        calcPing,
        calcScrollBarWidth,
    });

    // body scroll observer
    const bodyScrollObserver = useBodyScrollObserver({
        bodyRef,
        headRef,
        calcPing,
    });

    // virtual table core
    const virtual = useVirtual({
        bodyRef,
        handledProps,
        defaultWidth,
        bodyResizeObserver,
        bodyScrollObserver,
    });

    // handle columns
    const handledColumns = useHandleColumns({
        virtual,
        resizeWidth,
        defaultWidth,
        handledProps,
        defaultFlexGrow,
    });

    const innerProps = {
        ...virtual,
        ...resizeWidth,
        ...handledColumns,
        ...handledProps.innerProps,
        ping,
        vScrollBarWidth,
    };

    const outerProps = handledProps.outerProps;

    return {
        bodyRef,
        headRef,
        outerProps,
        innerProps,
    };
};

export default useData;
