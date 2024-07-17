import fs from 'fs';
import { getRecord } from './utils.js';

// 清除App
const clearAppZip = ({ AppZipName }: { AppZipName: string }) => {
    const record = getRecord('删除安装包');

    record.start();

    fs.unlinkSync(`./${AppZipName}`);

    record.end();
};

export default clearAppZip;
