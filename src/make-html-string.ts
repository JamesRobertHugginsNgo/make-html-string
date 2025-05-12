type Nullable = undefined | null;
type Stringable = boolean | number | string;

export type Callback = (definition: Definition) => void;

export type ChildDefinition = Nullable | Stringable | Definition | ChildDefinition[];

export type Definition = {
	name: string,
	attributes?: { [key: string]: Nullable | Stringable },
	children?: ChildDefinition[],
	classList?: (Nullable | Stringable)[],
	styles?: { [key: string]: Nullable | Stringable },
	dataSet?: { [key: string]: Nullable | Stringable },
	isVoidElement?: boolean,
	isSelfClosing?: boolean,
	callback?: string | Callback
};

////////////////////////////////////////////////////////////////////////////////
// MAKE HTML STRING
////////////////////////////////////////////////////////////////////////////////

export type Options = {
	voidElements?: string[],
	isSelfClosing?: boolean
};

export const VOID_ELEMENTS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

export function makeChildrenHtmlString(children?: ChildDefinition[], options?: Options): string {
	if (children == null) {
		return '';
	}

	const htmlString: Stringable[] = [];
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
		classList,
		styles,
		dataSet,
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

	if (classList != null) {
		tag.push(`class="${classList.filter((className) => className != null).join(' ')}"`);
	}

	if (styles != null) {
		const values: string[] = [];
		for (const name in styles) {
			const value = styles[name];
			if (value == null) {
				continue;
			}
			values.push(`${name}: ${value};`);
		}
		tag.push(`style="${values.join(' ')}"`);
	}

	if (dataSet != null) {
		for (const name in dataSet) {
			const value = dataSet[name];
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
		return `<${tag.join(' ')}${isSelfClosing ? ' />' : '>'}`;
	}

	return `<${tag.join(' ')}>${makeChildrenHtmlString(children, options)}</${name}>`;
}

////////////////////////////////////////////////////////////////////////////////
// CALL CALLBACK
////////////////////////////////////////////////////////////////////////////////

export const callbacks: { [key: string]: Callback } = {};

export function callChildrenCallbacks(children?: ChildDefinition[]): void {
	if (children == null) {
		return;
	}

	for (const child of children) {
		if (Array.isArray(child)) {
			callChildrenCallbacks(child);
			continue;
		}
		if (child != null && typeof child === 'object' && 'name' in child) {
			callCallbacks(child);
			continue;
		}
	}
}

export function callCallbacks(definition: Definition): void {
	const {
		children,
		callback
	} = definition;

	if (children != null) {
		callChildrenCallbacks(children);
	}

	if (callback != null) {
		if (typeof callback === 'string') {
			callbacks[callback](definition);
		} else {
			callback(definition);
		}
	}
}
