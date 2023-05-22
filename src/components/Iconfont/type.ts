import { CSSProperties, SVGProps } from 'react';
import iconfontJSON from './iconfontJson.js';

type FontClass = (typeof iconfontJSON.glyphs)[number]['font_class'];

export type Props = {
    icon: FontClass;
    className?: string;
    style?: CSSProperties;
    onClick?: SVGProps<SVGSVGElement>['onClick'];
};
