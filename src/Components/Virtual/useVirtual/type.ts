import type { VirtualProps } from '../Core/type';

export type UseVirtualProps = Omit<VirtualProps, 'onRangeChange' | 'onTotalSizeChange'> & {
	horizontal?: boolean;
	syncUpdate?: boolean;
};
