// ==
// CONSTANT: HTML VOID ELEMENTS
// ==

export const HTML_VOID_ELEMENTS = [
	'area',
	'base',
	'br',
	'col',
	'embed',
	'hr',
	'img',
	'input',
	'link',
	'meta',
	'param',
	'source',
	'track',
	'wbr'
];

// ==
// FUNCTION: MAKE HTML STRING
// ==

export default function makeHtmlString(
	{
		name = 'div',
		attributes,
		children,
		selfClosing = false,
		voidElements = HTML_VOID_ELEMENTS
	} = {}
) {
	const openTag = [name];
	if (attributes) {
		for (const key in attributes) {
			const value = attributes[key];
			if (value != null) {
				if (value === '') {
					openTag.push(key);
				} else {
					openTag.push(`${key}="${value}"`);
				}
			}
		}
	}

	const htmlArray = ['<', openTag.join(' ')];
	if (voidElements.includes(name)) {
		if (selfClosing) {
			htmlArray.push(' />');
		} else {
			htmlArray.push('>');
		}
	} else {
		const childrenArray = [];
		if (children) {
			const length = children.length;
			for (let index = 0; index < length; index++) {
				const child = children[index];
				if (child != null) {
					if (typeof child !== 'object') {
						childrenArray.push(child);
					} else {
						childrenArray.push(makeHtmlString({
							selfClosing,
							voidElements,
							...child
						}));
					}
				}
			}
		}
		if (childrenArray.length === 0) {
			if (selfClosing) {
				htmlArray.push(' />');
			} else {
				htmlArray.push('></', name, '>');
			}
		} else {
			htmlArray.push('>', ...childrenArray, '</', name, '>');
		}
	}

	return htmlArray.join('');
}
