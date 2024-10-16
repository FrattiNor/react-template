import { useEffect, useRef, type FC } from 'react';

import { autoSetTextareaHeight } from './calcTextareaHeight';
import styles from '../../../../index.module.less';

type Props = {
	defaultValue: string;
	exitEdit: (nextValue: string) => void;
};

const CellTextArea: FC<Props> = ({ defaultValue, exitEdit }) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// 挂载后触发focus
	useEffect(() => {
		if (textareaRef.current) {
			autoSetTextareaHeight(textareaRef.current);
			textareaRef.current.focus({ preventScroll: true });
			textareaRef.current.select();
		}
	}, []);

	return (
		<div className={styles['body-cell-editor-textarea-inner']}>
			<textarea
				ref={textareaRef}
				defaultValue={defaultValue}
				onClick={(e) => e.stopPropagation()}
				onBlur={(e) => exitEdit(e.target.value)}
				className={styles['body-cell-editor-textarea']}
				onChange={(e) => autoSetTextareaHeight(e.target as HTMLTextAreaElement)}
			/>
		</div>
	);
};

export default CellTextArea;
