import type * as ImplementCallbacks from './implement-callbacks.js';
import type * as MakeHtmlString from './make-html-string.js';

import './make-hello-world-implementation.js';

export type Definition = {
	greeting: string,
	message: string
};

let idCounter = 0;

export default function makeHelloWorldDefinitions(definition: Definition): [MakeHtmlString.Definition, ImplementCallbacks.Definition] {
	const {
		greeting,
		message
	} = definition;

	const id = `hello-world-${idCounter++}`;

	return [
		{
			name: 'p',
			attributes: { id },
			children: [
				greeting,
				' ',
				message
			]
		},
		{
			name: 'hello-world',
			options: { id }
		}
	]
}
