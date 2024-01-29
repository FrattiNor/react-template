import { ConfigProvider, theme as antdTheme } from 'antd';
import { FC, PropsWithChildren } from 'react';
import useTheme from './useTheme';

// 因为还有大部分组件使用的是Antd的，所以需要保持主题一致
const AntdThemeProvider: FC<PropsWithChildren> = ({ children }) => {
    const { theme, fontFamily } = useTheme();

    return (
        <ConfigProvider
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
