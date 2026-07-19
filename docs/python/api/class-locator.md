# Locator

> **Source:** [playwright.dev/python/docs/api/class-locator](https://playwright.dev/python/docs/api/class-locator)

---

Locators are the central piece of Playwright's auto-waiting and retry-ability. In a nutshell, locators represent a way to find element(s) on the page at any moment. A locator can be created with the [page.locator()](/api/class-page.mdx#page-locator) method.

[Learn more about locators](../locators.mdx).


---

## Methods

### all {/* #locator-all */}



When the locator points to a list of elements, this returns an array of locators, pointing to their respective elements.

:::note

[locator.all()](/api/class-locator.mdx#locator-all) does not wait for elements to match the locator, and instead immediately returns whatever is present in the page.

When the list of elements changes dynamically, [locator.all()](/api/class-locator.mdx#locator-all) will produce unpredictable and flaky results.

When the list of elements is stable, but loaded dynamically, wait for the full list to finish loading before calling [locator.all()](/api/class-locator.mdx#locator-all).
:::

**Usage**

**sync**

```py
for li in page.get_by_role('listitem').all():
  li.click();
```

**async**

```py
for li in await page.get_by_role('listitem').all():
  await li.click();
```

**Returns**
- List\[Locator\]

---

### all_inner_texts {/* #locator-all-inner-texts */}



Returns an array of `node.innerText` values for all matching nodes.

:::warningAsserting text

If you need to assert text on the page, prefer [expect(locator).to_have_text()](/api/class-locatorassertions.mdx#locator-assertions-to-have-text) with [use_inner_text](/api/class-locatorassertions.mdx#locator-assertions-to-have-text-option-use-inner-text) option to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

**sync**

```py
texts = page.get_by_role("link").all_inner_texts()
```

**async**

```py
texts = await page.get_by_role("link").all_inner_texts()
```

**Returns**
- List\[str\]

---

### all_text_contents {/* #locator-all-text-contents */}



Returns an array of `node.textContent` values for all matching nodes.

:::warningAsserting text

If you need to assert text on the page, prefer [expect(locator).to_have_text()](/api/class-locatorassertions.mdx#locator-assertions-to-have-text) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

**sync**

```py
texts = page.get_by_role("link").all_text_contents()
```

**async**

```py
texts = await page.get_by_role("link").all_text_contents()
```

**Returns**
- List\[str\]

---

### and_ {/* #locator-and */}



Creates a locator that matches both this locator and the argument locator.

**Usage**

The following example finds a button with a specific title.

**sync**

```py
button = page.get_by_role("button").and_(page.get_by_title("Subscribe"))
```

**async**

```py
button = page.get_by_role("button").and_(page.get_by_title("Subscribe"))
```

**Arguments**
- `locator` Locator
  
  Additional locator to match.

**Returns**
- Locator

---

### aria_snapshot {/* #locator-aria-snapshot */}



Captures the aria snapshot of the given element. Read more about [aria snapshots](../aria-snapshots.mdx) and [expect(locator).to_match_aria_snapshot()](/api/class-locatorassertions.mdx#locator-assertions-to-match-aria-snapshot) for the corresponding assertion.

**Usage**

**sync**

```py
page.get_by_role("link").aria_snapshot()
```

**async**

```py
await page.get_by_role("link").aria_snapshot()
```

**Arguments**
- `boxes` bool *(optional)* 
  
  When `true`, appends each element's bounding box as `box=x,y,width,height` to the snapshot. Coordinates are relative to the viewport, in CSS pixels, as returned by [`Element.getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect). Defaults to `false`.
- `depth` int *(optional)* 
  
  When specified, limits the depth of the snapshot.
- `mode` "ai" | "default" *(optional)* 
  
  When set to `"ai"`, returns a snapshot optimized for AI consumption. Defaults to `"default"`. See details for more information.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- str

**Details**

This method captures the aria snapshot of the given element. The snapshot is a string that represents the state of the element and its children. The snapshot can be used to assert the state of the element in the test, or to compare it to state in the future.

The ARIA snapshot is represented using [YAML](https://yaml.org/spec/1.2.2/) markup language:
* The keys of the objects are the roles and optional accessible names of the elements.
* The values are either text content or an array of child elements.
* Generic static text can be represented with the `text` key.

Below is the HTML markup and the respective ARIA snapshot:

```html
<ul aria-label="Links">
  <li><a href="/">Home</a></li>
  <li><a href="/about">About</a></li>
<ul>
```

```yml
- list "Links":
  - listitem:
    - link "Home"
  - listitem:
    - link "About"
```

An AI-optimized snapshot, controlled by [mode](/api/class-locator.mdx#locator-aria-snapshot-option-mode), is different from a default snapshot:
1. Includes element references `ref=e2`. 2. Does not wait for an element matching the locator, and throws when no elements match. 3. Includes snapshots of `<iframe>`s inside the target.

---

### blur {/* #locator-blur */}



Calls [blur](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/blur) on the element.

**Usage**

```python
locator.blur()
locator.blur(**kwargs)
```

**Arguments**
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

---

### bounding_box {/* #locator-bounding-box */}



This method returns the bounding box of the element matching the locator, or `null` if the element is not visible. The bounding box is calculated relative to the main frame viewport - which is usually the same as the browser window.

**Usage**

**sync**

```py
box = page.get_by_role("button").bounding_box()
page.mouse.click(box"x" + box"width" / 2, box"y" + box"height" / 2)
```

**async**

```py
box = await page.get_by_role("button").bounding_box()
await page.mouse.click(box"x" + box"width" / 2, box"y" + box"height" / 2)
```

**Arguments**
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType | Dict
  - `x` float
    
    the x coordinate of the element in pixels.
  - `y` float
    
    the y coordinate of the element in pixels.
  - `width` float
    
    the width of the element in pixels.
  - `height` float
    
    the height of the element in pixels.

**Details**

Scrolling affects the returned bounding box, similarly to [Element.getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect). That means `x` and/or `y` may be negative.

Elements from child frames return the bounding box relative to the main frame, unlike the [Element.getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).

Assuming the page is static, it is safe to use bounding box coordinates to perform input. For example, the following snippet should click the center of the element.

---

### check {/* #locator-check */}



Ensure that checkbox or radio element is checked.

**Usage**

**sync**

```py
page.get_by_role("checkbox").check()
```

**async**

```py
await page.get_by_role("checkbox").check()
```

**Arguments**
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `position` Dict *(optional)*
  - `x` float
    
    
  - `y` float
    
    
  A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
- `scroll` "auto" | "none" *(optional)* 
  
  Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `trial` bool *(optional)*
  
  When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- NoneType

**Details**

Performs the following steps:
1. Ensure that element is a checkbox or a radio input. If not, this method throws. If the element is already checked, this method returns immediately.
1. Wait for [actionability](../actionability.mdx) checks on the element, unless [force](/api/class-locator.mdx#locator-check-option-force) option is set.
1. Scroll the element into view if needed.
1. Use [page.mouse](/api/class-page.mdx#page-mouse) to click in the center of the element.
1. Ensure that the element is now checked. If not, this method throws.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [timeout](/api/class-locator.mdx#locator-check-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

---

### clear {/* #locator-clear */}



Clear the input field.

**Usage**

**sync**

```py
page.get_by_role("textbox").clear()
```

**async**

```py
await page.get_by_role("textbox").clear()
```

**Arguments**
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

**Details**

This method waits for [actionability](../actionability.mdx) checks, focuses the element, clears it and triggers an `input` event after clearing.

If the target element is not an `<input>`, `<textarea>` or `contenteditable` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be cleared instead.

---

### click {/* #locator-click */}



Click an element.

**Usage**

Click a button:

**sync**

```py
page.get_by_role("button").click()
```

**async**

```py
await page.get_by_role("button").click()
```

Shift-right-click at a specific position on a canvas:

**sync**

```py
page.locator("canvas").click(
    button="right", modifiers="Shift", position={"x": 23, "y": 32}
)
```

**async**

```py
await page.locator("canvas").click(
    button="right", modifiers="Shift", position={"x": 23, "y": 32}
)
```

**Arguments**
- `button` "left" | "right" | "middle" *(optional)*
  
  Defaults to `left`.
- `click_count` int *(optional)*
  
  defaults to 1. See UIEvent.detail.
- `delay` float *(optional)*
  
  Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `modifiers` List\"Alt" | "Control" | "ControlOrMeta" | "Meta" | "Shift"\ *(optional)*
  
  Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option will default to `true` in the future.
  :::
  
  
  Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `position` Dict *(optional)*
  - `x` float
    
    
  - `y` float
    
    
  A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
- `scroll` "auto" | "none" *(optional)* 
  
  Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
- `steps` int *(optional)* 
  
  Defaults to 1. Sends `n` interpolated `mousemove` events to represent travel between Playwright's current cursor position and the provided destination. When set to 1, emits a single `mousemove` event at the destination location.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `trial` bool *(optional)*
  
  When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- NoneType

**Details**

This method clicks the element by performing the following steps:
1. Wait for [actionability](../actionability.mdx) checks on the element, unless [force](/api/class-locator.mdx#locator-click-option-force) option is set.
1. Scroll the element into view if needed.
1. Use [page.mouse](/api/class-page.mdx#page-mouse) to click in the center of the element, or the specified [position](/api/class-locator.mdx#locator-click-option-position).
1. Wait for initiated navigations to either succeed or fail, unless [no_wait_after](/api/class-locator.mdx#locator-click-option-no-wait-after) option is set.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [timeout](/api/class-locator.mdx#locator-click-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

---

### count {/* #locator-count */}



Returns the number of elements matching the locator.

:::warningAsserting count

If you need to assert the number of elements on the page, prefer [expect(locator).to_have_count()](/api/class-locatorassertions.mdx#locator-assertions-to-have-count) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

**sync**

```py
count = page.get_by_role("listitem").count()
```

**async**

```py
count = await page.get_by_role("listitem").count()
```

**Returns**
- int

---

### dblclick {/* #locator-dblclick */}



Double-click an element.

**Usage**

```python
locator.dblclick()
locator.dblclick(**kwargs)
```

**Arguments**
- `button` "left" | "right" | "middle" *(optional)*
  
  Defaults to `left`.
- `delay` float *(optional)*
  
  Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `modifiers` List\"Alt" | "Control" | "ControlOrMeta" | "Meta" | "Shift"\ *(optional)*
  
  Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `position` Dict *(optional)*
  - `x` float
    
    
  - `y` float
    
    
  A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
- `scroll` "auto" | "none" *(optional)* 
  
  Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
- `steps` int *(optional)* 
  
  Defaults to 1. Sends `n` interpolated `mousemove` events to represent travel between Playwright's current cursor position and the provided destination. When set to 1, emits a single `mousemove` event at the destination location.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `trial` bool *(optional)*
  
  When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- NoneType

**Details**

This method double clicks the element by performing the following steps:
1. Wait for [actionability](../actionability.mdx) checks on the element, unless [force](/api/class-locator.mdx#locator-dblclick-option-force) option is set.
1. Scroll the element into view if needed.
1. Use [page.mouse](/api/class-page.mdx#page-mouse) to double click in the center of the element, or the specified [position](/api/class-locator.mdx#locator-dblclick-option-position).

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [timeout](/api/class-locator.mdx#locator-dblclick-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

:::note

`element.dblclick()` dispatches two `click` events and a single `dblclick` event.
:::

---

### describe {/* #locator-describe */}



Describes the locator, description is used in the trace viewer and reports. Returns the locator pointing to the same element.

**Usage**

**sync**

```py
button = page.get_by_test_id("btn-sub").describe("Subscribe button")
button.click()
```

**async**

```py
button = page.get_by_test_id("btn-sub").describe("Subscribe button")
await button.click()
```

**Arguments**
- `description` str
  
  Locator description.

**Returns**
- Locator

---

### dispatch_event {/* #locator-dispatch-event */}



Programmatically dispatch an event on the matching element.

**Usage**

**sync**

```py
locator.dispatch_event("click")
```

**async**

```py
await locator.dispatch_event("click")
```

**Arguments**
- `type` str
  
  DOM event type: `"click"`, `"dragstart"`, etc.
- `event_init` EvaluationArgument *(optional)*
  
  Optional event-specific initialization properties.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

**Details**

The snippet above dispatches the `click` event on the element. Regardless of the visibility state of the element, `click` is dispatched. This is equivalent to calling [element.click()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click).

Under the hood, it creates an instance of an event based on the given [type](/api/class-locator.mdx#locator-dispatch-event-option-type), initializes it with [event_init](/api/class-locator.mdx#locator-dispatch-event-option-event-init) properties and dispatches it on the element. Events are `composed`, `cancelable` and bubble by default.

Since [event_init](/api/class-locator.mdx#locator-dispatch-event-option-event-init) is event-specific, please refer to the events documentation for the lists of initial properties:
* [DeviceMotionEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent/DeviceMotionEvent)
* [DeviceOrientationEvent](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent/DeviceOrientationEvent)
* [DragEvent](https://developer.mozilla.org/en-US/docs/Web/API/DragEvent/DragEvent)
* [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event)
* [FocusEvent](https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/FocusEvent)
* [KeyboardEvent](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent)
* [MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/MouseEvent)
* [PointerEvent](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/PointerEvent)
* [TouchEvent](https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent/TouchEvent)
* [WheelEvent](https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent/WheelEvent)

You can also specify JSHandle as the property value if you want live objects to be passed into the event:

**sync**

```py
data_transfer = page.evaluate_handle("new DataTransfer()")
locator.dispatch_event("#source", "dragstart", {"dataTransfer": data_transfer})
```

**async**

```py
data_transfer = await page.evaluate_handle("new DataTransfer()")
await locator.dispatch_event("#source", "dragstart", {"dataTransfer": data_transfer})
```

---

### drag_to {/* #locator-drag-to */}



Drag the source element towards the target element and drop it.

**Usage**

**sync**

```py
source = page.locator("#source")
target = page.locator("#target")

source.drag_to(target)
# or specify exact positions relative to the top-left corners of the elements:
source.drag_to(
  target,
  source_position={"x": 34, "y": 7},
  target_position={"x": 10, "y": 20}
)
```

**async**

```py
source = page.locator("#source")
target = page.locator("#target")

await source.drag_to(target)
# or specify exact positions relative to the top-left corners of the elements:
await source.drag_to(
  target,
  source_position={"x": 34, "y": 7},
  target_position={"x": 10, "y": 20}
)
```

**Arguments**
- `target` Locator
  
  Locator of the element to drag to.
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `scroll` "auto" | "none" *(optional)* 
  
  Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
- `source_position` Dict *(optional)*
  - `x` float
    
    
  - `y` float
    
    
  Clicks on the source element at this point relative to the top-left corner of the element's padding box. If not specified, some visible point of the element is used.
- `steps` int *(optional)* 
  
  Defaults to 1. Sends `n` interpolated `mousemove` events to represent travel between the `mousedown` and `mouseup` of the drag. When set to 1, emits a single `mousemove` event at the destination location.
- `target_position` Dict *(optional)*
  - `x` float
    
    
  - `y` float
    
    
  Drops on the target element at this point relative to the top-left corner of the element's padding box. If not specified, some visible point of the element is used.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `trial` bool *(optional)*
  
  When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- NoneType

**Details**

This method drags the locator to another target locator or target position. It will first move to the source element, perform a `mousedown`, then move to the target element or position and perform a `mouseup`.

---

### drop {/* #locator-drop */}



Simulate an external drag-and-drop of files or clipboard-like data onto this locator.

**Usage**

Drop a file buffer onto an upload area:

Drop plain text and a URL together:

**Arguments**
- `payload` Dict
  - `files` Union\[str, pathlib.Path\] | List\[Union\[str, pathlib.Path\]\] | Dict | List\[Dict\] *(optional)*
    - `name` str
      
      File name
    - `mimeType` str
      
      File type
    - `buffer` bytes
      
      File content
    
    
  - `data` Dict\[str, str\] *(optional)*
    
    
  Data to drop onto the target. Provide `files` (file paths or in-memory buffers), `data` (a mime-type → string map for clipboard-like content such as `text/plain`, `text/html`, `text/uri-list`), or both.
- `position` Dict *(optional)*
  - `x` float
    
    
  - `y` float
    
    
  A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

**Details**

Dispatches the native `dragenter`, `dragover`, and `drop` events at the center of the target element with a synthetic DataTransfer carrying the provided files and/or data entries. Works cross-browser by constructing the DataTransfer in the page context.

If the target element's `dragover` listener does not call `preventDefault()`, the target is considered to have rejected the drop: Playwright dispatches `dragleave` and this method throws.

---

### evaluate {/* #locator-evaluate */}



Execute JavaScript code in the page, taking the matching element as an argument.

**Usage**

Passing argument to [expression](/api/class-locator.mdx#locator-evaluate-option-expression):

**sync**

```py
result = page.get_by_testid("myId").evaluate("(element, x, y) => element.textContent + ' ' + x * y", 7, 8)
print(result) # prints "myId text 56"
```

**async**

```py
result = await page.get_by_testid("myId").evaluate("(element, x, y) => element.textContent + ' ' + x * y", 7, 8)
print(result) # prints "myId text 56"
```

**Arguments**
- `expression` str
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument *(optional)*
  
  Optional argument to pass to [expression](/api/class-locator.mdx#locator-evaluate-option-expression).
- `timeout` float *(optional)*
  
  Maximum time in milliseconds to wait for the locator before evaluating. Note that after locator is resolved, evaluation itself is not limited by the timeout. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- Dict

**Details**

Returns the return value of [expression](/api/class-locator.mdx#locator-evaluate-option-expression), called with the matching element as a first argument, and [arg](/api/class-locator.mdx#locator-evaluate-option-arg) as a second argument.

If [expression](/api/class-locator.mdx#locator-evaluate-option-expression) returns a Promise, this method will wait for the promise to resolve and return its value.

If [expression](/api/class-locator.mdx#locator-evaluate-option-expression) throws or rejects, this method throws.

---

### evaluate_all {/* #locator-evaluate-all */}



Execute JavaScript code in the page, taking all matching elements as an argument.

**Usage**

**sync**

```py
locator = page.locator("div")
more_than_ten = locator.evaluate_all("(divs, min) => divs.length > min", 10)
```

**async**

```py
locator = page.locator("div")
more_than_ten = await locator.evaluate_all("(divs, min) => divs.length > min", 10)
```

**Arguments**
- `expression` str
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument *(optional)*
  
  Optional argument to pass to [expression](/api/class-locator.mdx#locator-evaluate-all-option-expression).

**Returns**
- Dict

**Details**

Returns the return value of [expression](/api/class-locator.mdx#locator-evaluate-all-option-expression), called with an array of all matching elements as a first argument, and [arg](/api/class-locator.mdx#locator-evaluate-all-option-arg) as a second argument.

If [expression](/api/class-locator.mdx#locator-evaluate-all-option-expression) returns a Promise, this method will wait for the promise to resolve and return its value.

If [expression](/api/class-locator.mdx#locator-evaluate-all-option-expression) throws or rejects, this method throws.

---

### evaluate_handle {/* #locator-evaluate-handle */}



Execute JavaScript code in the page, taking the matching element as an argument, and return a JSHandle with the result.

**Usage**

```python
locator.evaluate_handle(expression)
locator.evaluate_handle(expression, **kwargs)
```

**Arguments**
- `expression` str
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument *(optional)*
  
  Optional argument to pass to [expression](/api/class-locator.mdx#locator-evaluate-handle-option-expression).
- `timeout` float *(optional)*
  
  Maximum time in milliseconds to wait for the locator before evaluating. Note that after locator is resolved, evaluation itself is not limited by the timeout. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- JSHandle

**Details**

Returns the return value of [expression](/api/class-locator.mdx#locator-evaluate-handle-option-expression) as aJSHandle, called with the matching element as a first argument, and [arg](/api/class-locator.mdx#locator-evaluate-handle-option-arg) as a second argument.

The only difference between [locator.evaluate()](/api/class-locator.mdx#locator-evaluate) and [locator.evaluate_handle()](/api/class-locator.mdx#locator-evaluate-handle) is that [locator.evaluate_handle()](/api/class-locator.mdx#locator-evaluate-handle) returns JSHandle.

If [expression](/api/class-locator.mdx#locator-evaluate-handle-option-expression) returns a Promise, this method will wait for the promise to resolve and return its value.

If [expression](/api/class-locator.mdx#locator-evaluate-handle-option-expression) throws or rejects, this method throws.

See [page.evaluate_handle()](/api/class-page.mdx#page-evaluate-handle) for more details.

---

### fill {/* #locator-fill */}



Set a value to the input field.

**Usage**

**sync**

```py
page.get_by_role("textbox").fill("example value")
```

**async**

```py
await page.get_by_role("textbox").fill("example value")
```

**Arguments**
- `value` str
  
  Value to set for the `<input>`, `<textarea>` or `contenteditable` element.
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

**Details**

This method waits for [actionability](../actionability.mdx) checks, focuses the element, fills it and triggers an `input` event after filling. Note that you can pass an empty string to clear the input field.

If the target element is not an `<input>`, `<textarea>` or `contenteditable` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be filled instead.

To send fine-grained keyboard events, use [locator.press_sequentially()](/api/class-locator.mdx#locator-press-sequentially).

---

### filter {/* #locator-filter */}



This method narrows existing locator according to the options, for example filters by text. It can be chained to filter multiple times.

**Usage**

**sync**

```py
row_locator = page.locator("tr")
# ...
row_locator.filter(has_text="text in column 1").filter(
    has=page.get_by_role("button", name="column 2 button")
).screenshot()
```

**async**

```py
row_locator = page.locator("tr")
# ...
await row_locator.filter(has_text="text in column 1").filter(
    has=page.get_by_role("button", name="column 2 button")
).screenshot()

```

**Arguments**
- `has` Locator *(optional)*
  
  Narrows down the results of the method to those which contain elements matching this relative locator. For example, `article` that has `text=Playwright` matches `<article><div>Playwright</div></article>`.
  
  Inner locator **must be relative** to the outer locator and is queried starting with the outer locator match, not the document root. For example, you can find `content` that has `div` in `<article><content><div>Playwright</div></content></article>`. However, looking for `content` that has `article div` will fail, because the inner locator must be relative and should not use any elements outside the `content`.
  
  Note that outer and inner locators must belong to the same frame. Inner locator must not contain FrameLocators.
- `has_not` Locator *(optional)* 
  
  Matches elements that do not contain an element that matches an inner locator. Inner locator is queried against the outer one. For example, `article` that does not have `div` matches `<article><span>Playwright</span></article>`.
  
  Note that outer and inner locators must belong to the same frame. Inner locator must not contain FrameLocators.
- `has_not_text` str | Pattern *(optional)* 
  
  Matches elements that do not contain specified text somewhere inside, possibly in a child or a descendant element. When passed a string, matching is case-insensitive and searches for a substring.
- `has_text` str | Pattern *(optional)*
  
  Matches elements containing specified text somewhere inside, possibly in a child or a descendant element. When passed a string, matching is case-insensitive and searches for a substring. For example, `"Playwright"` matches `<article><div>Playwright</div></article>`.
- `visible` bool *(optional)* 
  
  Only matches visible or invisible elements.

**Returns**
- Locator

---

### focus {/* #locator-focus */}



Calls [focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) on the matching element.

**Usage**

```python
locator.focus()
locator.focus(**kwargs)
```

**Arguments**
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

---

### frame_locator {/* #locator-frame-locator */}



When working with iframes, you can create a frame locator that will enter the iframe and allow locating elements in that iframe:

**Usage**

**sync**

```py
locator = page.frame_locator("iframe").get_by_text("Submit")
locator.click()
```

**async**

```py
locator = page.frame_locator("iframe").get_by_text("Submit")
await locator.click()
```

**Arguments**
- `selector` str
  
  A selector to use when resolving DOM element.

**Returns**
- FrameLocator

---

### get_attribute {/* #locator-get-attribute */}



Returns the matching element's attribute value.

:::warningAsserting attributes

If you need to assert an element's attribute, prefer [expect(locator).to_have_attribute()](/api/class-locatorassertions.mdx#locator-assertions-to-have-attribute) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

```python
locator.get_attribute(name)
locator.get_attribute(name, **kwargs)
```

**Arguments**
- `name` str
  
  Attribute name to get the value for.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType | str

---

### get_by_alt_text {/* #locator-get-by-alt-text */}



Allows locating elements by their alt text.

**Usage**

For example, this method will find the image by alt text "Playwright logo":

```html
<img alt='Playwright logo'>
```

**sync**

```py
page.get_by_alt_text("Playwright logo").click()
```

**async**

```py
await page.get_by_alt_text("Playwright logo").click()
```

**Arguments**
- `text` str | Pattern
  
  Text to locate the element for.
- `exact` bool *(optional)*
  
  Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### get_by_label {/* #locator-get-by-label */}



Allows locating input elements by the text of the associated `<label>` or `aria-labelledby` element, or by the `aria-label` attribute.

**Usage**

For example, this method will find inputs by label "Username" and "Password" in the following DOM:

```html
<input aria-label="Username">
<label for="password-input">Password:</label>
<input id="password-input">
```

**sync**

```py
page.get_by_label("Username").fill("john")
page.get_by_label("Password").fill("secret")
```

**async**

```py
await page.get_by_label("Username").fill("john")
await page.get_by_label("Password").fill("secret")
```

**Arguments**
- `text` str | Pattern
  
  Text to locate the element for.
- `exact` bool *(optional)*
  
  Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### get_by_placeholder {/* #locator-get-by-placeholder */}



Allows locating input elements by the placeholder text.

**Usage**

For example, consider the following DOM structure.

```html
<input type="email" placeholder="name@example.com" />
```

You can fill the input after locating it by the placeholder text:

**sync**

```py
page.get_by_placeholder("name@example.com").fill("playwright@microsoft.com")
```

**async**

```py
await page.get_by_placeholder("name@example.com").fill("playwright@microsoft.com")
```

**Arguments**
- `text` str | Pattern
  
  Text to locate the element for.
- `exact` bool *(optional)*
  
  Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### get_by_role {/* #locator-get-by-role */}



Allows locating elements by their [ARIA role](https://www.w3.org/TR/wai-aria-1.2/#roles), [ARIA attributes](https://www.w3.org/TR/wai-aria-1.2/#aria-attributes) and [accessible name](https://w3c.github.io/accname/#dfn-accessible-name).

**Usage**

Consider the following DOM structure.

```html
<h3>Sign up</h3>
<label>
  <input type="checkbox" /> Subscribe
</label>
<br/>
<button>Submit</button>
```

You can locate each element by its implicit role:

**sync**

```py
expect(page.get_by_role("heading", name="Sign up")).to_be_visible()

page.get_by_role("checkbox", name="Subscribe").check()

page.get_by_role("button", name=re.compile("submit", re.IGNORECASE)).click()
```

**async**

```py
await expect(page.get_by_role("heading", name="Sign up")).to_be_visible()

await page.get_by_role("checkbox", name="Subscribe").check()

await page.get_by_role("button", name=re.compile("submit", re.IGNORECASE)).click()
```

**Arguments**
- `role` "alert" | "alertdialog" | "application" | "article" | "banner" | "blockquote" | "button" | "caption" | "cell" | "checkbox" | "code" | "columnheader" | "combobox" | "complementary" | "contentinfo" | "definition" | "deletion" | "dialog" | "directory" | "document" | "emphasis" | "feed" | "figure" | "form" | "generic" | "grid" | "gridcell" | "group" | "heading" | "img" | "insertion" | "link" | "list" | "listbox" | "listitem" | "log" | "main" | "marquee" | "math" | "meter" | "menu" | "menubar" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "navigation" | "none" | "note" | "option" | "paragraph" | "presentation" | "progressbar" | "radio" | "radiogroup" | "region" | "row" | "rowgroup" | "rowheader" | "scrollbar" | "search" | "searchbox" | "separator" | "slider" | "spinbutton" | "status" | "strong" | "subscript" | "superscript" | "switch" | "tab" | "table" | "tablist" | "tabpanel" | "term" | "textbox" | "time" | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem"
  
  Required aria role.
- `checked` bool *(optional)*
  
  An attribute that is usually set by `aria-checked` or native `<input type=checkbox>` controls.
  
  Learn more about [`aria-checked`](https://www.w3.org/TR/wai-aria-1.2/#aria-checked).
- `description` str | Pattern *(optional)* 
  
  Option to match the [accessible description](https://w3c.github.io/accname/#dfn-accessible-description). By default, matching is case-insensitive and searches for a substring, use [exact](/api/class-locator.mdx#locator-get-by-role-option-exact) to control this behavior.
  
  Learn more about [accessible description](https://w3c.github.io/accname/#dfn-accessible-description).
- `disabled` bool *(optional)*
  
  An attribute that is usually set by `aria-disabled` or `disabled`.
  
  :::note
  
  Unlike most other attributes, `disabled` is inherited through the DOM hierarchy. Learn more about [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled).
  :::
  
- `exact` bool *(optional)* 
  
  Whether [name](/api/class-locator.mdx#locator-get-by-role-option-name) and [description](/api/class-locator.mdx#locator-get-by-role-option-description) are matched exactly: case-sensitive and whole-string. Defaults to false. Ignored when the value is a regular expression. Note that exact match still trims whitespace.
- `expanded` bool *(optional)*
  
  An attribute that is usually set by `aria-expanded`.
  
  Learn more about [`aria-expanded`](https://www.w3.org/TR/wai-aria-1.2/#aria-expanded).
- `include_hidden` bool *(optional)*
  
  Option that controls whether hidden elements are matched. By default, only non-hidden elements, as [defined by ARIA](https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion), are matched by role selector.
  
  Learn more about [`aria-hidden`](https://www.w3.org/TR/wai-aria-1.2/#aria-hidden).
- `level` int *(optional)*
  
  A number attribute that is usually present for roles `heading`, `listitem`, `row`, `treeitem`, with default values for `<h1>-<h6>` elements.
  
  Learn more about [`aria-level`](https://www.w3.org/TR/wai-aria-1.2/#aria-level).
- `name` str | Pattern *(optional)*
  
  Option to match the [accessible name](https://w3c.github.io/accname/#dfn-accessible-name). By default, matching is case-insensitive and searches for a substring, use [exact](/api/class-locator.mdx#locator-get-by-role-option-exact) to control this behavior.
  
  Learn more about [accessible name](https://w3c.github.io/accname/#dfn-accessible-name).
- `pressed` bool *(optional)*
  
  An attribute that is usually set by `aria-pressed`.
  
  Learn more about [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.2/#aria-pressed).
- `selected` bool *(optional)*
  
  An attribute that is usually set by `aria-selected`.
  
  Learn more about [`aria-selected`](https://www.w3.org/TR/wai-aria-1.2/#aria-selected).

**Returns**
- Locator

**Details**

Role selector **does not replace** accessibility audits and conformance tests, but rather gives early feedback about the ARIA guidelines.

Many html elements have an implicitly [defined role](https://w3c.github.io/html-aam/#html-element-role-mappings) that is recognized by the role selector. You can find all the [supported roles here](https://www.w3.org/TR/wai-aria-1.2/#role_definitions). ARIA guidelines **do not recommend** duplicating implicit roles and attributes by setting `role` and/or `aria-*` attributes to default values.

---

### get_by_test_id {/* #locator-get-by-test-id */}



Locate element by the test id.

**Usage**

Consider the following DOM structure.

```html
<button data-testid="directions">Itinéraire</button>
```

You can locate the element by its test id:

**sync**

```py
page.get_by_test_id("directions").click()
```

**async**

```py
await page.get_by_test_id("directions").click()
```

**Arguments**
- `test_id` str | Pattern
  
  Id to locate the element by.

**Returns**
- Locator

**Details**

By default, the `data-testid` attribute is used as a test id. Use [selectors.set_test_id_attribute()](/api/class-selectors.mdx#selectors-set-test-id-attribute) to configure a different test id attribute if necessary.

---

### get_by_text {/* #locator-get-by-text */}



Allows locating elements that contain given text.

See also [locator.filter()](/api/class-locator.mdx#locator-filter) that allows to match by another criteria, like an accessible role, and then filter by the text content.

**Usage**

Consider the following DOM structure:

```html
<div>Hello <span>world</span></div>
<div>Hello</div>
```

You can locate by text substring, exact string, or a regular expression:

**sync**

```py
# Matches <span>
page.get_by_text("world")

# Matches first <div>
page.get_by_text("Hello world")

# Matches second <div>
page.get_by_text("Hello", exact=True)

# Matches both <div>s
page.get_by_text(re.compile("Hello"))

# Matches second <div>
page.get_by_text(re.compile("^hello$", re.IGNORECASE))
```

**async**

```py
# Matches <span>
page.get_by_text("world")

# Matches first <div>
page.get_by_text("Hello world")

# Matches second <div>
page.get_by_text("Hello", exact=True)

# Matches both <div>s
page.get_by_text(re.compile("Hello"))

# Matches second <div>
page.get_by_text(re.compile("^hello$", re.IGNORECASE))
```

**Arguments**
- `text` str | Pattern
  
  Text to locate the element for.
- `exact` bool *(optional)*
  
  Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

**Details**

Matching by text always normalizes whitespace, even with exact match. For example, it turns multiple spaces into one, turns line breaks into spaces and ignores leading and trailing whitespace.

Input elements of the type `button` and `submit` are matched by their `value` instead of the text content. For example, locating by text `"Log in"` matches `<input type=button value="Log in">`.

---

### get_by_title {/* #locator-get-by-title */}



Allows locating elements by their title attribute.

**Usage**

Consider the following DOM structure.

```html
<span title='Issues count'>25 issues</span>
```

You can check the issues count after locating it by the title text:

**sync**

```py
expect(page.get_by_title("Issues count")).to_have_text("25 issues")
```

**async**

```py
await expect(page.get_by_title("Issues count")).to_have_text("25 issues")
```

**Arguments**
- `text` str | Pattern
  
  Text to locate the element for.
- `exact` bool *(optional)*
  
  Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### hide_highlight {/* #locator-hide-highlight */}



Hides the element highlight previously added by [locator.highlight()](/api/class-locator.mdx#locator-highlight).

**Usage**

```python
locator.hide_highlight()
```

**Returns**
- NoneType

---

### highlight {/* #locator-highlight */}



Highlight the corresponding element(s) on the screen. Useful for debugging, don't commit the code that uses [locator.highlight()](/api/class-locator.mdx#locator-highlight).

**Usage**

```python
locator.highlight()
locator.highlight(**kwargs)
```

**Arguments**
- `style` str *(optional)* 
  
  Additional inline CSS applied to the highlight overlay, e.g. `"outline: 2px dashed red"`.

**Returns**
- Disposable

---

### hover {/* #locator-hover */}



Hover over the matching element.

**Usage**

**sync**

```py
page.get_by_role("link").hover()
```

**async**

```py
await page.get_by_role("link").hover()
```

**Arguments**
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `modifiers` List\"Alt" | "Control" | "ControlOrMeta" | "Meta" | "Shift"\ *(optional)*
  
  Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
- `no_wait_after` bool *(optional)* 
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `position` Dict *(optional)*
  - `x` float
    
    
  - `y` float
    
    
  A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
- `scroll` "auto" | "none" *(optional)* 
  
  Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `trial` bool *(optional)*
  
  When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- NoneType

**Details**

This method hovers over the element by performing the following steps:
1. Wait for [actionability](../actionability.mdx) checks on the element, unless [force](/api/class-locator.mdx#locator-hover-option-force) option is set.
1. Scroll the element into view if needed.
1. Use [page.mouse](/api/class-page.mdx#page-mouse) to hover over the center of the element, or the specified [position](/api/class-locator.mdx#locator-hover-option-position).

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [timeout](/api/class-locator.mdx#locator-hover-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

---

### inner_html {/* #locator-inner-html */}



Returns the [`element.innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML).

**Usage**

```python
locator.inner_html()
locator.inner_html(**kwargs)
```

**Arguments**
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- str

---

### inner_text {/* #locator-inner-text */}



Returns the [`element.innerText`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText).

:::warningAsserting text

If you need to assert text on the page, prefer [expect(locator).to_have_text()](/api/class-locatorassertions.mdx#locator-assertions-to-have-text) with [use_inner_text](/api/class-locatorassertions.mdx#locator-assertions-to-have-text-option-use-inner-text) option to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

```python
locator.inner_text()
locator.inner_text(**kwargs)
```

**Arguments**
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- str

---

### input_value {/* #locator-input-value */}



Returns the value for the matching `<input>` or `<textarea>` or `<select>` element.

:::warningAsserting value

If you need to assert input value, prefer [expect(locator).to_have_value()](/api/class-locatorassertions.mdx#locator-assertions-to-have-value) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

**sync**

```py
value = page.get_by_role("textbox").input_value()
```

**async**

```py
value = await page.get_by_role("textbox").input_value()
```

**Arguments**
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- str

**Details**

Throws elements that are not an input, textarea or a select. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), returns the value of the control.

---

### is_checked {/* #locator-is-checked */}



Returns whether the element is checked. Throws if the element is not a checkbox or radio input.

:::warningAsserting checked state

If you need to assert that checkbox is checked, prefer [expect(locator).to_be_checked()](/api/class-locatorassertions.mdx#locator-assertions-to-be-checked) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

**sync**

```py
checked = page.get_by_role("checkbox").is_checked()
```

**async**

```py
checked = await page.get_by_role("checkbox").is_checked()
```

**Arguments**
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- bool

---

### is_disabled {/* #locator-is-disabled */}



Returns whether the element is disabled, the opposite of [enabled](../actionability.mdx#enabled).

:::warningAsserting disabled state

If you need to assert that an element is disabled, prefer [expect(locator).to_be_disabled()](/api/class-locatorassertions.mdx#locator-assertions-to-be-disabled) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

**sync**

```py
disabled = page.get_by_role("button").is_disabled()
```

**async**

```py
disabled = await page.get_by_role("button").is_disabled()
```

**Arguments**
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- bool

---

### is_editable {/* #locator-is-editable */}



Returns whether the element is [editable](../actionability.mdx#editable). If the target element is not an `<input>`, `<textarea>`, `<select>`, `contenteditable` and does not have a role allowing `aria-readonly`, this method throws an error.

:::warningAsserting editable state

If you need to assert that an element is editable, prefer [expect(locator).to_be_editable()](/api/class-locatorassertions.mdx#locator-assertions-to-be-editable) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

**sync**

```py
editable = page.get_by_role("textbox").is_editable()
```

**async**

```py
editable = await page.get_by_role("textbox").is_editable()
```

**Arguments**
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- bool

---

### is_enabled {/* #locator-is-enabled */}



Returns whether the element is [enabled](../actionability.mdx#enabled).

:::warningAsserting enabled state

If you need to assert that an element is enabled, prefer [expect(locator).to_be_enabled()](/api/class-locatorassertions.mdx#locator-assertions-to-be-enabled) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

**sync**

```py
enabled = page.get_by_role("button").is_enabled()
```

**async**

```py
enabled = await page.get_by_role("button").is_enabled()
```

**Arguments**
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- bool

---

### is_hidden {/* #locator-is-hidden */}



Returns whether the element is hidden, the opposite of [visible](../actionability.mdx#visible).

:::warningAsserting visibility

If you need to assert that element is hidden, prefer [expect(locator).to_be_hidden()](/api/class-locatorassertions.mdx#locator-assertions-to-be-hidden) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

**sync**

```py
hidden = page.get_by_role("button").is_hidden()
```

**async**

```py
hidden = await page.get_by_role("button").is_hidden()
```

**Arguments**
- `timeout` float *(optional)*
  
  :::warningDeprecated
  This option is ignored. [locator.is_hidden()](/api/class-locator.mdx#locator-is-hidden) does not wait for the element to become hidden and returns immediately.
  :::
  

**Returns**
- bool

---

### is_visible {/* #locator-is-visible */}



Returns whether the element is [visible](../actionability.mdx#visible).

:::warningAsserting visibility

If you need to assert that element is visible, prefer [expect(locator).to_be_visible()](/api/class-locatorassertions.mdx#locator-assertions-to-be-visible) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

**sync**

```py
visible = page.get_by_role("button").is_visible()
```

**async**

```py
visible = await page.get_by_role("button").is_visible()
```

**Arguments**
- `timeout` float *(optional)*
  
  :::warningDeprecated
  This option is ignored. [locator.is_visible()](/api/class-locator.mdx#locator-is-visible) does not wait for the element to become visible and returns immediately.
  :::
  

**Returns**
- bool

---

### locator {/* #locator-locator */}



The method finds an element matching the specified selector in the locator's subtree. It also accepts filter options, similar to [locator.filter()](/api/class-locator.mdx#locator-filter) method.

[Learn more about locators](../locators.mdx).

**Usage**

```python
locator.locator(selector_or_locator)
locator.locator(selector_or_locator, **kwargs)
```

**Arguments**
- `selector_or_locator` str | Locator
  
  A selector or locator to use when resolving DOM element.
- `has` Locator *(optional)*
  
  Narrows down the results of the method to those which contain elements matching this relative locator. For example, `article` that has `text=Playwright` matches `<article><div>Playwright</div></article>`.
  
  Inner locator **must be relative** to the outer locator and is queried starting with the outer locator match, not the document root. For example, you can find `content` that has `div` in `<article><content><div>Playwright</div></content></article>`. However, looking for `content` that has `article div` will fail, because the inner locator must be relative and should not use any elements outside the `content`.
  
  Note that outer and inner locators must belong to the same frame. Inner locator must not contain FrameLocators.
- `has_not` Locator *(optional)* 
  
  Matches elements that do not contain an element that matches an inner locator. Inner locator is queried against the outer one. For example, `article` that does not have `div` matches `<article><span>Playwright</span></article>`.
  
  Note that outer and inner locators must belong to the same frame. Inner locator must not contain FrameLocators.
- `has_not_text` str | Pattern *(optional)* 
  
  Matches elements that do not contain specified text somewhere inside, possibly in a child or a descendant element. When passed a string, matching is case-insensitive and searches for a substring.
- `has_text` str | Pattern *(optional)*
  
  Matches elements containing specified text somewhere inside, possibly in a child or a descendant element. When passed a string, matching is case-insensitive and searches for a substring. For example, `"Playwright"` matches `<article><div>Playwright</div></article>`.

**Returns**
- Locator

---

### normalize {/* #locator-normalize */}



Returns a new locator that uses best practices for referencing the matched element, prioritizing test ids, aria roles, and other user-facing attributes over CSS selectors. This is useful for converting implementation-detail selectors into more resilient, human-readable locators.

**Usage**

```python
locator.normalize()
```

**Returns**
- Locator

---

### nth {/* #locator-nth */}



Returns locator to the n-th matching element. It's zero based, `nth(0)` selects the first element.

**Usage**

**sync**

```py
banana = page.get_by_role("listitem").nth(2)
```

**async**

```py
banana = await page.get_by_role("listitem").nth(2)
```

**Arguments**
- `index` int

**Returns**
- Locator

---

### or_ {/* #locator-or */}



Creates a locator matching all elements that match one or both of the two locators.

Note that when both locators match something, the resulting locator will have multiple matches, potentially causing a [locator strictness](../locators.mdx#strictness) violation.

**Usage**

Consider a scenario where you'd like to click on a "New email" button, but sometimes a security settings dialog shows up instead. In this case, you can wait for either a "New email" button, or a dialog and act accordingly.

:::note

If both "New email" button and security dialog appear on screen, the "or" locator will match both of them, possibly throwing the ["strict mode violation" error](../locators.mdx#strictness). In this case, you can use [locator.first](/api/class-locator.mdx#locator-first) to only match one of them.
:::

**sync**

```py
new_email = page.get_by_role("button", name="New")
dialog = page.get_by_text("Confirm security settings")
expect(new_email.or_(dialog).first).to_be_visible()
if (dialog.is_visible()):
  page.get_by_role("button", name="Dismiss").click()
new_email.click()
```

**async**

```py
new_email = page.get_by_role("button", name="New")
dialog = page.get_by_text("Confirm security settings")
await expect(new_email.or_(dialog).first).to_be_visible()
if (await dialog.is_visible()):
  await page.get_by_role("button", name="Dismiss").click()
await new_email.click()
```

**Arguments**
- `locator` Locator
  
  Alternative locator to match.

**Returns**
- Locator

---

### press {/* #locator-press */}



Focuses the matching element and presses a combination of the keys.

**Usage**

**sync**

```py
page.get_by_role("textbox").press("Backspace")
```

**async**

```py
await page.get_by_role("textbox").press("Backspace")
```

**Arguments**
- `key` str
  
  Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.
- `delay` float *(optional)*
  
  Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option will default to `true` in the future.
  :::
  
  
  Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

**Details**

Focuses the element, and then uses [keyboard.down()](/api/class-keyboard.mdx#keyboard-down) and [keyboard.up()](/api/class-keyboard.mdx#keyboard-up).

[key](/api/class-locator.mdx#locator-press-option-key) can specify the intended [keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value or a single character to generate the text for. A superset of the [key](/api/class-locator.mdx#locator-press-option-key) values can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`, `Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`, `ControlOrMeta`. `ControlOrMeta` resolves to `Control` on Windows and Linux and to `Meta` on macOS.

Holding down `Shift` will type the text that corresponds to the [key](/api/class-locator.mdx#locator-press-option-key) in the upper case.

If [key](/api/class-locator.mdx#locator-press-option-key) is a single character, it is case-sensitive, so the values `a` and `A` will generate different respective texts.

Shortcuts such as `key: "Control+o"`, `key: "Control++` or `key: "Control+Shift+T"` are supported as well. When specified with the modifier, modifier is pressed and being held while the subsequent key is being pressed.

---

### press_sequentially {/* #locator-press-sequentially */}



:::tip

In most cases, you should use [locator.fill()](/api/class-locator.mdx#locator-fill) instead. You only need to press keys one by one if there is special keyboard handling on the page.
:::

Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [locator.press()](/api/class-locator.mdx#locator-press).

**Usage**

**sync**

```py
locator.press_sequentially("hello") # types instantly
locator.press_sequentially("world", delay=100) # types slower, like a user
```

**async**

```py
await locator.press_sequentially("hello") # types instantly
await locator.press_sequentially("world", delay=100) # types slower, like a user
```

An example of typing into a text field and then submitting the form:

**sync**

```py
locator = page.get_by_label("Password")
locator.press_sequentially("my password")
locator.press("Enter")
```

**async**

```py
locator = page.get_by_label("Password")
await locator.press_sequentially("my password")
await locator.press("Enter")
```

**Arguments**
- `text` str
  
  String of characters to sequentially press into a focused element.
- `delay` float *(optional)*
  
  Time to wait between key presses in milliseconds. Defaults to 0.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

---

### screenshot {/* #locator-screenshot */}



Take a screenshot of the element matching the locator.

**Usage**

**sync**

```py
page.get_by_role("link").screenshot()
```

**async**

```py
await page.get_by_role("link").screenshot()
```

Disable animations and save screenshot to a file:

**sync**

```py
page.get_by_role("link").screenshot(animations="disabled", path="link.png")
```

**async**

```py
await page.get_by_role("link").screenshot(animations="disabled", path="link.png")
```

**Arguments**
- `animations` "disabled" | "allow" *(optional)*
  
  When set to `"disabled"`, stops CSS animations, CSS transitions and Web Animations. Animations get different treatment depending on their duration:
  * finite animations are fast-forwarded to completion, so they'll fire `transitionend` event.
  * infinite animations are canceled to initial state, and then played over after the screenshot.
  
  Defaults to `"allow"` that leaves animations untouched.
- `caret` "hide" | "initial" *(optional)*
  
  When set to `"hide"`, screenshot will hide text caret. When set to `"initial"`, text caret behavior will not be changed.  Defaults to `"hide"`.
- `mask` List\[Locator\] *(optional)*
  
  Specify locators that should be masked when the screenshot is taken. Masked elements will be overlaid with a pink box `#FF00FF` (customized by [mask_color](/api/class-locator.mdx#locator-screenshot-option-mask-color)) that completely covers its bounding box. The mask is also applied to invisible elements, see [Matching only visible elements](../locators.mdx#matching-only-visible-elements) to disable that.
- `mask_color` str *(optional)* 
  
  Specify the color of the overlay box for masked elements, in [CSS color format](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). Default color is pink `#FF00FF`.
- `omit_background` bool *(optional)*
  
  Hides default white background and allows capturing screenshots with transparency. Not applicable to `jpeg` images. Defaults to `false`.
- `path` Union\[str, pathlib.Path\] *(optional)*
  
  The file path to save the image to. The screenshot type will be inferred from file extension. If [path](/api/class-locator.mdx#locator-screenshot-option-path) is a relative path, then it is resolved relative to the current working directory. If no path is provided, the image won't be saved to the disk.
- `quality` int *(optional)*
  
  The quality of the image, between 0-100. Not applicable to `png` images. For `jpeg` the default is `80`. For `webp`, a quality of `100` (the default) produces a lossless image, while lower values use lossy compression.
- `scale` "css" | "device" *(optional)*
  
  When set to `"css"`, screenshot will have a single pixel per each css pixel on the page. For high-dpi devices, this will keep screenshots small. Using `"device"` option will produce a single pixel per each device pixel, so screenshots of high-dpi devices will be twice as large or even larger.
  
  Defaults to `"device"`.
- `style` str *(optional)* 
  
  Text of the stylesheet to apply while making the screenshot. This is where you can hide dynamic elements, make elements invisible or change their properties to help you creating repeatable screenshots. This stylesheet pierces the Shadow DOM and applies to the inner frames.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `type` "png" | "jpeg" | "webp" *(optional)*
  
  Specify screenshot type, defaults to `png`.

**Returns**
- bytes

**Details**

This method captures a screenshot of the page, clipped to the size and position of a particular element matching the locator. If the element is covered by other elements, it will not be actually visible on the screenshot. If the element is a scrollable container, only the currently scrolled content will be visible on the screenshot.

This method waits for the [actionability](../actionability.mdx) checks, then scrolls element into view before taking a screenshot. If the element is detached from DOM, the method throws an error.

Returns the buffer with the captured screenshot.

---

### scroll_into_view_if_needed {/* #locator-scroll-into-view-if-needed */}



This method waits for [actionability](../actionability.mdx) checks, then tries to scroll element into view, unless it is completely visible as defined by [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)'s `ratio`.

See [scrolling](../input.mdx#scrolling) for alternative ways to scroll.

**Usage**

```python
locator.scroll_into_view_if_needed()
locator.scroll_into_view_if_needed(**kwargs)
```

**Arguments**
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

---

### select_option {/* #locator-select-option */}



Selects option or options in `<select>`.

**Usage**

```html
<select multiple>
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</select>
```

**sync**

```py
# single selection matching the value or label
element.select_option("blue")
# single selection matching the label
element.select_option(label="blue")
# multiple selection for blue, red and second option
element.select_option(value="red", "green", "blue")
```

**async**

```py
# single selection matching the value or label
await element.select_option("blue")
# single selection matching the label
await element.select_option(label="blue")
# multiple selection for blue, red and second option
await element.select_option(value="red", "green", "blue")
```

**Arguments**
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `element` ElementHandle | List\[ElementHandle\] *(optional)*
  
  Option elements to select. Optional.
- `index` int | List\[int\] *(optional)*
  
  Options to select by index. Optional.
- `value` str | List\[str\] *(optional)*
  
  Options to select by value. If the `<select>` has the `multiple` attribute, all given options are selected, otherwise only the first option matching one of the passed options is selected. Optional.
- `label` str | List\[str\] *(optional)*
  
  Options to select by label. If the `<select>` has the `multiple` attribute, all given options are selected, otherwise only the first option matching one of the passed options is selected. Optional.

**Returns**
- List\[str\]

**Details**

This method waits for [actionability](../actionability.mdx) checks, waits until all specified options are present in the `<select>` element and selects these options.

If the target element is not a `<select>` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be used instead.

Returns the array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.

---

### select_text {/* #locator-select-text */}



This method waits for [actionability](../actionability.mdx) checks, then focuses the element and selects all its text content.

If the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), focuses and selects text in the control instead.

**Usage**

```python
locator.select_text()
locator.select_text(**kwargs)
```

**Arguments**
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

---

### set_checked {/* #locator-set-checked */}



Set the state of a checkbox or a radio element.

**Usage**

**sync**

```py
page.get_by_role("checkbox").set_checked(True)
```

**async**

```py
await page.get_by_role("checkbox").set_checked(True)
```

**Arguments**
- `checked` bool
  
  Whether to check or uncheck the checkbox.
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `position` Dict *(optional)*
  - `x` float
    
    
  - `y` float
    
    
  A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
- `scroll` "auto" | "none" *(optional)* 
  
  Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `trial` bool *(optional)*
  
  When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- NoneType

**Details**

This method checks or unchecks an element by performing the following steps:
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws.
1. If the element already has the right checked state, this method returns immediately.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [force](/api/class-locator.mdx#locator-set-checked-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [page.mouse](/api/class-page.mdx#page-mouse) to click in the center of the element.
1. Ensure that the element is now checked or unchecked. If not, this method throws.

When all steps combined have not finished during the specified [timeout](/api/class-locator.mdx#locator-set-checked-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

---

### set_input_files {/* #locator-set-input-files */}



Upload file or multiple files into `<input type=file>`. For inputs with a `webkitdirectory` attribute, only a single directory path is supported.

**Usage**

**sync**

```py
# Select one file
page.get_by_label("Upload file").set_input_files('myfile.pdf')

# Select multiple files
page.get_by_label("Upload files").set_input_files('file1.txt', 'file2.txt')

# Select a directory
page.get_by_label("Upload directory").set_input_files('mydir')

# Remove all the selected files
page.get_by_label("Upload file").set_input_files([])

# Upload buffer from memory
page.get_by_label("Upload file").set_input_files(
    files=
        {"name": "test.txt", "mimeType": "text/plain", "buffer": b"this is a test"}
    ,
)
```

**async**

```py
# Select one file
await page.get_by_label("Upload file").set_input_files('myfile.pdf')

# Select multiple files
await page.get_by_label("Upload files").set_input_files('file1.txt', 'file2.txt')

# Select a directory
await page.get_by_label("Upload directory").set_input_files('mydir')

# Remove all the selected files
await page.get_by_label("Upload file").set_input_files([])

# Upload buffer from memory
await page.get_by_label("Upload file").set_input_files(
    files=
        {"name": "test.txt", "mimeType": "text/plain", "buffer": b"this is a test"}
    ,
)
```

**Arguments**
- `files` Union\[str, pathlib.Path\] | List\[Union\[str, pathlib.Path\]\] | Dict | List\[Dict\]
  - `name` str
    
    File name
  - `mimeType` str
    
    File type
  - `buffer` bytes
    
    File content
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

**Details**

Sets the value of the file input to these file paths or files. If some of the `filePaths` are relative paths, then they are resolved relative to the current working directory. For empty array, clears the selected files.

This method expects Locator to point to an [input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input). However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), targets the control instead.

---

### tap {/* #locator-tap */}



Perform a tap gesture on the element matching the locator. For examples of emulating other gestures by manually dispatching touch events, see the [emulating legacy touch events](../touch-events.mdx) page.

**Usage**

```python
locator.tap()
locator.tap(**kwargs)
```

**Arguments**
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `modifiers` List\"Alt" | "Control" | "ControlOrMeta" | "Meta" | "Shift"\ *(optional)*
  
  Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `position` Dict *(optional)*
  - `x` float
    
    
  - `y` float
    
    
  A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
- `scroll` "auto" | "none" *(optional)* 
  
  Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `trial` bool *(optional)*
  
  When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- NoneType

**Details**

This method taps the element by performing the following steps:
1. Wait for [actionability](../actionability.mdx) checks on the element, unless [force](/api/class-locator.mdx#locator-tap-option-force) option is set.
1. Scroll the element into view if needed.
1. Use [page.touchscreen](/api/class-page.mdx#page-touchscreen) to tap the center of the element, or the specified [position](/api/class-locator.mdx#locator-tap-option-position).

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [timeout](/api/class-locator.mdx#locator-tap-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

:::note

`element.tap()` requires that the `hasTouch` option of the browser context be set to true.
:::

---

### text_content {/* #locator-text-content */}



Returns the [`node.textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent).

:::warningAsserting text

If you need to assert text on the page, prefer [expect(locator).to_have_text()](/api/class-locatorassertions.mdx#locator-assertions-to-have-text) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

```python
locator.text_content()
locator.text_content(**kwargs)
```

**Arguments**
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType | str

---

### uncheck {/* #locator-uncheck */}



Ensure that checkbox or radio element is unchecked.

**Usage**

**sync**

```py
page.get_by_role("checkbox").uncheck()
```

**async**

```py
await page.get_by_role("checkbox").uncheck()
```

**Arguments**
- `force` bool *(optional)*
  
  Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `position` Dict *(optional)*
  - `x` float
    
    
  - `y` float
    
    
  A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
- `scroll` "auto" | "none" *(optional)* 
  
  Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.
- `trial` bool *(optional)*
  
  When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- NoneType

**Details**

This method unchecks the element by performing the following steps:
1. Ensure that element is a checkbox or a radio input. If not, this method throws. If the element is already unchecked, this method returns immediately.
1. Wait for [actionability](../actionability.mdx) checks on the element, unless [force](/api/class-locator.mdx#locator-uncheck-option-force) option is set.
1. Scroll the element into view if needed.
1. Use [page.mouse](/api/class-page.mdx#page-mouse) to click in the center of the element.
1. Ensure that the element is now unchecked. If not, this method throws.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [timeout](/api/class-locator.mdx#locator-uncheck-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

---

### wait_for {/* #locator-wait-for */}



Returns when element specified by locator satisfies the [state](/api/class-locator.mdx#locator-wait-for-option-state) option.

If target element already satisfies the condition, the method returns immediately. Otherwise, waits for up to [timeout](/api/class-locator.mdx#locator-wait-for-option-timeout) milliseconds until the condition is met.

**Usage**

**sync**

```py
order_sent = page.locator("#order-sent")
order_sent.wait_for()
```

**async**

```py
order_sent = page.locator("#order-sent")
await order_sent.wait_for()
```

**Arguments**
- `state` "attached" | "detached" | "visible" | "hidden" *(optional)*
  
  Defaults to `'visible'`. Can be either:
  * `'attached'` - wait for element to be present in DOM.
  * `'detached'` - wait for element to not be present in DOM.
  * `'visible'` - wait for element to have non-empty bounding box and no `visibility:hidden`. Note that element without any content or with `display:none` has an empty bounding box and is not considered visible.
  * `'hidden'` - wait for element to be either detached from DOM, or have an empty bounding box or `visibility:hidden`. This is opposite to the `'visible'` option.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

---

### wait_for_function {/* #locator-wait-for-function */}



Returns when [expression](/api/class-locator.mdx#locator-wait-for-function-option-expression) returns a truthy value, called with the matching element as a first argument, and [arg](/api/class-locator.mdx#locator-wait-for-function-option-arg) as a second argument.

This is a generic way to wait for an element to reach a custom condition without asserting it. The locator is re-resolved on each retry, so it tolerates the element being re-rendered while waiting.

If [expression](/api/class-locator.mdx#locator-wait-for-function-option-expression) returns a Promise, this method will wait for the promise to resolve before checking its value.

If [expression](/api/class-locator.mdx#locator-wait-for-function-option-expression) throws or rejects, this method throws.

**Usage**

Wait for an attribute to appear:

Passing argument to [expression](/api/class-locator.mdx#locator-wait-for-function-option-expression):

**Arguments**
- `expression` str
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument *(optional)*
  
  Optional argument to pass to [expression](/api/class-locator.mdx#locator-wait-for-function-option-expression).
- `timeout` float *(optional)*
  
  Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType

---

## Properties

### content_frame {/* #locator-content-frame */}



Returns a FrameLocator object pointing to the same `iframe` as this locator.

Useful when you have a Locator object obtained somewhere, and later on would like to interact with the content inside the frame.

For a reverse operation, use [frame_locator.owner](/api/class-framelocator.mdx#frame-locator-owner).

**Usage**

**sync**

```py
locator = page.locator("iframename=\"embedded\"")
# ...
frame_locator = locator.content_frame
frame_locator.get_by_role("button").click()
```

**async**

```py
locator = page.locator("iframename=\"embedded\"")
# ...
frame_locator = locator.content_frame
await frame_locator.get_by_role("button").click()
```

**Returns**
- FrameLocator

---

### description {/* #locator-description */}



Returns locator description previously set with [locator.describe()](/api/class-locator.mdx#locator-describe). Returns `null` if no custom description has been set.

**Usage**

**sync**

```py
button = page.get_by_role("button").describe("Subscribe button")
print(button.description())  # "Subscribe button"

input = page.get_by_role("textbox")
print(input.description())  # None
```

**async**

```py
button = page.get_by_role("button").describe("Subscribe button")
print(button.description())  # "Subscribe button"

input = page.get_by_role("textbox")
print(input.description())  # None
```

**Returns**
- NoneType | str

---

### first {/* #locator-first */}



Returns locator to the first matching element.

**Usage**

```python
locator.first
```

**Returns**
- Locator

---

### last {/* #locator-last */}



Returns locator to the last matching element.

**Usage**

**sync**

```py
banana = page.get_by_role("listitem").last
```

**async**

```py
banana = await page.get_by_role("listitem").last
```

**Returns**
- Locator

---

### page {/* #locator-page */}



A page this locator belongs to.

**Usage**

```python
locator.page
```

**Returns**
- Page

---

## Deprecated

### element_handle {/* #locator-element-handle */}



:::warningDiscouraged

Always prefer using Locators and web assertions over ElementHandles because latter are inherently racy.

:::


Resolves given locator to the first matching DOM element. If there are no matching elements, waits for one. If multiple elements match the locator, throws.

**Usage**

```python
locator.element_handle()
locator.element_handle(**kwargs)
```

**Arguments**
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- ElementHandle

---

### element_handles {/* #locator-element-handles */}



:::warningDiscouraged

Always prefer using Locators and web assertions over ElementHandles because latter are inherently racy.

:::


Resolves given locator to all matching DOM elements. If there are no matching elements, returns an empty list.

**Usage**

```python
locator.element_handles()
```

**Returns**
- List\[ElementHandle\]

---

### type {/* #locator-type */}



:::warningDeprecated

In most cases, you should use [locator.fill()](/api/class-locator.mdx#locator-fill) instead. You only need to press keys one by one if there is special keyboard handling on the page - in this case use [locator.press_sequentially()](/api/class-locator.mdx#locator-press-sequentially).

:::


Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [locator.press()](/api/class-locator.mdx#locator-press).

**Usage**

**Arguments**
- `text` str
  
  A text to type into a focused element.
- `delay` float *(optional)*
  
  Time to wait between key presses in milliseconds. Defaults to 0.
- `no_wait_after` bool *(optional)*
  
  :::warningDeprecated
  This option has no effect.
  :::
  
  
  This option has no effect.
- `timeout` float *(optional)*
  
  Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [browser_context.set_default_timeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [page.set_default_timeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- NoneType


APIRequest: /api/class-apirequest.mdx "APIRequest"
APIRequestContext: /api/class-apirequestcontext.mdx "APIRequestContext"
APIResponse: /api/class-apiresponse.mdx "APIResponse"
APIResponseAssertions: /api/class-apiresponseassertions.mdx "APIResponseAssertions"
Browser: /api/class-browser.mdx "Browser"
BrowserContext: /api/class-browsercontext.mdx "BrowserContext"
BrowserType: /api/class-browsertype.mdx "BrowserType"
CDPSession: /api/class-cdpsession.mdx "CDPSession"
Clock: /api/class-clock.mdx "Clock"
ConsoleMessage: /api/class-consolemessage.mdx "ConsoleMessage"
Credentials: /api/class-credentials.mdx "Credentials"
Debugger: /api/class-debugger.mdx "Debugger"
Dialog: /api/class-dialog.mdx "Dialog"
Download: /api/class-download.mdx "Download"
ElementHandle: /api/class-elementhandle.mdx "ElementHandle"
Error: /api/class-error.mdx "Error"
FileChooser: /api/class-filechooser.mdx "FileChooser"
FormData: /api/class-formdata.mdx "FormData"
Frame: /api/class-frame.mdx "Frame"
FrameLocator: /api/class-framelocator.mdx "FrameLocator"
JSHandle: /api/class-jshandle.mdx "JSHandle"
Keyboard: /api/class-keyboard.mdx "Keyboard"
Locator: /api/class-locator.mdx "Locator"
LocatorAssertions: /api/class-locatorassertions.mdx "LocatorAssertions"
Mouse: /api/class-mouse.mdx "Mouse"
Page: /api/class-page.mdx "Page"
PageAssertions: /api/class-pageassertions.mdx "PageAssertions"
Playwright: /api/class-playwright.mdx "Playwright"
Request: /api/class-request.mdx "Request"
Response: /api/class-response.mdx "Response"
Route: /api/class-route.mdx "Route"
Screencast: /api/class-screencast.mdx "Screencast"
Selectors: /api/class-selectors.mdx "Selectors"
TimeoutError: /api/class-timeouterror.mdx "TimeoutError"
Touchscreen: /api/class-touchscreen.mdx "Touchscreen"
Tracing: /api/class-tracing.mdx "Tracing"
Video: /api/class-video.mdx "Video"
WebError: /api/class-weberror.mdx "WebError"
WebSocket: /api/class-websocket.mdx "WebSocket"
WebSocketRoute: /api/class-websocketroute.mdx "WebSocketRoute"
WebStorage: /api/class-webstorage.mdx "WebStorage"
Worker: /api/class-worker.mdx "Worker"
Element: https://developer.mozilla.org/en-US/docs/Web/API/element "Element"
EvaluationArgument: /evaluating.mdx#evaluation-argument "EvaluationArgument"
Promise: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
iterator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols "Iterator"
origin: https://developer.mozilla.org/en-US/docs/Glossary/Origin "Origin"
selector: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors "selector"
Serializable: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description "Serializable"
UIEvent.detail: https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail "UIEvent.detail"
UnixTime: https://en.wikipedia.org/wiki/Unix_time "Unix Time"
xpath: https://developer.mozilla.org/en-US/docs/Web/XPath "xpath"

Any: https://docs.python.org/3/library/typing.html#typing.Any "Any"
bool: https://docs.python.org/3/library/stdtypes.html "bool"
bytes: https://docs.python.org/3/library/stdtypes.html#bytes "bytes"
Callable: https://docs.python.org/3/library/typing.html#typing.Callable "Callable"
EventContextManager: https://docs.python.org/3/reference/datamodel.html#context-managers "Event context manager"
EventEmitter: https://pyee.readthedocs.io/en/latest/#pyee.BaseEventEmitter "EventEmitter"
Exception: https://docs.python.org/3/library/exceptions.html#Exception "Exception"
Dict: https://docs.python.org/3/library/typing.html#typing.Dict "Dict"
float: https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex "float"
int: https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex "int"
List: https://docs.python.org/3/library/typing.html#typing.List "List"
NoneType: https://docs.python.org/3/library/constants.html#None "None"
Pattern: https://docs.python.org/3/library/re.html "Pattern"
URL: https://en.wikipedia.org/wiki/URL "URL"
pathlib.Path: https://realpython.com/python-pathlib/ "pathlib.Path"
str: https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str "str"
Union: https://docs.python.org/3/library/typing.html#typing.Union "Union"
datetime: https://docs.python.org/3/library/datetime.html#datetime.datetime "datetime"

all available image tags: https://mcr.microsoft.com/en-us/product/playwright/python/about "all available image tags"
Microsoft Artifact Registry: https://mcr.microsoft.com/en-us/product/playwright/python/about "Microsoft Artifact Registry"
Dockerfile.noble: https://github.com/microsoft/playwright-python/blob/main/utils/docker/Dockerfile.noble "Dockerfile.noble"
