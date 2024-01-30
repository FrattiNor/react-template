import { CSSProperties, FC, PropsWithChildren } from 'react';
import { useTableContext } from '../../../../TableContext';
import styles from './index.module.less';
import classNames from 'classnames';

type Props = PropsWithChildren<{
    title?: string;
    cellKey: string;
    resize?: boolean;
    className?: string;
    style?: CSSProperties;
}>;

const ResizableTitle: FC<Props> = (props) => {
    const tableContext = useTableContext();
    const { cellKey, title, style, className, children, resize = true } = props;
    const { onResizeStart, resizeActiveKey, resizeReadyKey } = tableContext;
    const noResizeActive = !resizeActiveKey;
    const resizeActive = resizeActiveKey === cellKey || resizeReadyKey === cellKey;
    const currentClassName = classNames(className, styles['resize-head-cell'], {
        [styles['resize-active']]: resizeActive,
        [styles['no-resize-active']]: noResizeActive,
        [styles['any-cell-resizing']]: !!resizeActiveKey,
    });

    if (!resize) {
        return (
            <div title={title} style={style} className={currentClassName}>
                {children}
            </div>
        );
    }

    return (
        <div data-key={cellKey} title={title} style={style} className={classNames(currentClassName)}>
            {children}
            <span onMouseDown={onResizeStart} className={styles['resizable-handle']} />
        </div>
    );
};

export default ResizableTitle;
