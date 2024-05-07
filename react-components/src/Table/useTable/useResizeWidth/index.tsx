import { useResize } from '@react/hooks';

import { defaultWidth } from '../index';

import type { HandledProps } from '../useHandleProps';
import type { VirtualCore } from '../useVirtual';

type Opt<T> = {
    virtual: VirtualCore;
    handledProps: HandledProps<T>;
};

const useResizeWidth = <T,>(opt: Opt<T>) => {
    const { handledProps, virtual } = opt;

    const { onMouseDown, markData, activeData, resized } = useResize({
        beforeResize({ event }) {
            const parent = (event.currentTarget as HTMLDivElement)?.parentElement as HTMLDivElement;
            const cellKey = parent?.dataset.key;
            return {
                key: cellKey ?? undefined,
                clientWidth: cellKey ? parent.clientWidth : undefined,
            };
        },
        onResizing({ active, markData }) {
            const { moveX } = active;
            const { key, clientWidth } = markData;
            return {
                key,
                width: clientWidth ? Math.min(Math.max(clientWidth + moveX, 50), 1000) : undefined,
            };
        },
        afterResize() {
            if (typeof handledProps.onResizeEnd === 'function') {
                const widths: Record<string, number> = {};
                handledProps.columns.forEach(({ key, width }) => {
                    widths[key] = virtual.horizontalItemSizeCache.get(key) ?? width ?? defaultWidth;
                });
                handledProps.onResizeEnd(widths);
            }
        },
    });

    const resizeReadyKey = markData?.key;
    const resizeActiveKey = activeData?.key;
    const resizeActiveWidth = activeData?.width;

    return { resizeReadyKey, resizeActiveKey, resizeActiveWidth, resized, onResizeStart: onMouseDown };
};

export type ResizeWidth = ReturnType<typeof useResizeWidth>;
export default useResizeWidth;
