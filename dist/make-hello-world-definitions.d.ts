import type * as ImplementCallbacks from './implement-callbacks.js';
import type * as MakeHtmlString from './make-html-string.js';
import './make-hello-world-implementation.js';
export type Definition = {
    greeting: string;
    message: string;
};
export default function makeHelloWorldDefinitions(definition: Definition): [MakeHtmlString.Definition, ImplementCallbacks.Definition];
