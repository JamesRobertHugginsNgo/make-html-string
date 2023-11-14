/**
 * A array of HTML names for void elements.
 * @type {[string]}
 */
export const HTML_VOID_ELEMENTS
	= ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

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
		const {
			selfClosing = false,
			voidElements = HTML_VOID_ELEMENTS
		} = options;

		if (Array.isArray(definition)) {
			const elementArray = [];

			const length = definition.length;
			for (let index = 0; index < length; index++) {
				const value = definition[index];
				if (value == null) continue;

				elementArray.push(makeHtmlString(value, { selfClosing, voidElements }));
			}

			return elementArray.join('');
		}

		const {
			name = 'div',
			attributes,
			children,
			selfClosing: selfClosingDefinition = selfClosing,
			voidElements: voidElementsDefinition = voidElements
		} = definition;

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

		if (!voidElementsDefinition || !voidElementsDefinition.includes(name)) {
			if (children == null) {
				if (selfClosingDefinition) {
					elementArray.push(' />');
				} else {
					elementArray.push('></', name, '>');
				}
			} else {
				elementArray.push(
					'>',
					makeHtmlString(children, {
						selfClosing: selfClosingDefinition,
						voidElements: voidElementsDefinition
					}),
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
