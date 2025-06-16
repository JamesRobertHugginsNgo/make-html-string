const VOID_ELEMENTS = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);

type Attributes = Record<string, string>;

type Child = Definition | string;

export interface Definition {
	name: string,
	attributes?: Attributes,
	children?: Child[],
	isVoidElement?: boolean,
	callback?: string
};

interface Options {
	voidElements?: Set<string>,
	isSelfClosing?: boolean
};

export default function makeHtmlString(definition: Definition, options: Options = {}): string {
	const {
		voidElements = VOID_ELEMENTS,
		isSelfClosing = false
	} = options;

	const {
		name,
		attributes,
		children,
		isVoidElement = voidElements.has(name)
	} = definition;

	const mappedAttributes: string[] = [];
	if (attributes !== undefined) {
		for (const name in attributes) {
			mappedAttributes.push(`${name}="${attributes[name]}"`);
		}
	}

	if (isVoidElement) {
		return `<${[name, ...mappedAttributes].join(' ')}${!isSelfClosing ? '' : ' /'}>`;
	}

	const mappedChildren: string[] = [];
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

export type Stringable = string | number | boolean;

type Nullable = null | undefined;

type RawAttributes = Record<string, Stringable | Nullable>;

export function cleanupAttributes(rawAttributes: RawAttributes): Attributes {
	const attributes: Attributes = {};

	for (const name in rawAttributes) {
		const value = rawAttributes[name];
		if (value == null) continue;

		attributes[name] = typeof value !== 'string' ? String(value) : value;
	};

	return attributes;
}

type RawChild = Definition | Stringable | Nullable | RawChild[];

export function cleanupChildren(rawChildren: RawChild[]): Child[] {
	const children: Child[] = [];

	const processRawChildren = (rawChildren: RawChild[]): void => {
		for (const child of rawChildren) {
			if (child == null) continue;

			if (Array.isArray(child)) {
				processRawChildren(child);
				continue;
			}

			children.push(typeof child !== 'object' && typeof child !== 'string' ? String(child) : child);
		}
	}
	processRawChildren(rawChildren);

	return children;
}

type Callback = (definition: Definition, containerElement?: HTMLElement) => void;

export const callbackRegistry: Record<string, Callback> = {};

export function processCallbacks(definition: Definition, containerElement?: HTMLElement): void {
	const {
		children,
		callback
	} = definition;

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

export function getElementByDefinition(definition: Definition, containerElement?: HTMLElement): HTMLElement | null {
	const { attributes } = definition;
	if (attributes === undefined) return null;

	const { id } = attributes;
	if (id === undefined) return null;

	if (containerElement !== undefined) {
		return containerElement.querySelector(`#${id}`);
	}

	return document.getElementById(id);
}
