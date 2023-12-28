import useBodyResizeObserver from './useBodyResizeObserver';
import useBodyScrollObserver from './useBodyScrollObserver';
import useCalcScrollBarWidth from './useCalcScrollBarWidth';
import useChangeScrollTop from './useChangeScrollTop';
import useHandleColumns from './useHandleColumns';
import useRowSelection from './useRowSelection';
import useSortColumns from './useSortColumns';
import useResizeWidth from './useResizeWidth';
import useHandleProps from './useHandleProps';
import { AnyObj, TableProps } from '../type';
import useExpandable from './useExpandable';
import useEditStore from './useEditStore';
import useCalcPing from './useCalcPing';
import useVirtual from './useVirtual';
import { useRef } from 'react';

const useData = <T extends AnyObj>(props: TableProps<T>) => {
    const defaultWidth = 150;
    const defaultFlexGrow = 1;
    const defaultLineHeight = 36;
    const defaultAutoScrollTop = true;
    const bodyRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);

    // props and auto scrollTop
    const { handledProps, isEmpty } = useHandleProps(props, {
        defaultLineHeight,
        defaultAutoScrollTop,
    });

    // 数据源变更回滚顶部
    useChangeScrollTop({
        bodyRef,
        handledProps,
    });

    // 编辑格缓存
    const editStore = useEditStore({ handledProps });

    // 增加展开
    const { totalDataSource, showDataSource, dataSourceLevelMap, expandableColumns } = useExpandable({ handledProps });

    // 增加多选
    const { selectedRowKeysObj, rowSelectionColumns } = useRowSelection({ handledProps, totalDataSource });

    //  整合后排序的 columns
    const sortedColumns = useSortColumns({ columns: [...rowSelectionColumns, ...expandableColumns, ...handledProps.columns] });

    //  title resize
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
        sortedColumns,
        showDataSource,
        bodyResizeObserver,
        bodyScrollObserver,
    });

    // handle columns
    const handledColumns = useHandleColumns({
        virtual,
        resizeWidth,
        defaultWidth,
        sortedColumns,
        defaultFlexGrow,
    });

    const innerProps = {
        ...virtual,
        ...editStore,
        ...resizeWidth,
        ...handledColumns,

        ping,
        isEmpty,
        showDataSource,
        vScrollBarWidth,
        selectedRowKeysObj,
        dataSourceLevelMap,
    };

    const outerProps = handledProps;

    return {
        bodyRef,
        headRef,
        outerProps,
        innerProps,
    };
};

export default useData;
