import { FC, Fragment, PropsWithChildren } from 'react';
import styles from './index.module.less';

type Props = PropsWithChildren<{
    bg?: string;
}>;

const Tag: FC<Props> = ({ bg, children }) => {
    return (
        <Fragment>
            <div className={styles['level-tag']} style={{ backgroundColor: bg }}>
                {children}
            </div>
        </Fragment>
    );
};

export default Tag;
