import { useMemo } from 'react';

import type { TableProps } from '../../TableTypes/typeProps';

export const useVirtualConf = (direction: 'h' | 'v', virtual: TableProps<any>['virtual'], count: number) => {
	const _conf = (() => {
		switch (direction) {
			case 'h':
				return virtual?.horizontalVirtual;
			case 'v':
				return virtual?.verticalVirtual;
			default:
				return undefined;
		}
	})();

	const _enabled = (() => {
		if (typeof _conf === 'boolean') return _conf;
		if (typeof _conf === 'number') return _conf <= count;
		if (typeof _conf === 'undefined') return true;
		if (typeof _conf === 'object') {
			if (typeof _conf.enabled === 'boolean') return _conf.enabled;
			if (typeof _conf.enabled === 'number') return _conf.enabled <= count;
			if (typeof _conf.enabled === 'undefined') return true;
		}
		return false;
	})();

	const _virtualFlushSync = (() => {
		if (typeof _conf === 'boolean') return true;
		if (typeof _conf === 'number') return true;
		if (typeof _conf === 'undefined') return true;
		if (typeof _conf === 'object') {
			if (typeof _conf.virtualFlushSync === 'boolean') return _conf.virtualFlushSync;
			if (typeof _conf.virtualFlushSync === 'undefined') return true;
		}
		return false;
	})();

	const enabled = useMemo(() => _enabled, [_enabled]);

	const virtualFlushSync = useMemo(() => _virtualFlushSync, [_virtualFlushSync]);

	return { enabled, virtualFlushSync };
};
