import * as ImplementCallbacks from './implement-callbacks.js';

export type Options = {
	id: string
};

ImplementCallbacks.implementations['hello-world'] = function(options: Options, containerElement: HTMLElement): void {
	const { id } = options;

	const element = document.getElementById(id);
	element?.addEventListener('mouseover', () => void element.style.setProperty('background-color', 'salmon'));
	element?.addEventListener('mouseout', () => void element.style.removeProperty('background-color'));
} as ImplementCallbacks.Callback;
