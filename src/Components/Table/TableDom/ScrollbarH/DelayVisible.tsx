import { memo, useEffect, useRef, useState, type FC, type PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
	visible: boolean;
	delayTime: number;
}>;

const DelayVisible: FC<Props> = ({ visible, delayTime, children }) => {
	const [show, setShow] = useState(() => visible);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		timeoutRef.current = setTimeout(() => {
			setShow(visible);
		}, delayTime);

		return () => {
			if (timeoutRef.current !== null) clearTimeout(timeoutRef.current);
		};
	}, [visible]);

	if (show) return children;
	return null;
};

export default memo(DelayVisible) as typeof DelayVisible;
