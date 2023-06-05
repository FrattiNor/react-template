import { useDownloadFile, useFileUrl } from '@/services/knowledge';
import { previewFile } from '@suplink/jssdk';
import { fileDownload } from '@/utils/file';
import Toast from '@/components/Toast';
import { isWebview } from '@/env';
import copy2 from '@/utils/copy2';

const useHandle = () => {
    const download = useDownloadFile();
    const fileUrl = useFileUrl();

    // 后端传的文件名不正确|使用列表里的文件名
    const downloadFile = (md5: string, filename: string) => {
        if (isWebview) {
            fileUrl.mutateAsync(md5).then((url) => {
                if (url) {
                    setTimeout(() => {
                        copy2(url);
                        Toast.success('下载链接已复制到剪贴板\n请复制到浏览器下载');
                    });
                }
            });
        } else {
            download.mutateAsync(md5).then((res) => {
                if (res) fileDownload(res.blob, filename || res.filename);
            });
        }
    };

    const preview = (md5: string) => {
        fileUrl.mutateAsync(md5).then((url) => {
            if (url) {
                if (isWebview) {
                    previewFile({ url: url });
                } else {
                    window.open(url);
                }
            }
        });
    };

    return { downloadFile, preview };
};

export default useHandle;
