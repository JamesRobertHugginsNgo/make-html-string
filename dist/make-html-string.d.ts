export declare const VOID_ELEMENTS: string[];
export type ChildDefinition = undefined | null | boolean | number | string | Definition | ChildDefinition[];
export type BaseDefinition = {
    voidElements?: string[];
    isSelfClosing?: boolean;
};
export declare function makeChildrenHtmlString(children?: ChildDefinition[], { voidElements, isSelfClosing }?: BaseDefinition): string;
export type callbackOptions = {
    [key: string]: any;
};
export type Definition = {
    name: string;
    attributes?: {
        [key: string]: undefined | null | boolean | number | string;
    };
    classList?: any[];
    styles?: {
        [key: string]: any;
    };
    dataset?: {
        [key: string]: any;
    };
    children?: ChildDefinition[];
    callback?: string;
    callbackOptions?: callbackOptions;
    isVoidElement?: boolean;
} & BaseDefinition;
export default function makeHtmlString({ name, attributes, classList, styles, dataset, children, voidElements, isVoidElement, isSelfClosing }: Definition): string;
export type CallbackListItem = {
    name: string;
    options: callbackOptions | Definition;
};
export declare function getChildrenCallbackList(children?: ChildDefinition[]): CallbackListItem[];
export declare function getCallbackList(definition: Definition): CallbackListItem[];
export type Callbacks = {
    [key: string]: (definition: callbackOptions | Definition) => void;
};
export declare function callCallbacks(definition: Definition, callbacks: Callbacks): void;
export declare function callCallbackList(callbackList: CallbackListItem[], callbacks: Callbacks): void;
