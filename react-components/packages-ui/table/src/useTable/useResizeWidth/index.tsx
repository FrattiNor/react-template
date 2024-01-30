/* eslint-disable @typescript-eslint/no-shadow */
import { tableRowSelectionKey } from '../useRowSelection';
import { tableExpandableKey } from '../useExpandable';
import { HandledProps } from '../useHandleProps';
import { VirtualCore } from '../useVirtual';
import { TableColumns } from '../../type';
import { useResize } from '@react/hooks';
import { defaultWidth } from '../index';

type Opt<T> = {
    virtual: VirtualCore;
    handledProps: HandledProps<T>;
    sortedColumns: TableColumns<T>;
};

const useResizeWidth = <T,>(opt: Opt<T>) => {
    const { handledProps, virtual, sortedColumns } = opt;

    const { onMouseDown, mark, active, resized } = useResize({
        beforeResize(e) {
            const parent = (e.currentTarget as HTMLDivElement)?.parentElement as HTMLDivElement;
            const cellKey = parent?.dataset.key;
            return {
                key: cellKey ?? undefined,
                clientWidth: cellKey ? parent.clientWidth : undefined,
            };
        },
        onResizing({ active, mark }) {
            const { moveX } = active;
            const { key, clientWidth } = mark;
            return {
                key,
                width: clientWidth ? Math.min(Math.max(clientWidth + moveX, 50), 1000) : undefined,
            };
        },
        afterResize() {
            if (typeof handledProps.onResizeEnd === 'function') {
                const widths: Record<string, number> = {};
                sortedColumns.forEach(({ key, width }) => {
                    // 排除掉多选和展开的列
                    if (key !== tableRowSelectionKey && key !== tableExpandableKey) {
                        widths[key] = virtual.horizontalItemSizeCache.get(key) ?? width ?? defaultWidth;
                    }
                });
                handledProps.onResizeEnd(widths);
            }
        },
    });

    const resizeReadyKey = mark?.key;
    const resizeActiveKey = active?.key;
    const resizeActiveWidth = active?.width;

    return { resizeReadyKey, resizeActiveKey, resizeActiveWidth, resized, onResizeStart: onMouseDown };
};

export type ResizeWidth = ReturnType<typeof useResizeWidth>;
export default useResizeWidth;
