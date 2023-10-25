/**
 * A array of HTML names for void elements.
 * @type {[string]}
 */
export const htmlVoidElements = [
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

/**
 * Returns a valid HTML tag as a string.
 * @param {any} [definition={}]
 * @param {object} [options={}]
 * @param {object} [options.selfClosing=false]
 * @param {[string]} [options.voidElements=htmlVoidElements]
 * @returns {string}
 */
export default function makeHtmlString(definition = {}, options = {}) {
	if (definition == null) {
		return '';
	}

	if (typeof definition === 'object') {
		if (Array.isArray(definition)) {
			const {
				selfClosing = false,
				voidElements = htmlVoidElements
			} = options;

			const elementArray = [];

			const length = definition.length;
			for (let index = 0; index < length; index++) {
				const value = definition[index];
				if (value == null) continue;

				elementArray.push(makeHtmlString(value, { selfClosing, voidElements }));
			}

			return elementArray.join('');
		}

		let {
			selfClosing = false,
			voidElements = htmlVoidElements
		} = options;

		const {
			name = 'div',
			attributes,
			children,
			selfClosing: selfClosingDefinition,
			voidElements: voidElementsDefinition
		} = definition;

		if (selfClosingDefinition !== undefined) {
			selfClosing = selfClosingDefinition;
		}
		if (voidElementsDefinition !== undefined) {
			voidElements = voidElementsDefinition;
		}

		const elementArray = ['<'];

		const tagArray = [name];
		if (attributes) {
			for (const key in attributes) {
				const value = attributes[key];
				if (value == null) continue;

				if (value === '') {
					tagArray.push(key);
					continue;
				}

				tagArray.push(`${key}="${value}"`);
			}
		}
		elementArray.push(tagArray.join(' '));

		if (!voidElements || !voidElements.includes(name)) {
			if (children == null) {
				if (selfClosing) {
					elementArray.push(' />');
				} else {
					elementArray.push('></', name, '>');
				}
			} else {
				elementArray.push(
					'>',
					makeHtmlString(children, { selfClosing, voidElements }),
					'</', name, '>'
				);
			}
		} else {
			elementArray.push('>');
		}

		return elementArray.join('');
	}

	return String(definition);
}

/**
 * Returns a valid XML tag as a string.
 * @param {any} [definition={}]
 * @param {object} [options={}]
 * @param {object} [options.selfClosing=true]
 * @param {[string]} [options.voidElements=null]
 * @returns {string}
 */
export function makeXmlString(definition = {}, options = {}) {
	const {
		selfClosing = true,
		voidElements = null
	} = options;
	return makeHtmlString(definition, { selfClosing, voidElements });
}
