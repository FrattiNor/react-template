type PromiseFn = (...args: any[]) => Promise<any>;

const delayFunc = <F extends PromiseFn>(func: F, delay?: number): F => {
	if (typeof delay !== 'number' || delay <= 0) {
		return func;
	}

	// 对失败的情况不做处理
	const newFn = async (...args: Parameters<F>) => {
		const startTime = new Date().getTime();
		const res = await func(...args);
		const endTime = new Date().getTime();
		// 剩余时间
		const remainder = delay - (endTime - startTime);
		if (remainder > 0) {
			await new Promise((resolve) => {
				setTimeout(resolve, remainder);
			});
		}
		return res;
	};

	return newFn as F;
};

export default delayFunc;
