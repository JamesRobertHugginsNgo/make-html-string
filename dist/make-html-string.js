const VOID_ELEMENTS = new Set([
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
	'wbr',
]);
export default function makeHtmlString(definition, options = {}) {
	const { voidElements = VOID_ELEMENTS, isSelfClosing = false } = options;
	const {
		name,
		attributes,
		children,
		isVoidElement = voidElements.has(name),
	} = definition;
	const mappedAttributes = [];
	if (attributes !== undefined) {
		for (const name in attributes) {
			mappedAttributes.push(`${name}="${attributes[name]}"`);
		}
	}
	if (isVoidElement) {
		return `<${[name, ...mappedAttributes].join(' ')}${!isSelfClosing ? '' : ' /'}>`;
	}
	const mappedChildren = [];
	if (children !== undefined) {
		for (const child of children) {
			if (typeof child === 'object') {
				mappedChildren.push(makeHtmlString(child, options));
				continue;
			}
			mappedChildren.push(child);
		}
	}
	return `<${[name, ...mappedAttributes].join(' ')}>${mappedChildren.join('')}</${name}>`;
}
export function cleanupAttributes(rawAttributes) {
	const attributes = {};
	for (const name in rawAttributes) {
		const value = rawAttributes[name];
		if (value == null) continue;
		attributes[name] = typeof value !== 'string' ? String(value) : value;
	}
	return attributes;
}
export function cleanupChildren(rawChildren) {
	const children = [];
	const processRawChildren = (rawChildren) => {
		for (const child of rawChildren) {
			if (child == null) continue;
			if (Array.isArray(child)) {
				processRawChildren(child);
				continue;
			}
			children.push(
				typeof child !== 'object' && typeof child !== 'string'
					? String(child)
					: child,
			);
		}
	};
	processRawChildren(rawChildren);
	return children;
}
export const callbackRegistry = {};
export function processCallbacks(definition, containerElement) {
	const { children, callback } = definition;
	if (children !== undefined) {
		for (const child of children) {
			if (typeof child === 'string') continue;
			processCallbacks(child);
		}
	}
	if (callback === undefined) return;
	if (!(callback in callbackRegistry)) throw 'Error';
	callbackRegistry[callback](definition, containerElement);
}
export function getElementByDefinition(definition, containerElement) {
	const { attributes } = definition;
	if (attributes === undefined) return null;
	const { id } = attributes;
	if (id === undefined) return null;
	if (containerElement !== undefined) {
		return containerElement.querySelector(`#${id}`);
	}
	return document.getElementById(id);
}
