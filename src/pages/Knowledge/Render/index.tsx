import { KnowledgeItem, useDownloadFile, useFileUrl } from '@/services/knowledge';
import KeyValueTable, { KeyValueProvider, Tr } from '@/components/KeyValueTable';
import Collapse from '@/components/Collapse';
import { fileDownload } from '@/utils/file';
import styles from './index.module.less';
import timeTool from '@/utils/timeTool';
import notEmpty from '@/utils/notEmpty';
import { Button } from 'antd-mobile';
import { useCallback } from 'react';

const useRender = () => {
    const download = useDownloadFile();
    const fileUrl = useFileUrl();

    // 后端传的文件名不正确，使用列表里的文件名
    const downloadFile = (md5: string, filename: string) => {
        download.mutateAsync(md5).then((res) => {
            if (res) fileDownload(res.blob, filename || res.filename);
        });
    };

    const renderItem = useCallback(
        (item: KnowledgeItem, { visible }: { visible: boolean }) => (
            <KeyValueProvider widthClassNames={[styles['key']]}>
                <KeyValueTable>
                    <Tr>文档名称:{notEmpty(item.fileName)}</Tr>
                    <Tr>知识分类:{notEmpty(item.classificationName)}</Tr>
                    <Tr>创建时间:{notEmpty(item.createTime, () => timeTool.toStrByNum(item.createTime))}</Tr>
                </KeyValueTable>
                <Collapse visible={visible}>
                    <KeyValueTable>
                        <Tr>工厂模型:{notEmpty(item.factoryModelName?.join(', '))}</Tr>
                        <Tr>设备类型:{notEmpty(item.deviceModelView?.join(', '))}</Tr>
                        <Tr>设备:{notEmpty(item.isdmTag?.join(', '))}</Tr>
                    </KeyValueTable>

                    <div className={styles['bottom']} onClick={(e) => e.stopPropagation()}>
                        <Button size="small" color="primary" onClick={() => downloadFile(item.md5, item.fileName)}>
                            下载
                        </Button>
                        <Button size="small" color="primary" disabled={!item.supportView} onClick={() => fileUrl.mutate(item.md5)}>
                            预览
                        </Button>
                    </div>
                </Collapse>
            </KeyValueProvider>
        ),
        [],
    );

    return { renderItem };
};

export default useRender;
