import styles from './index.module.less';
import classNames from 'classnames';
import { FC, useState } from 'react';

type Props = {
    expanded?: boolean;
    onChange?: (c: boolean) => void;
};

const Expandable: FC<Props> = (props) => {
    const [_expanded, _setExpanded] = useState(false);
    const expanded = props.expanded ?? _expanded;
    const setExpanded = props.onChange ?? _setExpanded;

    return <div className={classNames(styles['expandable'], { [styles['expanded']]: expanded })} onClick={() => setExpanded(!expanded)} />;
};

export default Expandable;
