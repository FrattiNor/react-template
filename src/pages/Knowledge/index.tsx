import TableLike, { Line } from '@/components/TableLike';
import { useKnowledgeList } from '@/services/knowledge2';
import InfiniteList from '@/components/InfiniteList';
import Collapse from '@/components/Collapse';
import Header from '@/components/Header';
import styles from './index.module.less';
import timeTool from '@/utils/timeTool';
import notEmpty from '@/utils/notEmpty';
import useFilters from './useFilters';

const Knowledge = () => {
    const filterList = useFilters();
    const query = useKnowledgeList();

    return (
        <Header boxShadow={false}>
            <InfiniteList
                rowKey="id"
                query={query}
                enableVisible={true}
                filter={{ filterList }}
                renderItem={(item, { visible }) => (
                    <div className={styles['item']}>
                        <TableLike className={{ 0: styles['key'], 1: styles['value'] }}>
                            <Line>文档名称:{notEmpty(item.fileName)}</Line>
                            <Line>知识分类:{notEmpty(item.classificationName)}</Line>
                            <Line>创建时间:{notEmpty(item.createTime, () => timeTool.toStrByNum(item.createTime))}</Line>
                            <Collapse visible={visible}>
                                <Line>工厂模型:{notEmpty(item.factoryModelName)}</Line>
                                <Line>设备类型:{notEmpty(item.deviceModelView)}</Line>
                                <Line>设备:{notEmpty(item.isdmTag)}</Line>
                            </Collapse>
                        </TableLike>
                    </div>
                )}
            />
        </Header>
    );
};

export default Knowledge;
