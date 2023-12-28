import { HandledProps } from '../useHandleProps';
import { RefObject, useEffect } from 'react';

type Opt<T> = {
    handledProps: HandledProps<T>;
    bodyRef: RefObject<HTMLDivElement | null>;
};

const useChangeScrollTop = <T>(opt: Opt<T>) => {
    const { handledProps, bodyRef } = opt;

    // 数据变更时触发滚动回顶部
    useEffect(() => {
        if (handledProps.autoScrollTop === true) {
            bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [handledProps.dataSource]);
};

export default useChangeScrollTop;
