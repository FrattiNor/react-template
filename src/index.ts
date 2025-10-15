import { colorMap } from './utils.js';
import data from './data.txt';

(async () => {
	try {
		console.log(data);
		console.log(colorMap.cyan('SuposApp安装助手'));
		console.log(colorMap.cyan(`当前适配版本: V5.00.02.00-24062008-M\n`));
	} catch (e) {
		console.log(colorMap.red(String(e)));
	}
})();
