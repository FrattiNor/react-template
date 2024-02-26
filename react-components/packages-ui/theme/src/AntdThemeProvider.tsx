import { FC, PropsWithChildren } from 'react';

import { useTranslation } from '@pkg/i18n';
import { ConfigProvider, theme as antdTheme } from 'antd';
import en_US from 'antd/locale/en_US';
import zh_CN from 'antd/locale/zh_CN';

import useTheme from './useTheme';

type Props = PropsWithChildren<{
    fontFamily?: string;
}>;

// 因为还有大部分组件使用的是Antd的，所以需要保持主题一致
const AntdThemeProvider: FC<Props> = ({ children, fontFamily }) => {
    const { theme } = useTheme();
    const { local } = useTranslation();

    return (
        <ConfigProvider
            locale={local === 'zh_cn' ? zh_CN : en_US}
            theme={{
                algorithm: theme === 'light' ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm,
                token: { borderRadius: 4, fontFamily, colorPrimary: theme === 'light' ? '#4096ff' : '#3c89e8' },
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default AntdThemeProvider;
