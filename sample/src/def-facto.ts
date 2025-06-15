import * as MakeHtmlString from '../../dist/make-html-string.js';

type Definition = {
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
		attributes: {
			id: 'div-id',

			...MakeHtmlString.makeClassAttributes(['div-class']),
			...MakeHtmlString.makeStyleAttribute({
				'color': 'darkgrey'
			})
		},
		children: MakeHtmlString.cleanupChildren([
			greeting,
			[
				' ',
				{
					name: 'span',
					attributes: {
						...MakeHtmlString.makeDataAttribute({
							test: true
						})
					},
					children: [message],
					callback: 'def-facto'
				}
			]
		]),
		callback: 'def-facto'
	}
}

MakeHtmlString.callbackRegistry['def-facto'] = (definition) => void console.log('DEF FACTO CALLBACK', definition);
