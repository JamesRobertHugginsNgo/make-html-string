export default function makeHtmlString(definition = {}) {
	if (Array.isArray(definition)) {
		const elementArray = [];

		const length = definition.length;
		for (let index = 0; index < length; index++) {
			const value = makeHtmlString(definition[index]);
			if (value == null) continue;

			elementArray.push(value);
		}

		return elementArray.join('');
	}

	if (definition && typeof definition === 'object') {
		const {
			name = 'div',
			attributes,
			children
		} = definition;

		const elementArray = ['<'];

		const tagArray = [name];

		if (attributes) {
			for (const key in attributes) {
				const value = attributes[key];
				if (value == null) {
					continue;
				}

				if (value === '') {
					tagArray.push(key);
					continue;
				}

				tagArray.push(`${key}="${value}"`);
			}
		}

		elementArray.push(tagArray.join(' '));

		elementArray.push('>');

		if (children != null) {
			elementArray.push(makeHtmlString(children));
		}

		if (children || name === 'div') {
			elementArray.push('</', name, '>');
		}

		return elementArray.join('');
	}

	return String(definition);
}
