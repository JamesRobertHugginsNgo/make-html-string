import * as ImplementCallbacks from './implement-callbacks.js';
ImplementCallbacks.implementations['hello-world'] = function (options, containerElement) {
    const { id } = options;
    const element = document.getElementById(id);
    element?.addEventListener('mouseover', () => void element.style.setProperty('background-color', 'salmon'));
    element?.addEventListener('mouseout', () => void element.style.removeProperty('background-color'));
};
