import { CSSProperties, FC, MouseEventHandler } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import CloseSvg from '../CloseSvg';

type Props = {
    disabled?: boolean;
    className?: string;
    style?: CSSProperties;
    onClick?: MouseEventHandler<HTMLDivElement>;
};

const CloseX: FC<Props> = ({ onClick, className, disabled, style }) => {
    return (
        <div
            style={style}
            className={classNames(styles['close-x'], className, {
                [styles['disabled']]: disabled,
            })}
            onClick={(e) => {
                if (!disabled && typeof onClick === 'function') {
                    return onClick(e);
                }
            }}
        >
            <CloseSvg />
        </div>
    );
};

export default CloseX;
