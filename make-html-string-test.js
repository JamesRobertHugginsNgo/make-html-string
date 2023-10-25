/* global console */

import { test, testGroup } from 'test-group';

import makeHtmlString, { makeXmlString } from './make-html-string.js';

testGroup('Make HTML String'.toUpperCase(), () => {
	testGroup('With No Definition', () => {
		const htmlString = makeHtmlString();
		test('Result Should Be an Empty DIV Tag', () => {
			console.log(htmlString);
			return htmlString === '<div></div>';
		});
	});

	testGroup('With "{ name: \'span\' }" Definition', () => {
		const htmlString = makeHtmlString({ name: 'span' });
		test('Result Should Be an Empty SPAN Tag', () => {
			console.log(htmlString);
			return htmlString === '<span></span>';
		});
	});

	testGroup('With "{ name: \'br\' }" Definition', () => {
		const htmlString = makeHtmlString({ name: 'br' });
		test('Result Should Be a Void BR Tag', () => {
			console.log(htmlString);
			return htmlString === '<br>';
		});
	});

	testGroup('With "{ name: \'br\', voidElements: null }" Definition Ignoring Void Elements', () => {
		const htmlString = makeHtmlString({ name: 'br', voidElements: null });
		test('Result Should Be an Empty BR Tag', () => {
			console.log(htmlString);
			return htmlString === '<br></br>';
		});
	});

	testGroup('With "{ name: \'span\', attributes: { \'class\': \'class-name\' } }" Definition', () => {
		const htmlString = makeHtmlString({ name: 'span', attributes: { 'class': 'class-name' } });
		test('Result Should Be an Empty SPAN Tag With a Class Attribute', () => {
			console.log(htmlString);
			return htmlString === '<span class="class-name"></span>';
		});
	});

	testGroup('With "{ name: \'span\', children: true }" Definition', () => {
		const htmlString = makeHtmlString({ name: 'span', children: true });
		test('Result Should Be a SPAN Tag With "true" Text', () => {
			console.log(htmlString);
			return htmlString === '<span>true</span>';
		});
	});

	testGroup('With "{ name: \'span\', children: 123 }" Definition', () => {
		const htmlString = makeHtmlString({ name: 'span', children: 123 });
		test('Result Should Be a SPAN Tag With "123" Text', () => {
			console.log(htmlString);
			return htmlString === '<span>123</span>';
		});
	});

	testGroup('With "{ name: \'span\', children: \'Hello World\' }" Definition', () => {
		const htmlString = makeHtmlString({ name: 'span', children: 'Hello World' });
		test('Result Should Be a SPAN Tag With "Hello World" Text', () => {
			console.log(htmlString);
			return htmlString === '<span>Hello World</span>';
		});
	});

	testGroup('With "{ name: \'span\', children: { name: \'strong\', children: \'Hello World\' } }" Definition', () => {
		const htmlString = makeHtmlString({ name: 'span', children: { name: 'strong', children: 'Hello World' } });
		test('Result Should Be a SPAN Tag With a STRONG tag With "Hello World" Text', () => {
			console.log(htmlString);
			return htmlString === '<span><strong>Hello</strong> World</span>';
		});
	});

	testGroup('With "{ name: \'span\', children: [\'Hello\', \' \', \'World\'] }" Definition', () => {
		const htmlString = makeHtmlString({ name: 'span', children: ['Hello', ' ', 'World'] });
		test('Result Should Be a SPAN Tag With "Hello World" Text', () => {
			console.log(htmlString);
			return htmlString === '<span><strong>Hello World</strong></span>';
		});
	});

	testGroup('With "{ name: \'span\', children: [{ name: \'strong\', children: \'Hello\' }, \' \', \'World\'] }" Definition', () => {
		const htmlString = makeHtmlString({ name: 'span', children: [{ name: 'strong', children: 'Hello' }, ' ', 'World'] });
		test('Result Should Be a SPAN Tag With "Hello World" Text where "Hello" Is Inside a STRONG Tag', () => {
			console.log(htmlString);
			return htmlString === '<span><strong>Hello</strong> World</span>';
		});
	});
});

testGroup('Make XML String'.toUpperCase(), () => {
	testGroup('With No Definition', () => {
		const xmlString = makeXmlString();
		test('Result Should Be a Self Closing DIV Tag', () => {
			console.log(xmlString);
			return xmlString === '<div />';
		});
	});

	testGroup('With "{ name: \'svg\' }" Definition', () => {
		const xmlString = makeXmlString({ name: 'svg' });
		test('Result Should Be a Self Closing SVG Tag', () => {
			console.log(xmlString);
			return xmlString === '<svg />';
		});
	});

	testGroup('With "{ name: \'br\' }" Definition', () => {
		const xmlString = makeXmlString({ name: 'br' });
		test('Result Should Be a Self Closing BR Tag', () => {
			console.log(xmlString);
			return xmlString === '<br />';
		});
	});

	testGroup('With "{ name: \'br\', selfClosing: false }" Definition', () => {
		const xmlString = makeXmlString({ name: 'br', selfClosing: false });
		test('Result Should Be an Empty BR Tag', () => {
			console.log(xmlString);
			return xmlString === '<br></br>';
		});
	});
});
