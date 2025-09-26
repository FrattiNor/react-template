import { type Modifier, type ClientRect } from '@dnd-kit/core';

import type { Transform } from '@dnd-kit/utilities';

function restrictToBoundingRect(transform: Transform, rect: ClientRect, boundingRect: ClientRect): Transform {
	const value = {
		...transform,
	};

	if (rect.top + transform.y <= boundingRect.top) {
		value.y = boundingRect.top - rect.top;
	} else if (rect.bottom + transform.y >= boundingRect.top + boundingRect.height) {
		value.y = boundingRect.top + boundingRect.height - rect.bottom;
	}

	if (rect.left + transform.x <= boundingRect.left) {
		value.x = boundingRect.left - rect.left;
	} else if (rect.right + transform.x >= boundingRect.left + boundingRect.width) {
		value.x = boundingRect.left + boundingRect.width - rect.right;
	}

	return value;
}

export function customModifier({ bodyRef }: { bodyRef: React.RefObject<HTMLDivElement | null> }): Modifier {
	return ({ draggingNodeRect, transform }) => {
		const _transform = { ...transform, x: 0 };
		if (!draggingNodeRect) return _transform;
		if (!bodyRef.current) return _transform;
		const firstScrollableAncestorRect = bodyRef.current.getBoundingClientRect();
		firstScrollableAncestorRect.height = bodyRef.current.clientHeight;
		return restrictToBoundingRect(_transform, draggingNodeRect, firstScrollableAncestorRect);
	};
}
