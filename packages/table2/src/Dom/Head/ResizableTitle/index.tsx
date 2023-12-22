import { CSSProperties, FC, PropsWithChildren } from 'react';
import { useContext2 } from '../../../Context2';
import styles from './index.module.less';
import classNames from 'classnames';

type Props = PropsWithChildren<{
    title?: string;
    cellKey: string;
    className?: string;
    style?: CSSProperties;
}>;

const ResizableTitle: FC<Props> = (props) => {
    const { innerProps } = useContext2();
    const { onResizeStart, resizeActiveKey } = innerProps;
    const { cellKey, title, style, className, children } = props;
    const active = resizeActiveKey === cellKey;

    return (
        <div title={title} style={style} className={classNames(styles['resize-head-cell'], className, { [styles['active']]: active })}>
            {children}
            <span onMouseDown={onResizeStart(cellKey)} className={styles['resizable-handle']} />
        </div>
    );
};

export default ResizableTitle;
