# make-html-string

Makes a valid HTML as string.

## Installation

```
npm install git+https://github.com/JamesRobertHugginsNgo/make-html-string.git#3.0.0
```

## Import

This module was coded in ES Module without any web nor NodeJS dependencies.
This module is compiled into a UMD library via WebPack making it available through ES Module or HTML Script as a global variable/namespace.

### ES Module

``` JavaScript
import makeHtmlString, { HTML_VOID_ELEMENTS, makeChildrenHtmlString } from 'PATH/node_modules/make-html-string/make-html-string.js'
```

_Note: Please modify the PATH value to point to the correct folder, or use a bundler (like WebPack) to manage dependencies._

### HTML Script

``` HTML
<script src="PATH/node_modules/make-html-string/dist/make-html-string.js"></script>
<script>
  const { default: makeHtmlString, HTML_VOID_ELEMENTS, makeChildrenHtmlString } = MakeHtmlString;
</script>
```

_Note: Please modify the PATH value to point to the correct folder._

## Constant: HTML_VOID_ELEMENTS

Type [STRING].

A list of valid HTML Void Elements.

## Function: makeChildrenHtmlString(children, options)

Makes a valid HTML children as string.

Argument | Type | Description
-- | -- | --
children | ARRAY | Optional. Element children as a list of primative values and makeHtmlsString definitions. Null and Undefined values are ignored. Defaults to [].
options | OBJECT | Optional. Additional options that can be passed down from the main makeHtmlString function.Defaults to {}.

Returns STRING.

### Argument: options

Property | Type | Description
-- | -- | --
selfClosing | BOOLEAN | Optional. Flag to use self closing syntax when the element is one of the HTML Void Elements or when the element does not have any valid children. Defaults to false.
voidElements | [STRING] | Optional. A list of HTML Void Elements. Defaults to HTML_VOID_ELEMENTS constant.

## Function: makeHtmlString(definition)

Makes a valid HTML as string.

Argument | Type | Description
-- | -- | --
definition | OBJECT | Optional. HTML definition. Defaults to {}.

Returns STRING.

### Argument: definition

Property | Type | Description
-- | -- | --
name | STRING | Optional. Element name. Defaults to 'div'.
attributes | OBJECT | Optional. Element attributes names and values. Null and Undefined values are ignored.
children | ARRAY | Optional. Element children as a list of primative values and makeHtmlsString definitions. Null and Undefined values are ignored.
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
  attributes: {
    'id': 'span-id',
    'data-test': ''
  }
});

// Output: '<span id="span-id" data-test>Hello World</span>'
makeHtmlString({
  name: 'span',
  attributes: {
    'id': 'span-id',
    'data-test': ''
  },
  children: ['Hello World']
});

// Output: '<span id="span-id" data-test><strong>Hello World</strong></span>'
makeHtmlString({
  name: 'span',
  attributes: {
    'id': 'span-id',
    'data-test': ''
  },
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
