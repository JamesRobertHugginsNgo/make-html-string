# make-html-string

Returns a valid HTML tag as a string.

## Installation

```
npm install --save git+https://github.com/JamesRobertHugginsNgo/make-html-string.git#1.1.0
```

## Usage

### makeHtmlString

Makes a valid HTML tag as a string.

``` JavaScript
import makeHtmlString from 'make-html-string';

console.log(makeHtmlString()); // <div></div>

console.log(makeHtmlString({ name: 'span' })); // <span></span>

console.log(makeHtmlString({ name: 'br' })); // <br>

console.log(makeHtmlString({ 
  name: 'span', 
  attributes: { 
    'class': 'class-name', 
    'id': 'class-id' 
  } 
})); // <span class="class-name" id="class-id"></span>

console.log(makeHtmlString({ 
  name: 'span', 
  children: true
})); // <span>true</span>

console.log(makeHtmlString({ 
  name: 'span', 
  children: 100
})); // <span>100</span>

console.log(makeHtmlString({ 
  name: 'span', 
  children: 'Hello World'
})); // <span>Hello World</span>

console.log(makeHtmlString({ 
  name: 'span', 
  children: { name: 'strong', children: 'Hello World' }
})); // <span><strong>Hello World</strong></span>

console.log(makeHtmlString({ 
  name: 'span', 
  children: [
    { name: 'strong', children: 'Hello' },
    ' World'
  ]
})); // <span><strong>Hello</strong> World</span>
```

### makeXmlString

Makes a valid XML tag as a string, including XHTML.

``` JavaScript
import { makeXmlString } from 'make-html-string';

console.log(makeXmlString()); // <div />

console.log(makeHtmlString({ name: 'span' })); // <span />

console.log(makeHtmlString({ name: 'br' })); // <br />

console.log(makeHtmlString({ 
  name: 'span', 
  attributes: { 
    'class': 'class-name', 
    'id': 'class-id' 
  } 
})); // <span class="class-name" id="class-id" />

console.log(makeHtmlString({ 
  name: 'span', 
  children: true
})); // <span>true</span>

console.log(makeHtmlString({ 
  name: 'span', 
  children: 100
})); // <span>100</span>

console.log(makeHtmlString({ 
  name: 'span', 
  children: 'Hello World'
})); // <span>Hello World</span>

console.log(makeHtmlString({ 
  name: 'span', 
  children: { name: 'strong', children: 'Hello World' }
})); // <span><strong>Hello World</strong></span>

console.log(makeHtmlString({ 
  name: 'span', 
  children: [
    { name: 'strong', children: 'Hello' },
    ' World'
  ]
})); // <span><strong>Hello</strong> World</span>
```

### Options

Both `makeHtmlString` and `makeXmlString` functions can accept a second argument for options.

The constant `htmlVoidElements` contains all the name for HTML void elements. This is the default `voidElements` value for `makeHtmlString` function.

Options are also passed down to its children.

``` JavaScript
import makeHtmlString, { htmlVoidElements, makeXmlString } from 'make-html-string';

makeHtmlString({}, {
  selfClosing: false,
  voidElements: htmlVoidElements 
});

makeXmlString({}, {
  selfClosing: true,
  voidElements: null 
});

```

The options can also be passed as part of the definitions. This allows the parent's options to be overwritten. Any new options will be passed down to the childrens.

``` JavaScript
import makeHtmlString, { htmlVoidElements } from 'make-html-string';

makeHtmlString({
  name: 'div',
  children: {
    name: 'svg',
    attributes: {
      xmlns: 'http://www.w3.org/2000/svg',
      version: '1.1',
      width: 120,
      height: 120
    },
    children: {
      name: 'rect',
      attributes: {
        x: 14,
        y: 23,
        width: 200,
        height: 50,
        fill: 'lime',
        stroke: 'black'
      }
    },
    selfClosing: true,
    voidElements: null
  },
  selfClosing: false,
  voidElements: htmlVoidElements
});
```

More on [void elements and self-closing tags in the MDN web docs](https://developer.mozilla.org/en-US/docs/Glossary/Void_element).

### htmlVoidElements

HTML contains the following void elements.

``` JavaScript
/**
 * A array of HTML names for void elements.
 * @type {[string]}
 */
export const htmlVoidElements = [
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
```

Neither doctype (`<!DOCTYPE html>`) nor XML declaration (`<?xml version="1.0" encoding="UTF-8"?>`) are not included. If needed, you should pass this in the definition as string.

## Reference

### Definition Object

Properties | Type | Descriptions
--- | --- | ---
name | string | Optional. The name of the tag/element. Defaults to "div".
attributes | object | Optional. The tag/element's attributes, based on the key-value pair.
children | any | Optional. Represent the child tags/elements. Can be any types including a definition object and an array of definition objects.
selfClosing | boolean | Optional. Overrides the flag indicating that tags/elements without children should be self closing.
voidElements | [string] | Optional. Overrides the array of element's name, indicating that certain tags/elements should be rendered as a void element.
