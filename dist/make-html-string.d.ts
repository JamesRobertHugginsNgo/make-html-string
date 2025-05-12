type Nullable = undefined | null;
type Stringable = boolean | number | string;
export type Callback = (definition: Definition) => void;
export type ChildDefinition =
	| Nullable
	| Stringable
	| Definition
	| ChildDefinition[];
export type Definition = {
	name: string;
	attributes?: {
		[key: string]: Nullable | Stringable;
	};
	children?: ChildDefinition[];
	classList?: (Nullable | Stringable)[];
	styles?: {
		[key: string]: Nullable | Stringable;
	};
	dataSet?: {
		[key: string]: Nullable | Stringable;
	};
	isVoidElement?: boolean;
	isSelfClosing?: boolean;
	callback?: string | Callback;
};
export type Options = {
	voidElements?: string[];
	isSelfClosing?: boolean;
};
export declare const VOID_ELEMENTS: string[];
export declare function makeChildrenHtmlString(
	children?: ChildDefinition[],
	options?: Options,
): string;
export default function makeHtmlString(
	definition: Definition,
	options?: Options,
): string;
export declare const callbacks: {
	[key: string]: Callback;
};
export declare function callChildrenCallbacks(
	children?: ChildDefinition[],
): void;
export declare function callCallbacks(definition: Definition): void;
export {};
