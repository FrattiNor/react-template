import { type FC, Fragment, useMemo } from 'react';

import { regExpMatch, regExpSplit } from '@react/utils';

type Props = {
	children: string;
	keyword?: string;
	ignoreLowUp?: boolean;
	highlightColor?: string;
};

const Highlight: FC<Props> = ({ keyword: _keyword, highlightColor, children, ignoreLowUp = true }) => {
	const keyword = _keyword?.trim();

	return useMemo(() => {
		if (!keyword) return children;
		if (typeof children !== 'string') return children;

		const textSplit = regExpSplit(children, keyword, ignoreLowUp ? 'ig' : 'g');
		const textMatch = regExpMatch(children, keyword, ignoreLowUp ? 'ig' : 'g');

		return textSplit.map((text, i) => {
			const matchText = textMatch?.[i];

			return (
				<Fragment key={i}>
					{text && <span>{text}</span>}
					{matchText && <span style={{ color: highlightColor ?? 'var(--theme-danger)', fontWeight: 800 }}>{matchText}</span>}
				</Fragment>
			);
		});
	}, [keyword, highlightColor, children]);
};

export default Highlight;
