import { FC, Fragment, useEffect } from 'react';

import Button from '@pkg/button';
import { useTranslation } from '@pkg/i18n';
import { useTheme } from '@pkg/theme';
import { CloseX } from '@pkg/widgets';
import { useAnimate } from '@react/hooks';
import classNames from 'classnames';

import styles from './index.module.less';
import useMoveModal from './useMoveModal';
import { OverlayProps } from '../../type';

const bodyOverflowHiddenStyle = (
    <style>
        {`html body {
            overflow: hidden;
        }`}
    </style>
);

const Overlay: FC<OverlayProps> = (props) => {
    const { t1 } = useTranslation();
    const { theme, themeClassName, applyTheme } = useTheme();
    const { moveRef, onMouseDown, position } = useMoveModal();

    const { title, visible, setVisible, afterClose, footer, cancelText, confirmText, confirmLoading } = props;
    const { closeableByConfirmLoading = true, submitButtonProps, cancelButtonProps, onSubmit, onCancel } = props;
    const { children, width, className, style, fillUpWindow, headStyle, bodyStyle, footStyle, headBorder, footBorder, hiddenCloseX } = props;

    const closeable = typeof props.closeable === 'boolean' ? props.closeable : closeableByConfirmLoading ? !confirmLoading : true;
    const haveTitle = title !== false && title !== undefined;
    const haveFooter = footer !== false;

    const _onCancel = () => {
        setVisible(false);
        if (onCancel) onCancel();
    };

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
            className={classNames(styles['mask'], themeClassName, applyTheme, styles[theme], {
                [styles['before-enter']]: status.beforeEnter,
                [styles['entering']]: status.isEntering, // 执行动画
                [styles['leaving']]: status.isLeaving, // 执行动画
            })}
        >
            <div ref={moveRef} className={styles['modal-position']} style={position}>
                <div
                    {...listeners}
                    style={{ width, ...style }}
                    className={classNames(styles['modal'], className, {
                        [styles['before-enter']]: status.beforeEnter,
                        [styles['entering']]: status.isEntering, // 执行动画
                        [styles['leaving']]: status.isLeaving, // 执行动画
                        [styles['fill-up']]: fillUpWindow,
                    })}
                >
                    {haveTitle && (
                        <div style={headStyle} className={classNames(styles['head'], { [styles['bordered']]: headBorder })} onMouseDown={onMouseDown}>
                            <div className={styles['title']}>{title}</div>
                            {!hiddenCloseX && <CloseX onClick={() => setVisible(false)} disabled={!closeable} />}
                        </div>
                    )}

                    <div
                        style={bodyStyle}
                        className={classNames(styles['body'], {
                            [styles['head-bordered']]: headBorder,
                            [styles['foot-bordered']]: footBorder,
                            [styles['not-have-title']]: !haveTitle,
                            [styles['not-have-footer']]: !haveFooter,
                        })}
                    >
                        {children}
                    </div>

                    {haveFooter && (
                        <div style={footStyle} className={classNames(styles['foot'], { [styles['bordered']]: footBorder })}>
                            {footer ?? (
                                <Fragment>
                                    <Button onClick={_onCancel} disabled={!closeable} {...cancelButtonProps}>
                                        {cancelText ?? t1('package_ui@modal.cancel')}
                                    </Button>
                                    <Button onClick={onSubmit} type="primary" loading={confirmLoading} {...submitButtonProps}>
                                        {confirmText ?? t1('package_ui@modal.confirm')}
                                    </Button>
                                </Fragment>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {bodyOverflowHiddenStyle}
        </div>
    );
};

export default Overlay;
