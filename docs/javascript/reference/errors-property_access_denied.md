# 'Error: Permission denied to access property "x"'

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Property_access_denied](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Property_access_denied)

---

The JavaScript exception "Permission denied to access property" occurs when there was
an attempt to access an object for which you have no permission.

## Message

```plain
DOMException: Blocked a frame with origin "x" from accessing a cross-origin frame. (Chromium-based)
DOMException: Permission denied to access property "x" on cross-origin object (Firefox)
SecurityError: Blocked a frame with origin "x" from accessing a cross-origin frame. Protocols, domains, and ports must match. (Safari)
```

## Error type

`DOMException`.

## What went wrong?

There was attempt to access an object for which you have no permission. This is likely
an `iframe` element loaded from a different domain for which you
violated the [same-origin policy](/en-US/docs/Web/Security/Defenses/Same-origin_policy).

## Examples

### No permission to access document

```html
<iframe id="myframe" src="http://www1.w3c-test.org/common/blank.html"></iframe>
```

```js
console.log(frames[0].document);
// Error: Permission denied to access property "document"
```

## See also

- `iframe`
- [Same-origin policy](/en-US/docs/Web/Security/Defenses/Same-origin_policy)
