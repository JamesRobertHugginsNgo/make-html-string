import { test, testGroup} from 'test-group';

import makeHtmlString from './make-html-string.js';

testGroup('Using empty argument', () => {
	const htmlString = makeHtmlString();

	test('Result is empty div element', () => {
		return htmlString === '<div></div>';
	});
});

testGroup('Using name only', () => {
	const htmlString = makeHtmlString({ name: 'br' });

	test('Result is empty br element', () => {
		return htmlString === '<br>';
	});
});
