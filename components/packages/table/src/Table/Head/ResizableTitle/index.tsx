import { CSSProperties, FC, PropsWithChildren } from 'react';
import { useTableContext } from '../../../TableContext';
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
    const { innerProps } = useTableContext();
    const { cellKey, title, style, className, children, resize = true } = props;
    const { onResizeStart, resizeActiveKey, colHoverObj, addColHover, removeColHover } = innerProps;
    const noResizeActive = !resizeActiveKey;
    const resizeActive = resizeActiveKey === cellKey;

    if (!resize) {
        return (
            <div
                title={title}
                style={style}
                onMouseEnter={() => addColHover(cellKey)}
                onMouseLeave={() => removeColHover(cellKey)}
                className={classNames(className, styles['resize-head-cell'], {
                    [styles['col-hover']]: colHoverObj[cellKey],
                    [styles['resize-active']]: resizeActive,
                    [styles['no-resize-active']]: noResizeActive,
                })}
            >
                {children}
            </div>
        );
    }

    return (
        <div
            title={title}
            style={style}
            onMouseEnter={() => addColHover(cellKey)}
            onMouseLeave={() => removeColHover(cellKey)}
            className={classNames(className, styles['resize-head-cell'], {
                [styles['col-hover']]: colHoverObj[cellKey],
                [styles['resize-active']]: resizeActive,
                [styles['no-resize-active']]: noResizeActive,
            })}
        >
            {children}
            <span onMouseDown={onResizeStart(cellKey)} className={styles['resizable-handle']} />
        </div>
    );
};

export default ResizableTitle;
