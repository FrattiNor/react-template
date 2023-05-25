import KeyValueTable, { KeyValueProvider, Tr } from '@/components/KeyValueTable';
import { HandleLogItem } from '@/services/handleLog';
import Collapse from '@/components/Collapse';
import styles from './index.module.less';
import timeTool from '@/utils/timeTool';
import notEmpty from '@/utils/notEmpty';
import { useCallback } from 'react';

export const useRender = () => {
    const renderLogItem = useCallback(
        (item: HandleLogItem, { visible }: { visible: boolean }) => (
            <KeyValueProvider widthClassNames={[styles['key']]}>
                <KeyValueTable>
                    <Tr>时间:{notEmpty(item.timestampStart, () => timeTool.toStrByNum(item.timestampStart))}</Tr>
                    <Tr>IDM位号:{notEmpty(item.resName)}</Tr>
                    <Tr>事件类型:{notEmpty(item.functionName)}</Tr>
                </KeyValueTable>
                <Collapse visible={visible}>
                    <KeyValueTable>
                        <Tr>操作站:{notEmpty(item.workstation)}</Tr>
                        <Tr>用户:{notEmpty(item.user)}</Tr>
                    </KeyValueTable>
                </Collapse>
            </KeyValueProvider>
        ),
        [],
    );

    return renderLogItem;
};
