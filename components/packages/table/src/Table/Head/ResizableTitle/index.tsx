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
    const { onResizeStart, resizeActiveKey, addHeadHover, removeHeadHover } = innerProps;
    const noResizeActive = !resizeActiveKey;
    const resizeActive = resizeActiveKey === cellKey;

    if (!resize) {
        return (
            <div title={title} style={style} className={className}>
                {children}
            </div>
        );
    }

    return (
        <div
            title={title}
            style={style}
            onMouseEnter={() => addHeadHover(cellKey)}
            onMouseLeave={() => removeHeadHover(cellKey)}
            className={classNames(className, styles['resize-head-cell'], {
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
