import { useMemo } from 'react';

import { type GlobalHistoryAlarmItem } from '@app/services/src/webServices/Alarm/GlobalAlarm/History';
import { notEmpty, timeTool } from '@react/utils';

import AlarmLevel from '@/components/AlarmLevel';
import AlarmStatus from '@/components/AlarmStatus';
import { useAlarmStatusWidth } from '@/components/AlarmStatus/utils';
import HistoryAlarmRemarkCell from '@/components/HistoryAlarmRemarkCell';
import DeviceNameWithLink from '@/components/LinkComponents/DeviceNameWithLink';
import ListHandle, { createHandle } from '@/components/ListHandle';
import { useTranslation2 } from '@/i18n';
import { useAutoModal2 } from '@/modals';

import { type TableColumns } from '../../Table/TableTypes/typeColumn';
import { useTableAppContext } from '../../TableAppContext';

const useColumns = () => {
	const { t1, t2 } = useTranslation2();
	const { openModal } = useAutoModal2();
	const alarmStatusWidth = useAlarmStatusWidth();
	const { fixed, addColumn } = useTableAppContext();

	const columns: TableColumns<GlobalHistoryAlarmItem> = useMemo(
		() => [
			{
				// 序号
				fixed: 'left',
				title: t1('index'),
				key: 'index',
				width: 60,
				flexGrow: 0,
				align: 'center',
				render: (_, { index }) => index + 1,
				// filter: createListInnerFilter({
				// 	multiple: true,
				// 	type: 'select',
				// 	name: 'alarmStatus',
				// 	option: ALARM_STATUS.option,
				// 	fieldKeys: { label: 'label', value: 'value' },
				// }),
			},
			{
				key: 'StatusGroup',
				title: '报警状态Group',
				children: [
					{
						// 报警状态
						flexGrow: 0,
						title: t1('alarm_status'),
						key: 'alarmStatus',
						width: alarmStatusWidth,
						render: ({ alarmStatus }) => <AlarmStatus status={alarmStatus} />,
						// filter: createListInnerFilter({
						// 	multiple: true,
						// 	type: 'select',
						// 	name: 'alarmStatus',
						// 	option: ALARM_STATUS.option,
						// 	fieldKeys: { label: 'label', value: 'value' },
						// }),
					},
					{
						// 数据源类型
						// fixed: 'left',
						flexGrow: 0,
						fixed: fixed ? 'left' : undefined,
						title: t1('datasource_type'),
						key: 'alarmSource',
						width: 120,
						render: ({ alarmSource }) => notEmpty(alarmSource),
						// filter: createListInnerFilter({
						// 	type: 'select',
						// 	name: 'alarmSource',
						// 	option: alarmSourceQuery.data,
						// 	fieldKeys: { label: 'name', value: 'code' },
						// }),
					},
				],
			},
			{
				// 报警等级
				flexGrow: 0,
				title: t1('alarm_level'),
				key: 'alarmLevel',
				width: 100,
				render: ({ alarmLevel }) => <AlarmLevel level={alarmLevel} />,
				// filter: createListInnerFilter({
				// 	multiple: true,
				// 	type: 'select',
				// 	name: 'alarmLevel',
				// 	fieldKeys: { label: 'label', value: 'value' },
				// 	option: Object.entries(alarmLevelQuery.data ?? {}).map(([value, { name }]) => ({ value, label: name })),
				// }),
			},
			{
				// 报警类别
				// fixed: 'left',
				flexGrow: 0,
				fixed: fixed ? 'left' : undefined,
				title: t1('alarm_category'),
				key: 'alarmCategory',
				width: 150,
				render: ({ alarmCategory }) => notEmpty(alarmCategory),
				// filter: createListInnerFilter({
				// 	search: true,
				// 	multiple: true,
				// 	width: 250,
				// 	type: 'select',
				// 	name: 'alarmCategory',
				// 	option: Object.entries(alarmCategoryQuery.data ?? {}).map(([code, name]) => ({ label: name, value: code })),
				// 	fieldKeys: { label: 'label', value: 'value' },
				// }),
			},
			{
				// 时间
				title: t1('time'),
				key: 'statusChangeTime',
				width: 180,
				render: ({ statusChangeTime }) => notEmpty(statusChangeTime, () => timeTool.toStr(statusChangeTime)),
				// filter: createListInnerFilter({
				// 	showTime: true,
				// 	type: 'rangePicker',
				// 	disabledConf: { maxIntervalStr: '1year' },
				// 	startName: 'statusChangeTimeStart',
				// 	endName: 'statusChangeTimeEnd',
				// }),
			},
			{
				// 厂区
				fixed: fixed ? 'left' : undefined,
				title: t1('factory_area'),
				key: 'location',
				width: 150,
				render: ({ location }) => notEmpty(location),
				// onCell: ({ factoryModelPath }) => ({ title: notEmpty(factoryModelPath) }),
				// filter: locationFilter,
			},
			{
				// 装置
				title: t1('equipment_area'),
				key: 'area',
				width: 150,
				render: ({ factoryModelPath }) => notEmpty(factoryModelPath),
				// onCell: ({ factoryModelPath }) => ({ title: notEmpty(factoryModelPath) }),
				// filter: areaFilter,
			},
			{
				// 设备类别
				fixed: fixed ? 'left' : undefined,
				title: t1('equipment_category'),
				key: 'deviceCategory',
				width: 150,
				render: ({ deviceCategory }) => notEmpty(deviceCategory),
				// filter: createListInnerFilter({
				// 	search: true,
				// 	multiple: true,
				// 	type: 'treeSelect',
				// 	defaultVisibleLevel: 1,
				// 	name: 'deviceCategory',
				// 	option: deviceCategoryQuery.data,
				// 	fieldKeys: { label: 'name', value: 'categoryCode', children: 'children' },
				// }),
			},
			{
				// 设备名称
				title: t1('device_name'),
				key: 'deviceName',
				width: 150,
				render: ({ isdmTag, deviceName }) => <DeviceNameWithLink highlightKeywords={[]} isdmTag={isdmTag} deviceName={deviceName} />,
				// filter: createListInnerFilter({
				// 	type: 'autoComplete',
				// 	name: 'deviceName',
				// 	option: deviceNameQuery.data,
				// 	fieldKeys: { label: 'deviceName', value: 'deviceName' },
				// 	onSearch: deviceNameQuery.setKeyword,
				// }),
			},
			{
				// 设备描述
				title: t1('equipment_description'),
				key: 'deviceDescription',
				width: 200,
				render: ({ deviceDescription }) => notEmpty(deviceDescription),
				// filter: createListInnerFilter({
				// 	name: 'deviceDescription',
				// 	type: 'input',
				// }),
			},
			{
				// 厂商
				title: t1('manufacturer'),
				key: 'mfr',
				width: 150,
				render: ({ mfr }) => notEmpty(mfr),
				// filter: createListInnerFilter({
				// 	search: true,
				// 	multiple: true,
				// 	width: 250,
				// 	type: 'select',
				// 	name: 'mfr',
				// 	option: mfrQuery.data?.map((item) => ({ label: item, value: item })),
				// 	fieldKeys: { label: 'label', value: 'value' },
				// }),
			},
			{
				// 设备型号
				title: t1('equipment_model'),
				key: 'deviceModel',
				width: 150,
				render: ({ deviceModel }) => notEmpty(deviceModel),
				// filter: createListInnerFilter({
				// 	search: true,
				// 	multiple: true,
				// 	width: 250,
				// 	type: 'select',
				// 	name: 'deviceModel',
				// 	option: deviceModelQuery2.data?.map((item) => ({ label: item, value: item })),
				// 	fieldKeys: { label: 'label', value: 'value' },
				// }),
			},
			{
				// 事件源信息
				title: t1('ae_source'),
				key: 'aeSource',
				width: 300,
				render: ({ aeSource }) => notEmpty(aeSource),
				// filter: createListInnerFilter({
				// 	type: 'input',
				// 	name: 'aeSource',
				// }),
			},
			{
				// 报警条件
				title: t1('alarm_condition'),
				key: 'condition',
				width: 200,
				render: ({ condition }) => notEmpty(condition),
				// filter: createListInnerFilter({
				// 	type: 'input',
				// 	name: 'condition',
				// }),
			},
			{
				// 报警事件
				title: t1('alarm_event'),
				key: 'alarmName',
				width: 300,
				render: ({ alarmName }) => notEmpty(alarmName),
				// filter: createListInnerFilter({
				// 	type: 'input',
				// 	name: 'alarmName',
				// }),
			},
			{
				// 报警建议
				fixed: fixed ? 'right' : undefined,
				title: t1('alarm_suggestion'),
				key: 'alarmSuggestion',
				width: 300,
				render: ({ alarmSuggestion }) => notEmpty(alarmSuggestion),
				// filter: createListInnerFilter({
				// 	type: 'input',
				// 	name: 'alarmSuggestion',
				// }),
			},
			{
				// 现场操作用户
				title: t1('on_site_confirmation_user'),
				key: 'dcsActorId',
				width: 200,
				render: ({ dcsActorId }) => notEmpty(dcsActorId),
				// filter: createListInnerFilter({
				// 	type: 'input',
				// 	name: 'dcsActorId',
				// }),
			},
			{
				// 现场确认时间
				fixed: fixed ? 'right' : undefined,
				title: t1('on_site_confirmation_time'),
				key: 'dcsAckedTime',
				width: 180,
				render: ({ dcsAckedTime }) => notEmpty(dcsAckedTime, () => timeTool.toStr(dcsAckedTime)),
				// filter: createListInnerFilter({
				// 	type: 'rangePicker',
				// 	showTime: true,
				// 	startName: 'dcsAckedTimeStart',
				// 	endName: 'dcsAckedTimeEnd',
				// }),
			},
			{
				// 平台确认信息
				title: t1('platform_confirmation_info'),
				key: 'message',
				width: 200,
				render: ({ message }) => notEmpty(message),
				// filter: createListInnerFilter({
				// 	type: 'input',
				// 	name: 'message',
				// }),
			},
			{
				// 平台确认时间
				fixed: fixed ? 'right' : undefined,
				title: t1('platform_confirmation_time'),
				key: 'ackTime',
				width: 180,
				render: ({ ackTime }) => notEmpty(ackTime, () => timeTool.toStr(ackTime)),
				// filter: createListInnerFilter({
				// 	type: 'rangePicker',
				// 	showTime: true,
				// 	startName: 'ackTimeStart',
				// 	endName: 'ackTimeEnd',
				// }),
			},
			{
				// 平台确认人
				title: t1('platform_confirmation_user'),
				key: 'ackUser',
				width: 150,
				render: ({ ackUser }) => notEmpty(ackUser),
				// onCell: ({ ackUserCode }) => ({ title: ackUserCode }),
				// filter: createListInnerFilter({
				// 	search: true,
				// 	multiple: true,
				// 	width: 250,
				// 	type: 'select',
				// 	name: 'ackUserCode',
				// 	option: userQuery.data,
				// 	fieldKeys: { label: 'name', value: 'code' },
				// }),
			},
			{
				// 备注
				fixed: fixed ? 'right' : undefined,
				title: t1('remark'),
				key: 'remark',
				width: 150,
				render: ({ remark, id }) => <HistoryAlarmRemarkCell id={id} remark={remark} openModal={openModal} highlightKeywords={[]} />,
				// filter: createListInnerFilter({
				// 	type: 'input',
				// 	name: 'remark',
				// }),
			},
			{
				// 备注时间
				title: t1('remark_time'),
				key: 'remarkTime',
				width: 150,
				render: ({ remarkTime }) => notEmpty(remarkTime, () => timeTool.toStr(remarkTime)),
				// filter: createListInnerFilter({
				// 	showTime: true,
				// 	type: 'rangePicker',
				// 	startName: 'remarkTimeStart',
				// 	endName: 'remarkTimeEnd',
				// }),
			},
			...(addColumn
				? ([
						{
							fixed: 'right',
							width: 70,
							flexGrow: 1,
							key: 'handle',
							title: t1('operate'),
							render: () => {
								const items = [
									createHandle({
										danger: true,
										label: t1('delete'),
										confirm: t2('confirm deletion of this {{x}}?', { x: 'alarm_history' }),
										onClick: async () => {},
									}),
								];
								return <ListHandle items={items} renderType="link" style={{ minWidth: '100%', paddingLeft: 8 }} gap={16} />;
							},
						},
					] as TableColumns<GlobalHistoryAlarmItem>)
				: []),
		],
		[fixed, addColumn],
	);

	return columns;
};

export default useColumns;
