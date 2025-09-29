import { getProps, getInstanceProps } from './propsAreEqual';
import { getHighlightChunks } from '../../../../../TableUtils/highlight';

import type { TableDataItem, TableInstance } from '../../../../../TableTypes/type';

export type Props<T extends TableDataItem> = {
	instance: TableInstance<T>;
	columnHighlightKeywords: string[] | undefined;
	children: string;
};

const HighlightText = <T extends TableDataItem>(props: Props<T>) => {
	const { children, columnHighlightKeywords } = getProps(props);
	const { trim, autoEscape, caseSensitive, highlightKeywords } = getInstanceProps(props);
	const mergeKeywords = (() => {
		const keywords = [];
		if (Array.isArray(highlightKeywords)) keywords.push(...highlightKeywords);
		if (Array.isArray(columnHighlightKeywords)) keywords.push(...columnHighlightKeywords);
		return keywords;
	})();
	const chunks = getHighlightChunks({ trim, autoEscape, caseSensitive })(mergeKeywords)(children);

	return (
		<span>
			{chunks.map((chunk, index) => {
				const { end, highlight, start } = chunk;
				const text = children.substring(start, end);
				return (
					<span
						key={index}
						style={{ color: highlight ? 'var(--table-highlight-color)' : undefined, fontWeight: highlight ? 600 : undefined }}
					>
						{text}
					</span>
				);
			})}
		</span>
	);
};

export default HighlightText;
