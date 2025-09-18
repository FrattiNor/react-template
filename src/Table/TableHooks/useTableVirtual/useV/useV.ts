import { useVirtualizer, type PartialKeys, type VirtualizerOptions } from '@tanstack/react-virtual';

import { measureElement } from './utils';

const useV = (options: PartialKeys<VirtualizerOptions<Element, Element>, 'observeElementRect' | 'observeElementOffset' | 'scrollToFn'>) => {
	const virtualizer = useVirtualizer({
		measureElement: measureElement as any,
		...options,
		scrollToFn: () => {},
	});

	return virtualizer;
};

export default useV;
