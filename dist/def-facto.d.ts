import * as MakeHtmlString from './make-html-string.js';
export type Definition = {
	greeting: string;
	message: string;
};
export default function defFacto(
	definition: Definition,
): MakeHtmlString.Definition;
