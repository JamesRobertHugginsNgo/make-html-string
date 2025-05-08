export type Options = {
    [key: string]: any;
};
export type Definition = {
    name: string;
    options?: Options;
};
export type Callback = (options: Options, containerElement: HTMLElement) => void;
export declare const implementations: {
    [key: string]: Callback;
};
export declare function implementCallback(definition: Definition, containerElement?: HTMLElement): void;
export default function implementCallbacks(definitions: Definition[], containerElement?: HTMLElement): void;
