import Path from 'node:path';

export default {
	entry: './make-html-string.js',
	output: {
		path: Path.resolve('dist'),
		filename: 'make-html-string.js',
		library: {
			name: 'MakeHtmlString',
			type: 'umd'
		}
	}
};
