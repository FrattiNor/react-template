import { useDeviceModelList } from '@/services/device/query';
import InfiniteList from '@/components/InfiniteList';
import { useDeviceList } from '@/services/device';

const Device = () => {
    const query = useDeviceList(1);

    return (
        <InfiniteList
            rowKey="id"
            enableVisible
            query={query}
            renderItem={(item, visible) => <div style={{ height: visible ? 100 : 50 }}>{item.isdmTag}</div>}
            filter={{
                filterList: [
                    {
                        label: 'input',
                        type: 'input',
                        name: 'input',
                    },
                    {
                        label: 'select',
                        type: 'select',
                        name: 'select',
                        option: [
                            { a: 11, b: 21 },
                            { a: 12, b: 22 },
                            { a: 13, b: 23 },
                            { a: 14, b: 24 },
                            { a: 15, b: 25 },
                        ],
                        fieldKeys: { value: 'a', label: 'b' },
                    },
                    {
                        label: 'block-select',
                        type: 'block-select',
                        name: 'block-select',
                        columns: 3,
                        option: [
                            { a: 11, b: 21 },
                            { a: 12, b: 22 },
                            { a: 13, b: 23 },
                            { a: 14, b: 24 },
                            { a: 15, b: 25 },
                        ],
                        fieldKeys: { value: 'a', label: 'b' },
                    },
                    {
                        label: 'date-picker',
                        type: 'date-picker',
                        name: 'date-picker',
                    },
                    {
                        label: ['start', 'end'],
                        type: 'rang-picker',
                        name: ['start', 'end'],
                    },
                    {
                        label: '设备类型',
                        type: 'select',
                        name: 'mfrAndDevice',
                        option: useDeviceModelList,
                        multiple: true,
                        fieldKeys: {
                            key: 'mfrAndDevice',
                            value: 'mfrAndDevice',
                            label: 'deviceModelView',
                        },
                    },
                ],
                position: 'absolute',
            }}
        />
    );
};

export default Device;
