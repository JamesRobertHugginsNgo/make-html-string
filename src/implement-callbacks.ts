export type Options = { [key: string]: any };

export type Definition = {
	name: string,
	options?: Options
}

export type Callback = (options: Options, containerElement: HTMLElement) => void;

export const implementations: { [key: string]: Callback } = {};

export function implementCallback(definition: Definition, containerElement: HTMLElement = document.body): void {
	const { name, options = {} } = definition;
	if (name in implementations) {
		implementations[name](options, containerElement);
	}
}

export default function implementCallbacks(definitions: Definition[], containerElement?: HTMLElement): void {
	for (const definition of definitions) {
		implementCallback(definition, containerElement);
	}
}
