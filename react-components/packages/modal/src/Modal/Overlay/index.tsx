import { FC, Fragment, useEffect } from 'react';
import { useTranslation } from '@pkg/i18n';
import { useAnimate } from '@react/hooks';
import { OverlayProps } from '../../type';
import useMoveModal from './useMoveModal';
import styles from './index.module.less';
import { CloseX } from '@pkg/widgets';
import { useTheme } from '@pkg/theme';
import classNames from 'classnames';
import { Button } from 'antd';

const Overlay: FC<OverlayProps> = (props) => {
    const { t1 } = useTranslation();
    const { closeableByConfirmLoading = true } = props;
    const { moveRef, onMouseDown, position } = useMoveModal();
    const { theme, themeClassName, applyClassName } = useTheme();
    const { title, visible, setVisible, afterClose, footer, cancelText, confirmText, confirmLoading } = props;
    const { children, width, className, style, fillUpWindow, headStyle, bodyStyle, footStyle, headBorder, footBorder } = props;
    const closeable = typeof props.closeable === 'boolean' ? props.closeable : closeableByConfirmLoading ? !confirmLoading : true;

    const { status, listeners, enter, leave } = useAnimate({
        afterLeave: () => {
            if (typeof afterClose === 'function') afterClose();
        },
    });

    useEffect(() => {
        if (visible === true) {
            enter();
        } else {
            leave();
        }
    }, [visible]);

    return (
        <div
            className={classNames(styles['mask'], themeClassName, applyClassName, styles[theme], {
                [styles['before-enter']]: status.beforeEnter,
                [styles['enter']]: status.isEnter, // 执行动画
                [styles['leave']]: status.isLeave, // 执行动画
            })}
        >
            <div ref={moveRef} className={styles['modal-position']} style={position}>
                <div
                    {...listeners}
                    style={{ width, ...style }}
                    className={classNames(styles['modal'], className, {
                        [styles['before-enter']]: status.beforeEnter,
                        [styles['enter']]: status.isEnter, // 执行动画
                        [styles['leave']]: status.isLeave, // 执行动画
                        [styles['fill-up']]: fillUpWindow,
                    })}
                >
                    <div style={headStyle} className={classNames(styles['head'], { [styles['bordered']]: headBorder })} onMouseDown={onMouseDown}>
                        <div className={styles['title']}>{title}</div>
                        <CloseX onClick={() => setVisible(false)} disabled={!closeable} />
                    </div>
                    <div
                        style={bodyStyle}
                        className={classNames(styles['body'], { [styles['head-bordered']]: headBorder, [styles['foot-bordered']]: footBorder })}
                    >
                        {children}
                    </div>
                    <div style={footStyle} className={classNames(styles['foot'], { [styles['bordered']]: footBorder })}>
                        {footer ?? (
                            <Fragment>
                                <Button onClick={() => setVisible(false)} disabled={!closeable}>
                                    {cancelText ?? t1('取消')}
                                </Button>
                                <Button type="primary" loading={confirmLoading}>
                                    {confirmText ?? t1('确定')}
                                </Button>
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overlay;
