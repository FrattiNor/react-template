import styles from './index.module.less';
import { FC, useState } from 'react';
import classNames from 'classnames';

type Props = {
    expanded?: boolean;
    onChange?: (c: boolean) => void;
};

const Expandable: FC<Props> = (props) => {
    const [_expanded, _setExpanded] = useState(false);
    const expanded = props.expanded ?? _expanded;
    const setExpanded = props.onChange ?? _setExpanded;

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
