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

export function makeChildrenHtmlString(children?: ChildDefinition[], {
	voidElements,
	isSelfClosing
}: BaseDefinition = {}): string {
	if (children == null) {
		return '';
	}

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

export type callbackOptions = { [key: string]: any };

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
	classList?: any[],
	styles?: { [key: string]: any },
	dataset?: { [key: string]: any },
	children?: ChildDefinition[],
	callback?: string,
	callbackOptions?: callbackOptions,
	isVoidElement?: boolean
} & BaseDefinition;

export default function makeHtmlString({
	name,
	attributes,
	classList,
	styles,
	dataset,
	children,
	voidElements = VOID_ELEMENTS,
	isVoidElement = voidElements.includes(name),
	isSelfClosing = false
}: Definition): string {
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

	if (classList != null) {
		const classListValues = classList
			.filter((className) => className != null);
		tag.push(`class="${classListValues.join(' ')}"`);
	}

	if (styles != null) {
		const styleValues = Object.keys(styles)
			.filter((property) => styles[property] != null)
			.map((property) => `${property}: ${styles[property]};`);
		tag.push(`style="${styleValues.join(' ')}"`);
	}

	if (dataset != null) {
		for (const name in dataset) {
			const value = dataset[name];
			if (value == null) {
				continue;
			}
			if (value === '') {
				tag.push(`data-${name}`);
				continue;
			}
			tag.push(`data-${name}="${value}"`);
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
		makeChildrenHtmlString(children, {
			voidElements,
			isSelfClosing
		}),
		'</',
		name,
		'>'
	].join('');
}

export type CallbackListItem = {
	name: string,
	options: callbackOptions | Definition
};

export function getChildrenCallbackList(children?: ChildDefinition[]): CallbackListItem[] {
	if (children == null) {
		return [];
	}

	const callbackList: CallbackListItem[] = [];
	for (const child of children) {
		if (Array.isArray(child)) {
			callbackList.push(...getChildrenCallbackList(child));
			continue;
		}
		if (child == null || typeof child !== 'object' || !('name' in child)) {
			continue;
		}
		callbackList.push(...getCallbackList(child));
	}
	return callbackList;
}

export function getCallbackList(definition: Definition): CallbackListItem[] {
	const { children, callback, callbackOptions } = definition;

	const callbackList: CallbackListItem[] = [];
	callbackList.push(...getChildrenCallbackList(children));
	if (callback != null) {
		callbackList.push({
			name: callback,
			options: callbackOptions ?? definition
		});
	}
	return callbackList;
}

export type Callbacks = {
	[key: string]: (definition: callbackOptions | Definition) => void
};

export function callCallbackList(callbackList: CallbackListItem[], callbacks: Callbacks): void {
	for (const callbackListItem of callbackList) {
		const { name, options } = callbackListItem;
		callbacks[name](options);
	}
}

export function callCallbacks(definition: Definition, callbacks: Callbacks): void {
	const callbackList: CallbackListItem[] = getCallbackList(definition);
	callCallbackList(callbackList, callbacks);
}
