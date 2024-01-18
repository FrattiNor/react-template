import { CSSProperties, FC, MouseEventHandler } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import CloseSvg from '../CloseSvg';

type Props = {
    className?: string;
    style?: CSSProperties;
    onClick?: MouseEventHandler<HTMLDivElement>;
};

const CloseX: FC<Props> = ({ onClick, className, style }) => {
    return (
        <div className={classNames(styles['close-x'], className)} style={style} onClick={onClick}>
            <CloseSvg />
        </div>
    );
};

export default CloseX;
