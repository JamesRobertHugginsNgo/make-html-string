export const VOID_ELEMENTS: string[] = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

export type ChildDefinition = undefined | null | boolean | number | string | Definition | ChildDefinition[];

export type Definition = {
	name: string,
	attributes?: { [key: string]: undefined | null | boolean | number | string },
	children?: ChildDefinition[],
	isVoidElement?: boolean,
	isSelfClosing?: boolean
};

export type Options = {
	voidElements?: string[],
	isSelfClosing?: boolean
};

export function makeChildrenHtmlString(children: ChildDefinition[], options: Options = {}): string {
	const htmlString: (boolean | number | string)[] = [];
	for (const child of children) {
		if (child == null) {
			continue;
		}
		if (Array.isArray(child)) {
			htmlString.push(makeChildrenHtmlString(child, options));
			continue;
		}
		if (typeof child === 'object' && 'name' in child) {
			htmlString.push(makeHtmlString(child, options));
			continue;
		}
		htmlString.push(child);
	}
	return htmlString.join('');
}

export default function makeHtmlString(definition: Definition, options: Options = {}): string {
	const {
		voidElements = VOID_ELEMENTS,
		isSelfClosing: isSelfClosingOption = false
	} = options;

	const {
		name,
		attributes,
		children,
		isVoidElement = voidElements.includes(name),
		isSelfClosing = isSelfClosingOption
	} = definition;

	const tag: string[] = [name];
	if (attributes != null) {
		for (const name in attributes) {
			const value = attributes[name];
			if (value == null) {
				continue;
			}
			if (value === '') {
				tag.push(name);
				continue;
			}
			tag.push(`${name}="${value}"`);
		}
	}

	if (isVoidElement) {
		return `<${tag.join(' ')}${isSelfClosing ? ' />' : '>'}`;
	}

	const childrenHtmlString = children == null ? '' : makeChildrenHtmlString(children, options);
	return `<${tag.join(' ')}>${childrenHtmlString}</${name}>`;
}
