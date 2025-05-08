export const implementations = {};
export function implementCallback(definition, containerElement = document.body) {
    const { name, options = {} } = definition;
    if (name in implementations) {
        implementations[name](options, containerElement);
    }
}
export default function implementCallbacks(definitions, containerElement) {
    for (const definition of definitions) {
        implementCallback(definition, containerElement);
    }
}
