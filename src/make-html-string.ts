export const VOID_ELEMENTS: string[] = [
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

export type ChildDefinition =
	undefined |
	null |
	boolean |
	number |
	string |
	Definition |
	ChildDefinition[];

export type BaseDefinition = {
	voidElements?: string[],
	isSelfClosing?: boolean
};

export function makeChildrenHtmlString(children: ChildDefinition[], {
	voidElements,
	isSelfClosing
}: BaseDefinition = {}): string {
	const html: any[] = [];

	for (const child of children) {
		if (child == null) {
			continue;
		}
		if (Array.isArray(child)) {
			html.push(makeChildrenHtmlString(child, {
				voidElements,
				isSelfClosing
			}));
			continue;
		}
		if (typeof child === 'object' && 'name' in child) {
			html.push(makeHtmlString({
				voidElements,
				isSelfClosing,
				...child
			}));
			continue;
		}
		html.push(child);
	}

	return html.join('');
}

export type Definition = {
	name: string,
	attributes?: {
		[key: string]:
		undefined |
		null |
		boolean |
		number |
		string
	},
	children?: ChildDefinition[],
	isVoidElement?: boolean
} & BaseDefinition;

export default function makeHtmlString({
	name,
	attributes,
	children,
	voidElements = VOID_ELEMENTS,
	isVoidElement = voidElements.includes(name),
	isSelfClosing = false
}: Definition): string {
	const tag = [name];
	if (attributes) {
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
		return [
			'<',
			tag.join(' '),
			isSelfClosing
				? ' />'
				: '>'
		].join('');
	}

	return [
		'<',
		tag.join(' '),
		'>',
		children == null
			? ''
			: makeChildrenHtmlString(children, {
				voidElements,
				isSelfClosing
			}),
		'</',
		name,
		'>'
	].join('');
}
