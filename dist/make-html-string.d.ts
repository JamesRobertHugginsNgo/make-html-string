export declare const VOID_ELEMENTS: string[];
export type ChildDefinition = undefined | null | boolean | number | string | Definition | ChildDefinition[];
export type Definition = {
    name: string;
    attributes?: {
        [key: string]: undefined | null | boolean | number | string;
    };
    children?: ChildDefinition[];
    isVoidElement?: boolean;
    isSelfClosing?: boolean;
};
export type Options = {
    voidElements?: string[];
    isSelfClosing?: boolean;
};
export declare function makeChildrenHtmlString(children: ChildDefinition[], options?: Options): string;
export default function makeHtmlString(definition: Definition, options?: Options): string;
