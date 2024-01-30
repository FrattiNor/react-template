import { FC } from 'react';

import { useMergeState } from '@react/hooks';
import classNames from 'classnames';

import styles from './index.module.less';

type Props = {
    expanded?: boolean;
    onChange?: (c: boolean) => void;
};

const Expandable: FC<Props> = (props) => {
    const [expanded, setExpanded] = useMergeState({
        defaultValue: false,
        state: props.expanded,
        setState: props.onChange,
    });

    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                setExpanded(!expanded);
            }}
            className={classNames(styles['expandable'], {
                [styles['expanded']]: expanded,
            })}
        />
    );
};

export default Expandable;
