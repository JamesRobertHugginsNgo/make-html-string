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
type RawAttributes = Record<
	string,
	string | number | boolean | null | undefined
>;
export declare function cleanupAttributes(
	rawAttributes: RawAttributes,
): Attributes;
export declare function makeClassAttributes(
	classList: (string | number | boolean | null | undefined)[],
): Attributes;
export declare function makeStyleAttribute(
	styles: Record<string, string | number | boolean | null | undefined>,
): Attributes;
export declare function makeDataAttribute(
	data: Record<string, string | number | boolean | null | undefined>,
): Attributes;
type RawChild =
	| Definition
	| string
	| number
	| boolean
	| null
	| undefined
	| RawChild[];
export declare function cleanupChildren(rawChildren: RawChild[]): Child[];
type Callback = (definition: Definition) => void;
export declare const callbackRegistry: Record<string, Callback>;
export declare function processCallbacks(definition: Definition): void;
export {};
