import { CardInfo, useCardInfo } from '@/services/cabinet';
import { FC, Fragment, useState } from 'react';
import Iconfont from '@/components/Iconfont';
import styles from './index.module.less';
import LoadingIcon from '@/components/LoadingIcon';

const render = (data: CardInfo[], index?: number) => {
    return data?.map((item, i) => <RenderItem item={item} index={index} key={i} />);
};

type RenderItemProps = {
    item: CardInfo;
    index?: number;
};

const RenderItem: FC<RenderItemProps> = ({ item, index = 0 }) => {
    const [visible, setVisible] = useState(false);
    const haveChild = Array.isArray(item.children) && item.children.length > 0;

    return (
        <Fragment>
            <div className={styles['line']}>
                <div className={styles['key']} style={{ paddingLeft: `${0.16 + index * 0.2}rem` }} onClick={() => setVisible((v) => !v)}>
                    {haveChild ? (
                        <Iconfont className={styles['icon']} icon={visible ? 'arrow-down-2' : 'arrow-right-2'} />
                    ) : (
                        <div className={styles['empty-icon']} />
                    )}
                    {item.itemName}
                </div>
                <div className={styles['value']}>
                    {item.diagStatus !== 0 && <div className={styles['error']} />}
                    {item.itemValue}
                </div>
            </div>
            {visible && haveChild && render(item.children || [], index + 1)}
        </Fragment>
    );
};

type Props = {
    title: string;
    activeId: string;
};

const Info: FC<Props> = ({ title, activeId }) => {
    const { data, isLoading } = useCardInfo(activeId);

    return activeId ? (
        <div className={styles['info']}>
            <div className={styles['title']}>{title}</div>
            <div className={styles['table-title']}>
                <div className={styles['key']}>诊断项</div>
                <div className={styles['value']}>诊断结果</div>
            </div>

            {!isLoading && <div className={styles['table']}>{render(data || [])}</div>}

            {isLoading && (
                <div className={styles['loading']}>
                    <LoadingIcon />
                </div>
            )}
        </div>
    ) : null;
};

export default Info;
