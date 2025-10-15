import { colorMap } from './utils.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// == 定义 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
	try {
		const dataStr = fs.readFileSync(path.join(__dirname, './data3.json'), 'utf-8');
		const data = JSON.parse(dataStr) as Array<{ name: string; desc: string }>;
		// const data3 = data.map((item) => ({
		// 	name: item.name,
		// 	desc: item.desc.replace(/获得途径(.|\n)*/, ''),
		// }));
		// fs.writeFileSync(path.join(__dirname, './data3.json'), JSON.stringify(data3, null, 2));
		// process.stdout.write(data[1].desc);
		// const desc = data[0].desc;
		// const descList = desc.split('\n');
		// console.log(descList);
		// const cd = desc.match(/回合：(\d+)/)?.[1];
		// const effect = desc.match(/使用效果\n((.|\n)*?)\n\s*\n/)?.[1];
		// const special = desc.match(/特殊效果\n((.|\n)*?)(\n\s*\n|$)/)?.[1];
		// console.log('\n======================\n');
		// process.stdout.write(cd ?? 'xxx');
		// console.log('\n\n======================\n');
		// process.stdout.write(effect ?? 'xxx');
		// console.log('\n\n======================\n');
		// process.stdout.write(special ?? 'xxx');

		const data4 = data.map((item) => {
			const cd = item.desc.match(/回合：(\d+)/)?.[1];
			const descList = item.desc.split('\n');
			let effect = '';
			let effectStart = false;
			for (let i = 0; i < descList.length; i++) {
				const item2 = descList[i];
				if (effectStart === false && item2 === '使用效果') {
					effectStart = true;
				}
				if (effectStart === true) {
					if (item2 === '') {
						effectStart = false;
						break;
					}
					effect += item2;
				}
			}
			let special = '';
			let specialStart = false;
			for (let i = 0; i < descList.length; i++) {
				const item2 = descList[i];
				if (specialStart === false && item2 === '特殊效果') {
					specialStart = true;
				}
				if (specialStart === true) {
					if (item2 === '') {
						specialStart = false;
						break;
					}
					special += item2;
				}
			}
			return {
				cd,
				name: item.name,
				effect,
				special,
			};
		});
		fs.writeFileSync(path.join(__dirname, './data4.json'), JSON.stringify(data4, null, 2));
	} catch (e) {
		console.log(colorMap.red(String(e)));
	}
})();
