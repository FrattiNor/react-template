import { type PartialKeys, type VirtualizerOptions } from '@tanstack/react-virtual';

import { useVirtualizer } from './base';
import { measureElement } from './utils';

const useV = (
	options: PartialKeys<VirtualizerOptions<Element, Element>, 'observeElementRect' | 'observeElementOffset' | 'scrollToFn'> & {
		virtualFlushSync?: boolean;
	},
) => {
	const virtualizer = useVirtualizer({
		measureElement: measureElement as any,
		...options,
		scrollToFn: () => {},
	});

	return virtualizer;
};

export default useV;
