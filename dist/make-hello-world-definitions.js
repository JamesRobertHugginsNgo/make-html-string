import './make-hello-world-implementation.js';
let idCounter = 0;
export default function makeHelloWorldDefinitions(definition) {
    const { greeting, message } = definition;
    const id = `hello-world-${idCounter++}`;
    return [
        {
            name: 'p',
            attributes: { id },
            children: [
                greeting,
                ' ',
                message
            ]
        },
        {
            name: 'hello-world',
            options: { id }
        }
    ];
}
