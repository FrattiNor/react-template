import { getRecord, gotInstance, transformObjToFormData } from '../utils.js';
import qs from 'qs';

type UploadAppProps = {
    suposHost: string;
    supOsTicket: string;
    uploadInfo: Record<string, any>;
    file: any;
};

// 上传本地App
const uploadApp = async ({ suposHost, supOsTicket, uploadInfo, file }: UploadAppProps) => {
    // 执行上传前置接口【获取packageId，上传接口需要使用】
    const packageId = await (async () => {
        const record = getRecord('上传前置请求');

        record.start();

        const uploadInfoReq = await gotInstance(`${suposHost}/inter-api/installer/v3/packages/info`, {
            method: 'POST',
            body: JSON.stringify(uploadInfo),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                Authorization: `Bearer ${supOsTicket}`,
            },
        });

        const _packageId = JSON.parse(uploadInfoReq.body)['data'];

        record.end();

        return _packageId;
    })();

    // 执行上传App接口
    await (async () => {
        const record = getRecord('上传App');

        record.start();

        await gotInstance(`${suposHost}/inter-api/installer/v3/packages/upload`, {
            method: 'POST',
            searchParams: qs.stringify({ packageId }),
            headers: { Authorization: `Bearer ${supOsTicket}` },
            body: transformObjToFormData({ file }),
        });

        record.end();
    })();
};

export default uploadApp;
