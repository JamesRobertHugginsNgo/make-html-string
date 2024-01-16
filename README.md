# make-html-string

Makes a valid HTML as string.

## Installation

```
npm install git+https://github.com/JamesRobertHugginsNgo/make-html-string.git#2.0.0
```

## Import

### ES Module

``` JavaScript
import makeHtmlString, { HTML_VOID_ELEMENTS } from 'PATH/node_modules/make-html-string/make-html-string.js'
```

### HTML Script

The project contains a build script that uses the webpack dependency to build the ES module into the UMD library creating MakeHtmlString global variable/namespace.

``` HTML
<script src="PATH/node_modules/make-html-string/dist/make-html-string.js"></script>
<script>
  const { default: makeHtmlString, HTML_VOID_ELEMENTS } = MakeHtmlString;
</script>
```

## Constants

Constant | Type | Description
-- | -- | --
HTML_VOID_ELEMENTS | [STRING] | A list of valid HTML Void Elements.

## Function: makeHtmlString(definition)

Argument | Type | Description
-- | -- | --
definition | OBJECT | Optional. HTML definition. Defaults to {}.

Returns STRING.

### Argument: definition

Property | Type | Description
-- | -- | --
name | STRING | Optional. Element name. Defaults to 'div'.
attributes | OBJECT | Optional. Element attributes names and values.
children | ARRAY | Optional. Element children as a list of primative values and makeHtmlsString definitions.
selfClosing | BOOLEAN | Optional. Flag to use self closing syntax when the element is one of the HTML Void Elements or when the element does not have any valid children. Defaults to false.
voidElements | [STRING] | Optional. A list of HTML Void Elements. Defaults to HTML_VOID_ELEMENTS constant.

### Usage

``` JavaScript
// Output: '<div></div>'
makeHtmlString();

// Output: '<div></div>'
makeHtmlString({});

// Output: '<span</span>'
makeHtmlString({ name: 'span' });

// Output: '<span id="span-id" data-test></span>'
makeHtmlString({
  name: 'span',
  attributes: { id: 'span-id', 'data-test': '' }
});

// Output: '<span id="span-id" data-test>Hello World</span>'
makeHtmlString({
  name: 'span',
  attributes: { 'id': 'span-id', 'data-test': '' },
  children: ['Hello World']
});

// Output: '<span id="span-id" data-test><strong>Hello World</strong></span>'
makeHtmlString({
  name: 'span',
  attributes: { 'id': 'span-id', 'data-test': '' },
  children: [
    {
      name: 'strong',
      children: ['Hello World']
    }
  ]
});

// Output: '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="red" /><circle cx="150" cy="100" r="80" fill="green" /><text x="150" y="125" font-size="60" text-anchor="middle" fill="white">SVG</text></svg>'
makeHtmlString({
  name: svg,
  attributes: {
    'version': '1.1',
    'width': 300,
    'height': 200,
    'xmlns': 'http://www.w3.org/2000/svg'
  },
  children: [
    {
      name: 'rect',
      attributes: {
        'width': '100%',
        'height': '100%',
        'fill': 'red'
      }
    },
    {
      name: 'circle',
      attributes: {
        'cx': 150,
        'cy': 100,
        'r': 80,
        'fill': 'green'
      }
    },
    {
      name: 'text',
      attributes: {
        'x': 150,
        'y': 125,
        'font-size': 60,
        'text-anchor': 'middle',
        'fill': 'white'
      },
      children: ['SVG']
    }
  ],
  selfClosing: true,
  voidElements: []
});
```

## References

- [Void element, MDN web docs](https://developer.mozilla.org/en-US/docs/Glossary/Void_element).
- [Self-closing tags, MDN web docs](https://developer.mozilla.org/en-US/docs/Glossary/Void_element#self-closing_tags).
