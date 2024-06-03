import fs from 'fs';

// 清除App
const clearAppZip = ({ AppZipName }: { AppZipName: string }) => {
    fs.unlinkSync(`./${AppZipName}`);
};

export default clearAppZip;
