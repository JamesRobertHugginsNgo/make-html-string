import { test, testGroup } from 'test-group';

import makeHtmlString from '../make-html-string.js';

// ==
// TEST: NO DEFINITION
// ==

testGroup('No Definition'.toUpperCase(), () => {
	testGroup('Undefined'.toUpperCase(), () => {
		const htmlString = makeHtmlString();
		test('Is <div></div>', () => htmlString === '<div></div>');
	});

	testGroup('Empty Object'.toUpperCase(), () => {
		const htmlString = makeHtmlString({});
		test('Is <div></div>', () => htmlString === '<div></div>');
	});
});

// ==
// TEST: NAME ONLY
// ==

testGroup('Name Only'.toUpperCase(), () => {
	testGroup('Element'.toUpperCase(), () => {
		const htmlString = makeHtmlString({ name: 'span' });
		test('Is <span></span>', () => htmlString === '<span></span>');
	});

	testGroup('Void Element'.toUpperCase(), () => {
		const htmlString = makeHtmlString({ name: 'br' });
		test('Is <br>', () => htmlString === '<br>');
	});
});

// ==
// TEST: ATTRIBUTES ONLY
// ==

testGroup('Attributes Only'.toUpperCase(), () => {
	testGroup('Standard Attribute'.toUpperCase(), () => {
		const htmlString = makeHtmlString({ attributes: { id: 'id-attribute' } });
		test('Is <div id="id-attribute"></div>', () => htmlString === '<div id="id-attribute"></div>');
	});

	testGroup('Empty Attribute'.toUpperCase(), () => {
		const htmlString = makeHtmlString({ attributes: { readonly: '' } });
		test('Is <div readonly></div>', () => htmlString === '<div readonly></div>');
	});

	testGroup('Null Attribute'.toUpperCase(), () => {
		const htmlString = makeHtmlString({ attributes: { test: null } });
		test('Is <div></div>', () => htmlString === '<div></div>');
	});
});

// ==
// TEST: CHILDREN ONLY
// ==

testGroup('Children Only'.toUpperCase(), () => {
	testGroup('Null'.toUpperCase(), () => {
		const htmlString = makeHtmlString({ children: [null] });
		test('Is <div></div>', () => htmlString === '<div></div>');
	});

	testGroup('Boolean'.toUpperCase(), () => {
		const htmlString = makeHtmlString({ children: [true, false] });
		test('Is <div>truefalse</div>', () => htmlString === '<div>truefalse</div>');
	});

	testGroup('Number'.toUpperCase(), () => {
		const htmlString = makeHtmlString({ children: [123] });
		test('Is <div>123</div>', () => htmlString === '<div>123</div>');
	});

	testGroup('String'.toUpperCase(), () => {
		const htmlString = makeHtmlString({ children: ['string'] });
		test('Is <div>string</div>', () => htmlString === '<div>string</div>');
	});

	testGroup('Object'.toUpperCase(), () => {
		const htmlString = makeHtmlString({
			children: [{
				name: 'strong',
				attributes: { id: 'hello-world' },
				children: ['Hello World']
			}]
		});
		test('Is <div><strong id="hello-world">Hello World</strong></div>', () => {
			return htmlString === '<div><strong id="hello-world">Hello World</strong></div>';
		});
	});
});

// ==
// TEST: SELF CLOSING
// ==

testGroup('Self Closing'.toUpperCase(), () => {
	testGroup('Element'.toUpperCase(), () => {
		const htmlString = makeHtmlString({ selfClosing: true });
		test('Is <div />', () => htmlString === '<div />');
	});

	testGroup('Element With Attributes'.toUpperCase(), () => {
		const htmlString = makeHtmlString({ attributes: { id: 'hello-world' }, selfClosing: true });
		test('Is <div id="hello-world" />', () => htmlString === '<div id="hello-world" />');
	});

	testGroup('Element With Children'.toUpperCase(), () => {
		const htmlString = makeHtmlString({ children: ['Hello World'], selfClosing: true });
		test('Is <div>Hello World</div>', () => htmlString === '<div>Hello World</div>');
	});

	testGroup('Void Element'.toUpperCase(), () => {
		const htmlString = makeHtmlString({ name: 'br', selfClosing: true });
		test('Is <br />', () => htmlString === '<br />');
	});

	testGroup('Void Element With Children'.toUpperCase(), () => {
		const htmlString = makeHtmlString({ name: 'br', children: ['Hello World'], selfClosing: true });
		test('Is <br />', () => htmlString === '<br />');
	});
});

// ==
// TEST: NO VOID ELEMENTS
// ==

testGroup('No Void Elements'.toUpperCase(), () => {
	testGroup('Standard Void Element'.toUpperCase(), () => {
		const htmlString = makeHtmlString({ name: 'br', voidElements: [] });
		test('Is <br></br>', () => htmlString === '<br></br>');
	});

	testGroup('Custom Void Element'.toUpperCase(), () => {
		const htmlString = makeHtmlString({ voidElements: ['div'] });
		test('Is <div>', () => htmlString === '<div>');
	});

	testGroup('Custom Void Element With Children'.toUpperCase(), () => {
		const htmlString = makeHtmlString({ children: ['Hello World'], voidElements: ['div'] });
		test('Is <div>', () => htmlString === '<div>');
	});
});
