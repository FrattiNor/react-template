import { useEffect, useMemo, useState, type FC } from 'react';

// 避免触发一些事件导致mouse无法触发
function pauseEvent(e: Event) {
	if (e.stopPropagation) e.stopPropagation();
	if (e.preventDefault) e.preventDefault();
	e.cancelBubble = true;
	e.returnValue = false;
	return false;
}

type Props = {
	min: number;
	max: number;
	width: number;
	value: number;
	label: string;
	onChange: (v: number) => void;
};

const Slider: FC<Props> = ({ label, min, max, value, width, onChange }) => {
	const left = useMemo(() => {
		const total = max - min;
		const trueValue = Math.max(min, Math.min(max, value));
		return (trueValue - min) / total;
	}, [min, max, value]);

	const [start, setStart] = useState<{ pageX: number; value: number } | null>(null);

	useEffect(() => {
		if (start) {
			const mouseUp = () => {
				setStart(null);
			};
			const mouseMove = (e: MouseEvent) => {
				pauseEvent(e);
				const totalSize = width;
				const moveX = e.pageX - start.pageX;
				const per = moveX / totalSize;
				const nextValue = start.value + (max - min) * per;
				onChange(Math.round(Math.max(min, Math.min(max, nextValue))));
			};

			document.addEventListener('mouseup', mouseUp);
			document.addEventListener('mousemove', mouseMove);

			return () => {
				document.removeEventListener('mouseup', mouseUp);
				document.removeEventListener('mousemove', mouseMove);
			};
		}
	}, [start, width, max, min, onChange]);

	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: 16, userSelect: 'none' }}>
			<div style={{ width: 100, borderRadius: 4, textAlign: 'right' }}>{label}:</div>
			<div style={{ width: 50, textAlign: 'right' }}>{min}</div>
			<div style={{ width, height: 6, background: 'rgba(0,0,0,0.05)', borderRadius: 3, position: 'relative' }}>
				<div
					onMouseDown={(e) => setStart({ pageX: e.pageX, value })}
					style={{
						top: -2,
						width: 10,
						height: 10,
						borderRadius: 5,
						cursor: 'pointer',
						position: 'absolute',
						display: 'inline-block',
						background: '#1677ff',
						left: `calc(${left * 100}% - 5px)`,
					}}
				/>
			</div>
			<div style={{ width: 50, textAlign: 'left' }}>{max}</div>
			<div style={{ border: '1px solid rgba(0,0,0,0.8)', width: 50, borderRadius: 4, textAlign: 'center' }}>{value}</div>
		</div>
	);
};

export default Slider;
