type Attributes = Record<string, string>;
type Child = Definition | string;
export interface Definition {
	name: string;
	attributes?: Attributes;
	children?: Child[];
	isVoidElement?: boolean;
	callback?: string;
}
interface Options {
	voidElements?: Set<string>;
	isSelfClosing?: boolean;
}
export default function makeHtmlString(
	definition: Definition,
	options?: Options,
): string;
export type Stringable = string | number | boolean;
type Nullable = null | undefined;
type RawAttributes = Record<string, Stringable | Nullable>;
export declare function cleanupAttributes(
	rawAttributes: RawAttributes,
): Attributes;
type RawChild = Definition | Stringable | Nullable | RawChild[];
export declare function cleanupChildren(rawChildren: RawChild[]): Child[];
type Callback = (
	definition: Definition,
	containerElement?: HTMLElement,
) => void;
export declare const callbackRegistry: Record<string, Callback>;
export declare function processCallbacks(
	definition: Definition,
	containerElement?: HTMLElement,
): void;
export declare function getElementByDefinition(
	definition: Definition,
	containerElement?: HTMLElement,
): HTMLElement | null;
export {};
