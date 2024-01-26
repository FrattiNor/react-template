import { nanoid } from 'nanoid';

type fileUploadProps = {
    accept?: string;
    multiple?: boolean;
};

/**
 * 文件上传
 * @param accept 接收类型
 * @param multiple 多选
 */
const uploadId = nanoid();
export const uploadFile = (props?: fileUploadProps): Promise<File[]> => {
    return new Promise((res) => {
        const { accept, multiple } = props || {};
        const oldInput = document.getElementById(uploadId);
        if (oldInput) document.body.removeChild(oldInput);
        const input = document.createElement('input');
        input.setAttribute('id', `${uploadId}`);
        input.setAttribute('style', 'display:none');
        input.setAttribute('name', 'files');
        input.setAttribute('type', 'file');
        if (typeof accept === 'string') input.setAttribute('accept', accept);
        if (typeof multiple === 'boolean') input.setAttribute('multiple', `${multiple}`);

        // 触发上传事件
        input.onchange = (e) => {
            const files = (e?.target as any)?.files as FileList;
            const fileArray: File[] = [];
            for (let i = 0; i < files.length; i++) {
                fileArray.push(files[i]);
            }
            res(fileArray);
        };

        document.body.appendChild(input);
        input.click();
    });
};

/**
 * 文件下载
 * @param blob 文件数据
 * @param filename 文件名称
 */
export const downloadBlob = (blob: Blob, filename: string) => {
    const blobUrl = URL.createObjectURL(blob);
    const aLink = document.createElement('a');
    aLink.setAttribute('style', 'display:none');
    aLink.setAttribute('href', `${blobUrl}`);
    aLink.setAttribute('download', `${filename}`);
    document.body.appendChild(aLink);
    aLink.click();
    URL.revokeObjectURL(blobUrl);
    document.body.removeChild(aLink);
};

/**
 * 文件打开
 * @param url 文件直链
 */
export const openFileUrl = (url: string) => {
    const aLink = document.createElement('a');
    aLink.setAttribute('style', 'display:none');
    aLink.setAttribute('href', url);
    aLink.setAttribute('target', '_blank');
    document.body.appendChild(aLink);
    aLink.click();
    document.body.removeChild(aLink);
};

/**
 * 下载url直链，而非打开
 * @param url 文件直链
 * @param filename 文件名称
 */
export const downloadFileUrl = (url: string, filename: string) => {
    fetch(url).then((res) => {
        res.blob().then((blob) => {
            downloadBlob(blob, filename);
        });
    });
};
