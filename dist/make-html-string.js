export const VOID_ELEMENTS = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
];
export function makeChildrenHtmlString(children, { voidElements, isSelfClosing } = {}) {
    if (children == null) {
        return '';
    }
    const html = [];
    for (const child of children) {
        if (child == null) {
            continue;
        }
        if (Array.isArray(child)) {
            html.push(makeChildrenHtmlString(child, {
                voidElements,
                isSelfClosing
            }));
            continue;
        }
        if (typeof child === 'object' && 'name' in child) {
            html.push(makeHtmlString({
                voidElements,
                isSelfClosing,
                ...child
            }));
            continue;
        }
        html.push(child);
    }
    return html.join('');
}
export default function makeHtmlString({ name, attributes, classList, styles, dataset, children, voidElements = VOID_ELEMENTS, isVoidElement = voidElements.includes(name), isSelfClosing = false }) {
    const tag = [name];
    if (attributes != null) {
        for (const name in attributes) {
            const value = attributes[name];
            if (value == null) {
                continue;
            }
            if (value === '') {
                tag.push(name);
                continue;
            }
            tag.push(`${name}="${value}"`);
        }
    }
    if (classList != null) {
        const classListValues = classList
            .filter((className) => className != null);
        tag.push(`class="${classListValues.join(' ')}"`);
    }
    if (styles != null) {
        const styleValues = Object.keys(styles)
            .filter((property) => styles[property] != null)
            .map((property) => `${property}: ${styles[property]};`);
        tag.push(`style="${styleValues.join(' ')}"`);
    }
    if (dataset != null) {
        for (const name in dataset) {
            const value = dataset[name];
            if (value == null) {
                continue;
            }
            if (value === '') {
                tag.push(`data-${name}`);
                continue;
            }
            tag.push(`data-${name}="${value}"`);
        }
    }
    if (isVoidElement) {
        return [
            '<',
            tag.join(' '),
            isSelfClosing
                ? ' />'
                : '>'
        ].join('');
    }
    return [
        '<',
        tag.join(' '),
        '>',
        makeChildrenHtmlString(children, {
            voidElements,
            isSelfClosing
        }),
        '</',
        name,
        '>'
    ].join('');
}
export function getChildrenCallbackList(children) {
    if (children == null) {
        return [];
    }
    const callbackList = [];
    for (const child of children) {
        if (Array.isArray(child)) {
            callbackList.push(...getChildrenCallbackList(child));
            continue;
        }
        if (child == null || typeof child !== 'object' || !('name' in child)) {
            continue;
        }
        callbackList.push(...getCallbackList(child));
    }
    return callbackList;
}
export function getCallbackList(definition) {
    const { children, callback, callbackOptions } = definition;
    const callbackList = [];
    callbackList.push(...getChildrenCallbackList(children));
    if (callback != null) {
        callbackList.push({
            name: callback,
            options: callbackOptions ?? definition
        });
    }
    return callbackList;
}
export function callCallbacks(definition, callbacks) {
    const callbackList = getCallbackList(definition);
    callCallbackList(callbackList, callbacks);
}
export function callCallbackList(callbackList, callbacks) {
    for (const callbackListItem of callbackList) {
        const { name, options } = callbackListItem;
        callbacks[name](options);
    }
}
