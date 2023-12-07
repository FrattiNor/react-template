import { AnyObj, TableProps } from '../type';
import { useRef, useState } from 'react';
import useVirtual from './useVirtual';
import useScroll from './useScroll';
import useWidth from './useWidth';

const useData = <T extends AnyObj>(props: TableProps<T>) => {
    const defaultFlex = 1;
    const defaultWidth = 150;
    const bodyRef = useRef<HTMLDivElement>(null);
    const headRef = useRef<HTMLDivElement>(null);
    const [headPaddingRight, setHeadPaddingRight] = useState(0);

    const isEmpty = (props.dataSource || [])?.length === 0;
    const virtual = useVirtual(props, { bodyRef, defaultWidth });
    const { onBodyScroll, ping } = useScroll({ bodyRef, headRef, setHeadPaddingRight });
    const { newProps, renderResizeTitle } = useWidth(props, { bodyRef, defaultWidth, defaultFlex, headPaddingRight });

    return {
        ping,
        virtual,
        headRef,
        bodyRef,
        isEmpty,
        defaultFlex,
        defaultWidth,
        onBodyScroll,
        headPaddingRight,
        setHeadPaddingRight,
        props: newProps,
        renderResizeTitle,
    };
};

export default useData;
