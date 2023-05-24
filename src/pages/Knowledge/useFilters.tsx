import { useDeviceModelOption, useKnowledgeTagOption } from '@/services/knowledge';
import { createFilterItem } from '@/components/InfiniteList/utils';

const useFilters = () => {
    return [
        createFilterItem({
            label: '正文',
            name: 'content',
            type: 'input',
        }),
        createFilterItem({
            label: '文档名称',
            name: 'fileName',
            type: 'input',
        }),
        createFilterItem({
            label: '设备',
            name: 'isdmTag',
            type: 'input',
        }),
        createFilterItem({
            label: '知识分类',
            name: 'classificationId',
            type: 'select',
            multiple: true,
            option: useKnowledgeTagOption,
            fieldKeys: {
                value: 'id',
                label: 'name',
            },
        }),
        createFilterItem({
            label: '设备类型',
            name: 'mfrAndDevice',
            type: 'select',
            multiple: true,
            option: useDeviceModelOption,
            fieldKeys: {
                value: 'mfrAndDevice',
                label: 'deviceModelView',
            },
        }),
        // createFilterItem({
        //     label: '工厂模型',
        //     type: 'block-select',
        //     multiple: true,
        //     columns: 2,
        //     name: 'sourceType',
        //     option: Array.from(DEVICE_ORIGIN_MAP).map(([value, label]) => ({ value, label })),
        // }),
    ];
};

export default useFilters;
