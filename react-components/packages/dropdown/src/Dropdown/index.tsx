import { FC, cloneElement, isValidElement, useEffect, useRef, useState } from 'react';
import useReactDomRoot from './useReactDomRoot';
import { DropdownProps } from '../type';
import { useTheme } from '@pkg/theme';
import Overlay from './Overlay';

const Dropdown: FC<DropdownProps> = (props) => {
    const ref = useRef<HTMLElement | null>(null);
    const [visible, setVisible] = useState(false);
    const { themeClassName, applyClassName, theme } = useTheme();
    const { mountReactDomRoot, unmountReactDomRoot, getContainer } = useReactDomRoot(props);
    const { children, items, overlaySameWidth, overlayFollow, placement = 'bottomLeft' } = props;

    const destroyOverlay = () => {
        unmountReactDomRoot();
        setVisible(false);
    };

    // 取消挂载时，销毁overlay
    useEffect(() => {
        return () => {
            requestAnimationFrame(destroyOverlay);
        };
    }, []);

    useEffect(() => {
        if (visible && ref.current) {
            const container = getContainer();
            const reactDomRoot = mountReactDomRoot();
            const targetWidth = ref.current.offsetWidth;

            reactDomRoot.render(
                <Overlay
                    theme={theme}
                    items={items}
                    visible={visible}
                    target={ref.current}
                    container={container}
                    placement={placement}
                    destroy={destroyOverlay}
                    targetWidth={targetWidth}
                    overlayFollow={overlayFollow}
                    themeClassName={themeClassName}
                    applyClassName={applyClassName}
                    overlaySameWidth={overlaySameWidth}
                />,
            );
        }
    }, [visible, theme]);

    const childrenDom = (() => {
        if (isValidElement(children)) {
            const trueRef = (children as any).ref ?? ref;

            const onClick: React.MouseEventHandler<HTMLElement> = (e) => {
                if (typeof children.props.onClick === 'function') children.props.onClick(e);
                if (trueRef.current) {
                    ref.current = trueRef.current;
                    setVisible((v) => !v);
                }
            };

            return cloneElement(children, { onClick, ref: trueRef } as any);
        }
        return children;
    })();

    return childrenDom;
};

export default Dropdown;
