import * as MakeHtmlString from './make-html-string.js';

MakeHtmlString.callbacks['def-facto'] = (definition) => void console.log('DEF FACTO', definition);

export type Definition = {
	greeting: string,
	message: string
};

export default function defFacto(definition: Definition): MakeHtmlString.Definition {
	const {
		greeting,
		message
	} = definition;

	return {
		name: 'div',
		attributes: { id: 'div-id' },
		classList: ['div-class'],
		styles: { 'color': 'darkgrey' },
		children: [
			greeting,
			[
				' ',
				{
					name: 'span',
					dataSet: { 'test': true },
					children: [message],
					callback: 'def-facto'
				}
			]
		],
		callback: (definition) => void console.log('CALLBACK', definition)
	}
}
