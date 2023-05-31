import styles from './index.module.less';
import { FC } from 'react';

type Props = {
    url: string;
};

const URl: FC<Props> = ({ url }) => {
    return <iframe className={styles['iframe']} src={url} />;
};

export default URl;
