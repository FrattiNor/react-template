import { FC, MouseEventHandler, PropsWithChildren } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';

type Props = PropsWithChildren<{
    active: boolean;
    onMouseDown: MouseEventHandler<HTMLSpanElement>;
}>;

const ResizableTitle: FC<Props> = (props) => {
    const { active, children, onMouseDown } = props;

    return (
        <div className={classNames(styles['resizable-title'], { [styles['active']]: active })}>
            {children}
            <span onMouseDown={onMouseDown} className={styles['resizable-handle']} />
        </div>
    );
};

export default ResizableTitle;
