import { InfiniteQuery2 } from '@/components/InfiniteList/Wrapper/type';
import { Dispatch, FC, SetStateAction } from 'react';
import Iconfont from '@/components/Iconfont';
import styles from './index.module.less';
import classNames from 'classnames';

type Props = {
    haveNew: boolean;
    setHaveNew: Dispatch<SetStateAction<boolean>>;
};

const RealtimeRefresh = ({ haveNew, setHaveNew }: Props) => {
    const Inner: FC<InfiniteQuery2<any>> = ({ remove, setParams }) => {
        const onClick = () => {
            remove();
            setParams({}); // 会触发请求
            setHaveNew(false);
        };

        return (
            <div className={classNames(styles['wrapper'], { [styles['new-data']]: haveNew })} onClick={onClick}>
                <Iconfont icon="refresh" />
            </div>
        );
    };

    return Inner;
};

export default RealtimeRefresh;
