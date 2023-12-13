import { ResizeWidth } from '../useResizeWidth';
import { HandledColumn } from '../../type';
import { useEffect } from 'react';

type Opt<T> = {
    calcPing: () => void;
    resizeWidth: ResizeWidth;
    handledColumns: HandledColumn<T>[];
};

const useHorizontalSize = <T>(opt: Opt<T>) => {
    const { calcPing, resizeWidth, handledColumns } = opt;
    const { resized } = resizeWidth;
    let size = 0;

    if (resized) {
        size = handledColumns.reduce((a, b) => a + b.width, 0);
    } else {
        size = handledColumns.reduce((a, b) => a + b.originWidth, 0);
    }

    useEffect(() => {
        calcPing();
    }, [size]);

    return size;
};

export default useHorizontalSize;
