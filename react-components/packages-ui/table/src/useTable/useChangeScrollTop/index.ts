import { RefObject, useEffect } from 'react';

import { HandledProps } from '../useHandleProps';

type Opt<T> = {
    paginationDatasource: T[];
    handledProps: HandledProps<T>;
    bodyRef: RefObject<HTMLDivElement | null>;
};

const useChangeScrollTop = <T>(opt: Opt<T>) => {
    const { handledProps, paginationDatasource, bodyRef } = opt;

    // 数据变更时触发滚动回顶部
    useEffect(() => {
        if (handledProps.autoScrollTop === true) {
            bodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [paginationDatasource]);
};

export default useChangeScrollTop;
