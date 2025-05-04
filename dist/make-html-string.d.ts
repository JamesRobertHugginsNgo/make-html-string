export declare const VOID_ELEMENTS: string[];
export type ChildDefinition = undefined | null | boolean | number | string | Definition | ChildDefinition[];
export type BaseDefinition = {
    voidElements?: string[];
    isSelfClosing?: boolean;
};
export declare function makeChildrenHtmlString(children: ChildDefinition[], { voidElements, isSelfClosing }?: BaseDefinition): string;
export type Definition = {
    name: string;
    attributes?: {
        [key: string]: undefined | null | boolean | number | string;
    };
    children?: ChildDefinition[];
    isVoidElement?: boolean;
} & BaseDefinition;
export default function makeHtmlString({ name, attributes, children, voidElements, isVoidElement, isSelfClosing }: Definition): string;
