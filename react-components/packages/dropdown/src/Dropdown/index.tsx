import { FC, Fragment, cloneElement, isValidElement, useRef } from 'react';
import { useContainer, useDisplayVisible } from '@react/hooks';
import { createPortal } from 'react-dom';
import { DropdownProps } from '../type';
import Overlay from './Overlay';

const Dropdown: FC<DropdownProps> = (props) => {
    const ref = useRef<HTMLElement | null>(null);

    const { children, items, overlaySameWidth, overlayFollow, placement = 'bottomLeft' } = props;
    const { getContainer, clearContainer } = useContainer({ getContainer: props.getContainer });
    const { display, visible, setVisible, setDisplay } = useDisplayVisible({
        visible: props.visible,
        setVisible: props.onVisibleChange,
    });

    return (
        <Fragment>
            {(() => {
                if (isValidElement(children)) {
                    const trueRef = (children as any).ref ?? ref;
                    ref.current = trueRef.current;

                    const onClick: React.MouseEventHandler<HTMLElement> = (e) => {
                        if (typeof children.props.onClick === 'function') children.props.onClick(e);
                        setVisible(!visible);
                    };

                    return cloneElement(children, { onClick, ref: trueRef } as any);
                }
                return children;
            })()}

            {(() => {
                if (display && ref.current) {
                    const container = getContainer();

                    return createPortal(
                        <Overlay
                            items={items}
                            visible={visible}
                            target={ref.current}
                            container={container}
                            placement={placement}
                            setVisible={setVisible}
                            overlayFollow={overlayFollow}
                            overlaySameWidth={overlaySameWidth}
                            afterClose={() => {
                                clearContainer();
                                setDisplay(false);
                            }}
                        />,
                        container,
                    );
                }
            })()}
        </Fragment>
    );
};

export default Dropdown;
