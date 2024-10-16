import { ESLint } from 'eslint';

const removeIgnoredFiles = async (files) => {
	const eslint = new ESLint();
	const isIgnored = await Promise.all(
		files.map((file) => {
			return eslint.isPathIgnored(file);
		}),
	);
	const filteredFiles = files.filter((_, i) => !isIgnored[i]);
	return filteredFiles.join(' ');
};

export default {
	'**/*.(j|t)s?(x)': async (files) => {
		const filesToLint = await removeIgnoredFiles(files);
		return [`eslint --fix --max-warnings=0 ${filesToLint}`];
	},
	'*': ['prettier --write --ignore-unknown'],
};
