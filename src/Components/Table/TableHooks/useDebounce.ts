import { useRef } from 'react';

// 使用requestAnimationFrame防抖，一帧只执行一次
const useDebounce = <T extends () => void>() => {
	// 判断是否可以执行
	const canDoRef = useRef(true);
	// 被防抖阻挡的最后一次fn
	const lastFnRef = useRef<T | null>(null);
	// 当前一帧执行完，再执行一帧来执行最后一次的fn
	const endCallbackRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);

	const debounce = (fn: T) => {
		// 判断可以执行
		if (canDoRef.current === true) {
			// 设置参数阻止当前帧的后续执行
			canDoRef.current = false;
			// 当前是最后一次，删除之前的最后一次fn
			lastFnRef.current = null;
			// 如果之前的endCallback存在，干掉之前的endCallback
			if (endCallbackRef.current) cancelAnimationFrame(endCallbackRef.current);
			// 开始执行当前fn
			fn();
			// 等下一帧允许执行下一次fn
			requestAnimationFrame(() => {
				// 执行完毕，设置允许执行下一次fn
				canDoRef.current = true;
				// 开始执行endCallback
				endCallbackRef.current = requestAnimationFrame(() => {
					if (typeof lastFnRef.current === 'function') {
						lastFnRef.current();
						lastFnRef.current = null;
						endCallbackRef.current = null;
					}
				});
			});
		} else {
			// 设置当前fn为最后一次fn
			lastFnRef.current = fn;
		}
	};

	return { debounce };
};

export default useDebounce;
