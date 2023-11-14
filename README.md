# make-html-string

Returns a valid HTML tag as a string.

## NPM Installation

```
npm install git+https://github.com/JamesRobertHugginsNgo/make-html-string.git#1.2.0
```

## Function: makeHtmlString(definition, options)

Argument | Type | Description
-- | -- | --
`definition` | `object` | _Optional_. Defines the HTML string. _Defaults to `{}`_.
`options` | `object` | _Optional_. Configures function behaviour. _Defaults to `{}`_.

Return type: `string`.

``` JavaScript
import makeHtmlString from 'make-html-string';

// <div></div>
makeHtmlString();

// <span></span>
makeHtmlString({ name: 'span' }); 

// <br> - void element
makeHtmlString({ name: 'br' });

// <span class="class-name" id="class-id"></span>
makeHtmlString({ 
  name: 'span', 
  attributes: { 
    'class': 'class-name', 
    'id': 'class-id' 
  } 
})

// <span>true</span>
makeHtmlString({ 
  name: 'span', 
  children: true
});

// <span>100</span>
makeHtmlString({ 
  name: 'span', 
  children: 100
});

// <span>Hello World</span>
makeHtmlString({ 
  name: 'span', 
  children: 'Hello World'
});

// <span><strong>Hello World</strong></span>
makeHtmlString({ 
  name: 'span', 
  children: { 
    name: 'strong', 
    children: 'Hello World' 
  }
});

// <span><strong>Hello</strong> World</span>
makeHtmlString({ 
  name: 'span', 
  children: [
    { 
      name: 'strong', 
      children: 'Hello' 
    },
    ' World'
  ]
});
```

### Argument: definition

Type: `any`. _Optional_.

When typeof "undefined", uses the default value of `{}`.

When typeof "null", returns an empty string (`''`).

When typeof "boolean", "number" or "string", returns the string equivalent of the value.

When typeof "object", defines an HTML string using the following keys:

Key | Type | Description
-- | -- | --
`name` | `string` | _Optional_. Tag name. _Defaults to `'div'`_
`attributes` | `object` | _Optional_. Tag attributes.
`children` | `object` | _Optional_. Tag children.
`selfClosing` | `boolean` | _Optional_. Overrides the `options.selfClosing` main argument for this and children elements.
`voidElements` | `[string]` | _Optional_. Overrides the `options.voidElements` main argument for this and children elements.

When typeof "array", returns the joined values of the array items based on the above results.

### Argument: options

Type: `object`. _Optional_.

Key | Type | Description
-- | -- | --
`selfClosing` | `boolean` | _Optional_. Uses the self-closing tag format when `children` is not defined. _Defaults to `false`_.
`voidElements` | `[string]` | _Optional_. A list of tag names that should be treated as HTML void elements. Should be set to falsy value (`false` or `0` or `''` or `null`) to make xml strings. _Defaults to `HTML_VOID_ELEMENTS` constant_.

## Constant: HTML_VOID_ELEMENTS

``` JavaScript
export const HTML_VOID_ELEMENTS
	= ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
```

__Note__: Neither doctype (`<!DOCTYPE html>`) nor XML declaration (`<?xml version="1.0" encoding="UTF-8"?>`) are not included. If needed, you should pass this in the definition as string.

## Using Script Tag

The JavaScript library (found in the "dist" folder) can be used directly using an HTML script tag. The JavaScript module is exposed as a global `MakeHtmlString` namespace with the main function exposed as `MakeHtmlString.default`.

``` HTML
<script src="node_modules/make-html-string/dist/make-html-string.js"></script>
<script>
  const { default: makeHtmlString, HTML_VOID_ELEMENTS } = MakeHtmlString;
</script>
```

## References

- [Void element, MDN web docs](https://developer.mozilla.org/en-US/docs/Glossary/Void_element).
- [Self-closing tags, MDN web docs](https://developer.mozilla.org/en-US/docs/Glossary/Void_element#self-closing_tags).
