import { FC, PropsWithChildren } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';

type Props = PropsWithChildren<{
    type: 'value' | 'placeholder';
}>;

const Value: FC<Props> = ({ type, children }) => {
    return <span className={classNames({ [styles['value']]: type === 'value', [styles['placeholder']]: type === 'placeholder' })}>{children}</span>;
};

export default Value;
