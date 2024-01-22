 
import { TableColumns } from '@react/components';
import { Dropdown } from '@react/components';
import { notEmpty } from '@react/utils';

const useColumns = () => {
    const columns: TableColumns<any> = [
        {
            title: '数据源类型',
            key: 'alarmSource',
            width: 100,
        },
        {
            title: '报警等级',
            key: 'alarmLevel',
            width: 100,
            render: ({ alarmLevel }) => (
                <Dropdown
                    items={[
                        { label: '123', key: '1' },
                        { label: '1234', key: '2' },
                    ]}
                >
                    <span>{alarmLevel}</span>
                </Dropdown>
            ),
        },
        {
            title: '设备类别',
            key: 'deviceCategory',
            width: 150,
            render: ({ deviceCategory }: any) =>
                notEmpty(deviceCategory, () => (
                    <Dropdown
                        overlayFollow
                        placement="topRight"
                        items={[
                            { label: '123', key: '1' },
                            { label: '1234', key: '2' },
                        ]}
                    >
                        <span>{deviceCategory}</span>
                    </Dropdown>
                )),
        },
        {
            title: '报警时间',
            key: 'alarmTime',
            width: 200,
            render: ({ alarmTime }) => notEmpty(alarmTime),
        },
        {
            title: '厂区',
            key: 'location',
            width: 150,
            render: ({ location }: any) => location,
        },
        {
            title: '装置',
            key: 'area',
            width: 150,
            render: ({ area }: any) => area,
        },
        {
            title: '仪控位号',
            key: 'isdmTag',
            width: 150,
            render: ({ tagName, isdmTag }: any) => tagName || isdmTag,
        },
        {
            title: '事件源信息',
            key: 'aeSource',
            width: 300,
            render: ({ aeSource }: any) => notEmpty(aeSource),
        },
        {
            title: '报警事件',
            key: 'alarmName',
            width: 300,
            render: ({ alarmName }) => notEmpty(alarmName),
        },
        {
            title: '厂商',
            key: 'mfr',
            width: 150,
            render: ({ mfr }) => notEmpty(mfr),
        },
        {
            title: '设备型号',
            key: 'deviceModel',
            width: 150,
            render: ({ deviceModel }) => notEmpty(deviceModel),
        },
        {
            title: '现场确认状态',
            key: 'dcsAlarmStatus',
            width: 120,
            render: ({ dcsAlarmStatus }: any) => notEmpty(dcsAlarmStatus),
        },
        {
            title: '现场确认站点',
            key: 'dcsStation',
            width: 200,
            render: ({ dcsStation }: any) => notEmpty(dcsStation),
        },
        {
            title: '现场确认时间',
            key: 'dcsAckedTime',
            width: 200,
            render: ({ dcsAckedTime }: any) => notEmpty(dcsAckedTime),
        },
        {
            title: '平台确认状态',
            key: 'status',
            width: 120,
            render: ({ status }) => status,
        },
        {
            title: '平台确认信息',
            key: 'message',
            width: 200,
            render: ({ message }) => message,
            edit: ({ status }) => status !== 'UN_ACKED',
        },
        {
            title: '平台确认时间',
            key: 'ackTime',
            width: 200,
            render: ({ ackTime }) => notEmpty(ackTime),
        },
        {
            title: '平台确认人',
            key: 'ackUser',
            width: 150,
            render: ({ ackUser }) => notEmpty(ackUser),
        },
        {
            title: '故障原因',
            key: 'faultCause',
            width: 200,
            render: ({ faultCause }) => notEmpty(faultCause),
        },
        {
            title: '处理时间',
            key: 'handleTime',
            width: 200,
            render: ({ handleTime }) => notEmpty(handleTime),
        },
        {
            title: '处理方式',
            key: 'handleMethod',
            width: 200,
            render: ({ handleMethod }) => notEmpty(handleMethod),
        },
        {
            title: '处理人',
            key: 'handleUser',
            width: 150,
            render: ({ handleUser }) => notEmpty(handleUser),
        },
    ];

    return columns;
};

export default useColumns;
