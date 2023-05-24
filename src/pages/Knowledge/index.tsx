import { useDownloadFile, useFileUrl, useKnowledgeList } from '@/services/knowledge';
import TableLike, { Line } from '@/components/TableLike';
import InfiniteList from '@/components/InfiniteList';
import Collapse from '@/components/Collapse';
import { fileDownload } from '@/utils/file';
import Header from '@/components/Header';
import styles from './index.module.less';
import timeTool from '@/utils/timeTool';
import notEmpty from '@/utils/notEmpty';
import useFilters from './useFilters';
import { Button } from 'antd-mobile';

const Knowledge = () => {
    const filterList = useFilters();
    const download = useDownloadFile();
    const query = useKnowledgeList();
    const fileUrl = useFileUrl();

    // 后端传的文件名不正确，使用列表里的文件名
    const downloadFile = (md5: string, filename: string) => {
        download.mutateAsync(md5).then((res) => {
            if (res) fileDownload(res.blob, filename || res.filename);
        });
    };

    return (
        <Header>
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
                                <Line>工厂模型:{notEmpty(item.factoryModelName?.join(', '))}</Line>
                                <Line>设备类型:{notEmpty(item.deviceModelView?.join(', '))}</Line>
                                <Line>设备:{notEmpty(item.isdmTag?.join(', '))}</Line>
                                <div className={styles['btn-container']} onClick={(e) => e.stopPropagation()}>
                                    <Button size="small" color="primary" onClick={() => downloadFile(item.md5, item.fileName)}>
                                        下载
                                    </Button>
                                    <Button size="small" color="primary" disabled={!item.supportView} onClick={() => fileUrl.mutate(item.md5)}>
                                        预览
                                    </Button>
                                </div>
                            </Collapse>
                        </TableLike>
                    </div>
                )}
            />
        </Header>
    );
};

export default Knowledge;
