import { type FC, type PropsWithChildren } from 'react';

import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs';
import { App, ConfigProvider, theme as antdTheme, type ThemeConfig } from 'antd';
import en_US from 'antd/locale/en_US';
import zh_CN from 'antd/locale/zh_CN';

import useMergeTheme from './useMergeTheme';
import { useTranslation } from '../Local';
import { useTheme } from '../Theme';

const darkTheme: ThemeConfig = {
	algorithm: antdTheme.darkAlgorithm,
	token: {
		boxShadow: '0 3px 6px -4px rgba(0,0,0,0.48), 0 6px 16px 0 rgba(0,0,0,0.32), 0 9px 28px 8px rgba(0,0,0,0.2)',
		boxShadowSecondary: '0 3px 6px -4px rgba(0,0,0,0.48), 0 6px 16px 0 rgba(0,0,0,0.32), 0 9px 28px 8px rgba(0,0,0,0.2)', // 浅色阴影看不清
		colorPrimary: '#3c89e8',
		colorBgContainer: '#1f1f1f',
	},
};

const lightTheme: ThemeConfig = {
	algorithm: antdTheme.defaultAlgorithm,
	token: {
		colorPrimary: '#4096ff',
	},
};

type Props = PropsWithChildren<{
	fontFamily?: string;
	getPopupContainer?: ((triggerNode?: HTMLElement | undefined) => HTMLElement) | undefined;
}>;

// 因为还有大部分组件使用的是Antd的，所以需要保持主题一致
const AntdProvider: FC<Props> = ({ children, fontFamily, getPopupContainer }) => {
	const { local } = useTranslation();
	const { theme, containerRef } = useTheme();

	const normalTheme: ThemeConfig = {
		token: { fontFamily, borderRadius: 4 },
		components: { Modal: { marginXS: 12 } },
	};

	return (
		<StyleProvider hashPriority="high" transformers={[legacyLogicalPropertiesTransformer]}>
			<ConfigProvider
				locale={local === 'zh_cn' ? zh_CN : en_US}
				getPopupContainer={getPopupContainer ?? (() => containerRef.current ?? document.body)}
				theme={useMergeTheme(normalTheme, theme === 'light' ? lightTheme : darkTheme)}
			>
				<App component={false} notification={{ stack: false, maxCount: 5 }}>
					{children}
				</App>
			</ConfigProvider>
		</StyleProvider>
	);
};

export default AntdProvider;
