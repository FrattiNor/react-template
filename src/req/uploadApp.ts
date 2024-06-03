import { getRecord, gotInstance, transformObjToFormData } from '../utils.js';
import qs from 'qs';

// 上传本地App
const uploadApp = async ({
    suposHost,
    supOsTicket,
    uploadInfo,
    file,
}: {
    suposHost: string;
    supOsTicket: string;
    uploadInfo: Record<string, any>;
    file: any;
}) => {
    const record = getRecord('上传');

    record.start();

    const uploadInfoReq = await gotInstance(`${suposHost}/inter-api/installer/v3/packages/info`, {
        method: 'POST',
        body: JSON.stringify(uploadInfo),
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${supOsTicket}`,
        },
    });

    const packageId = JSON.parse(uploadInfoReq.body)['data'];

    await gotInstance(`${suposHost}/inter-api/installer/v3/packages/upload`, {
        method: 'POST',
        searchParams: qs.stringify({ packageId }),
        headers: {
            Authorization: `Bearer ${supOsTicket}`,
        },
        body: transformObjToFormData({ file }),
    });

    record.end();
};

export default uploadApp;
