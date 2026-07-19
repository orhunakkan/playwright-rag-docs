# ElementHandle

> **Source:** [playwright.dev/dotnet/docs/api/class-elementhandle](https://playwright.dev/dotnet/docs/api/class-elementhandle)

---

* extends: JSHandle

ElementHandle represents an in-page DOM element. ElementHandles can be created with the [Page.QuerySelectorAsync()](/api/class-page.mdx#page-query-selector) method.

:::warningDiscouraged

The use of ElementHandle is discouraged, use Locator objects and web-first assertions instead.
:::

```csharp
var handle = await page.QuerySelectorAsync("a");
await handle.ClickAsync();
```

ElementHandle prevents DOM element from garbage collection unless the handle is disposed with [JsHandle.DisposeAsync()](/api/class-jshandle.mdx#js-handle-dispose). ElementHandles are auto-disposed when their origin frame gets navigated.

ElementHandle instances can be used as an argument in [Page.EvalOnSelectorAsync()](/api/class-page.mdx#page-eval-on-selector) and [Page.EvaluateAsync()](/api/class-page.mdx#page-evaluate) methods.

The difference between the Locator and ElementHandle is that the ElementHandle points to a particular element, while Locator captures the logic of how to retrieve an element.

In the example below, handle points to a particular DOM element on page. If that element changes text or is used by React to render an entirely different component, handle is still pointing to that very DOM element. This can lead to unexpected behaviors.

```csharp
var handle = await page.QuerySelectorAsync("text=Submit");
await handle.HoverAsync();
await handle.ClickAsync();
```

With the locator, every time the `element` is used, up-to-date DOM element is located in the page using the selector. So in the snippet below, underlying DOM element is going to be located twice.

```csharp
var locator = page.GetByText("Submit");
await locator.HoverAsync();
await locator.ClickAsync();
```


---

## Methods

### BoundingBoxAsync {/* #element-handle-bounding-box */}



This method returns the bounding box of the element, or `null` if the element is not visible. The bounding box is calculated relative to the main frame viewport - which is usually the same as the browser window.

Scrolling affects the returned bounding box, similarly to [Element.getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect). That means `x` and/or `y` may be negative.

Elements from child frames return the bounding box relative to the main frame, unlike the [Element.getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).

Assuming the page is static, it is safe to use bounding box coordinates to perform input. For example, the following snippet should click the center of the element.

**Usage**

```csharp
var box = await elementHandle.BoundingBoxAsync();
await page.Mouse.ClickAsync(box.X + box.Width / 2, box.Y + box.Height / 2);
```

**Returns**
- BoundingBox?
  - `x` float
    
    the x coordinate of the element in pixels.
  - `y` float
    
    the y coordinate of the element in pixels.
  - `width` float
    
    the width of the element in pixels.
  - `height` float
    
    the height of the element in pixels.

---

### ContentFrameAsync {/* #element-handle-content-frame */}



Returns the content frame for element handles referencing iframe nodes, or `null` otherwise

**Usage**

```csharp
await ElementHandle.ContentFrameAsync();
```

**Returns**
- Frame?

---

### OwnerFrameAsync {/* #element-handle-owner-frame */}



Returns the frame containing the given element.

**Usage**

```csharp
await ElementHandle.OwnerFrameAsync();
```

**Returns**
- Frame?

---

### WaitForElementStateAsync {/* #element-handle-wait-for-element-state */}



Returns when the element satisfies the [state](/api/class-elementhandle.mdx#element-handle-wait-for-element-state-option-state).

Depending on the [state](/api/class-elementhandle.mdx#element-handle-wait-for-element-state-option-state) parameter, this method waits for one of the [actionability](../actionability.mdx) checks to pass. This method throws when the element is detached while waiting, unless waiting for the `"hidden"` state.
* `"visible"` Wait until the element is [visible](../actionability.mdx#visible).
* `"hidden"` Wait until the element is [not visible](../actionability.mdx#visible) or not attached. Note that waiting for hidden does not throw when the element detaches.
* `"stable"` Wait until the element is both [visible](../actionability.mdx#visible) and [stable](../actionability.mdx#stable).
* `"enabled"` Wait until the element is [enabled](../actionability.mdx#enabled).
* `"disabled"` Wait until the element is [not enabled](../actionability.mdx#enabled).
* `"editable"` Wait until the element is [editable](../actionability.mdx#editable).

If the element does not satisfy the condition for the [Timeout](/api/class-elementhandle.mdx#element-handle-wait-for-element-state-option-timeout) milliseconds, this method will throw.

**Usage**

```csharp
await ElementHandle.WaitForElementStateAsync(state, options);
```

**Arguments**
- `state` `enum ElementState { Visible, Hidden, Stable, Enabled, Disabled, Editable }`
  
  A state to wait for, see below for more details.
- `options` `ElementHandleWaitForElementStateOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

## Deprecated

### CheckAsync {/* #element-handle-check */}



:::warningDiscouraged

Use locator-based [Locator.CheckAsync()](/api/class-locator.mdx#locator-check) instead. Read more about [locators](../locators.mdx).

:::


This method checks the element by performing the following steps:
1. Ensure that element is a checkbox or a radio input. If not, this method throws. If the element is already checked, this method returns immediately.
1. Wait for [actionability](../actionability.mdx) checks on the element, unless [Force](/api/class-elementhandle.mdx#element-handle-check-option-force) option is set.
1. Scroll the element into view if needed.
1. Use [Page.Mouse](/api/class-page.mdx#page-mouse) to click in the center of the element.
1. Ensure that the element is now checked. If not, this method throws.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [Timeout](/api/class-elementhandle.mdx#element-handle-check-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```csharp
await ElementHandle.CheckAsync(options);
```

**Arguments**
- `options` `ElementHandleCheckOptions?` *(optional)*
  - `Force` bool? *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Position` Position? *(optional)* 
    - `X` float
      
      
    - `Y` float
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `Scroll` `enum ScrollMode { Auto, None }?` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `Trial` bool? *(optional)* 
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- void

---

### ClickAsync {/* #element-handle-click */}



:::warningDiscouraged

Use locator-based [Locator.ClickAsync()](/api/class-locator.mdx#locator-click) instead. Read more about [locators](../locators.mdx).

:::


This method clicks the element by performing the following steps:
1. Wait for [actionability](../actionability.mdx) checks on the element, unless [Force](/api/class-elementhandle.mdx#element-handle-click-option-force) option is set.
1. Scroll the element into view if needed.
1. Use [Page.Mouse](/api/class-page.mdx#page-mouse) to click in the center of the element, or the specified [Position](/api/class-elementhandle.mdx#element-handle-click-option-position).
1. Wait for initiated navigations to either succeed or fail, unless [NoWaitAfter](/api/class-elementhandle.mdx#element-handle-click-option-no-wait-after) option is set.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [Timeout](/api/class-elementhandle.mdx#element-handle-click-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```csharp
await ElementHandle.ClickAsync(options);
```

**Arguments**
- `options` `ElementHandleClickOptions?` *(optional)*
  - `Button` `enum MouseButton { Left, Right, Middle }?` *(optional)*
    
    Defaults to `left`.
  - `ClickCount` int? *(optional)*
    
    defaults to 1. See UIEvent.detail.
  - `Delay` float? *(optional)*
    
    Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
  - `Force` bool? *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `Modifiers` IEnumerable?<`enum KeyboardModifier { Alt, Control, ControlOrMeta, Meta, Shift }`> *(optional)*
    
    Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option will default to `true` in the future.
    :::
    
    
    Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `Position` Position? *(optional)*
    - `X` float
      
      
    - `Y` float
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `Scroll` `enum ScrollMode { Auto, None }?` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `Steps` int? *(optional)* 
    
    Defaults to 1. Sends `n` interpolated `mousemove` events to represent travel between Playwright's current cursor position and the provided destination. When set to 1, emits a single `mousemove` event at the destination location.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `Trial` bool? *(optional)* 
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- void

---

### DblClickAsync {/* #element-handle-dblclick */}



:::warningDiscouraged

Use locator-based [Locator.DblClickAsync()](/api/class-locator.mdx#locator-dblclick) instead. Read more about [locators](../locators.mdx).

:::


This method double clicks the element by performing the following steps:
1. Wait for [actionability](../actionability.mdx) checks on the element, unless [Force](/api/class-elementhandle.mdx#element-handle-dblclick-option-force) option is set.
1. Scroll the element into view if needed.
1. Use [Page.Mouse](/api/class-page.mdx#page-mouse) to double click in the center of the element, or the specified [Position](/api/class-elementhandle.mdx#element-handle-dblclick-option-position).

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [Timeout](/api/class-elementhandle.mdx#element-handle-dblclick-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

:::note

`elementHandle.dblclick()` dispatches two `click` events and a single `dblclick` event.
:::

**Usage**

```csharp
await ElementHandle.DblClickAsync(options);
```

**Arguments**
- `options` `ElementHandleDblClickOptions?` *(optional)*
  - `Button` `enum MouseButton { Left, Right, Middle }?` *(optional)*
    
    Defaults to `left`.
  - `Delay` float? *(optional)*
    
    Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
  - `Force` bool? *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `Modifiers` IEnumerable?<`enum KeyboardModifier { Alt, Control, ControlOrMeta, Meta, Shift }`> *(optional)*
    
    Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Position` Position? *(optional)*
    - `X` float
      
      
    - `Y` float
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `Scroll` `enum ScrollMode { Auto, None }?` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `Steps` int? *(optional)* 
    
    Defaults to 1. Sends `n` interpolated `mousemove` events to represent travel between Playwright's current cursor position and the provided destination. When set to 1, emits a single `mousemove` event at the destination location.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `Trial` bool? *(optional)* 
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- void

---

### DispatchEventAsync {/* #element-handle-dispatch-event */}



:::warningDiscouraged

Use locator-based [Locator.DispatchEventAsync()](/api/class-locator.mdx#locator-dispatch-event) instead. Read more about [locators](../locators.mdx).

:::


The snippet below dispatches the `click` event on the element. Regardless of the visibility state of the element, `click` is dispatched. This is equivalent to calling [element.click()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click).

**Usage**

```csharp
await elementHandle.DispatchEventAsync("click");
```

Under the hood, it creates an instance of an event based on the given [type](/api/class-elementhandle.mdx#element-handle-dispatch-event-option-type), initializes it with [eventInit](/api/class-elementhandle.mdx#element-handle-dispatch-event-option-event-init) properties and dispatches it on the element. Events are `composed`, `cancelable` and bubble by default.

Since [eventInit](/api/class-elementhandle.mdx#element-handle-dispatch-event-option-event-init) is event-specific, please refer to the events documentation for the lists of initial properties:
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

You can also specify `JSHandle` as the property value if you want live objects to be passed into the event:

```csharp
var dataTransfer = await page.EvaluateHandleAsync("() => new DataTransfer()");
await elementHandle.DispatchEventAsync("dragstart", new Dictionary<string, object>
{
    { "dataTransfer", dataTransfer }
});
```

**Arguments**
- `type` string
  
  DOM event type: `"click"`, `"dragstart"`, etc.
- `eventInit` EvaluationArgument? *(optional)*
  
  Optional event-specific initialization properties.

**Returns**
- void

---

### EvalOnSelectorAsync {/* #element-handle-eval-on-selector */}



:::warningDiscouraged

This method does not wait for the element to pass actionability checks and therefore can lead to the flaky tests. Use [Locator.EvaluateAsync()](/api/class-locator.mdx#locator-evaluate), other Locator helper methods or web-first assertions instead.

:::


Returns the return value of [expression](/api/class-elementhandle.mdx#element-handle-eval-on-selector-option-expression).

The method finds an element matching the specified selector in the `ElementHandle`s subtree and passes it as a first argument to [expression](/api/class-elementhandle.mdx#element-handle-eval-on-selector-option-expression). If no elements match the selector, the method throws an error.

If [expression](/api/class-elementhandle.mdx#element-handle-eval-on-selector-option-expression) returns a Promise, then [ElementHandle.EvalOnSelectorAsync()](/api/class-elementhandle.mdx#element-handle-eval-on-selector) would wait for the promise to resolve and return its value.

**Usage**

```csharp
var tweetHandle = await page.QuerySelectorAsync(".tweet");
Assert.AreEqual("100", await tweetHandle.EvalOnSelectorAsync(".like", "node => node.innerText"));
Assert.AreEqual("10", await tweetHandle.EvalOnSelectorAsync(".retweets", "node => node.innerText"));
```

**Arguments**
- `selector` string
  
  A selector to query for.
- `expression` string
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument? *(optional)*
  
  Optional argument to pass to [expression](/api/class-elementhandle.mdx#element-handle-eval-on-selector-option-expression).

**Returns**
- object

---

### EvalOnSelectorAllAsync {/* #element-handle-eval-on-selector-all */}



:::warningDiscouraged

In most cases, [Locator.EvaluateAllAsync()](/api/class-locator.mdx#locator-evaluate-all), other Locator helper methods and web-first assertions do a better job.

:::


Returns the return value of [expression](/api/class-elementhandle.mdx#element-handle-eval-on-selector-all-option-expression).

The method finds all elements matching the specified selector in the `ElementHandle`'s subtree and passes an array of matched elements as a first argument to [expression](/api/class-elementhandle.mdx#element-handle-eval-on-selector-all-option-expression).

If [expression](/api/class-elementhandle.mdx#element-handle-eval-on-selector-all-option-expression) returns a Promise, then [ElementHandle.EvalOnSelectorAllAsync()](/api/class-elementhandle.mdx#element-handle-eval-on-selector-all) would wait for the promise to resolve and return its value.

**Usage**

```html
<div class="feed">
  <div class="tweet">Hello!</div>
  <div class="tweet">Hi!</div>
</div>
```

```csharp
var feedHandle = await page.QuerySelectorAsync(".feed");
Assert.AreEqual(new [] { "Hello!", "Hi!" }, await feedHandle.EvalOnSelectorAllAsync<string[]>(".tweet", "nodes => nodes.map(n => n.innerText)"));
```

**Arguments**
- `selector` string
  
  A selector to query for.
- `expression` string
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument? *(optional)*
  
  Optional argument to pass to [expression](/api/class-elementhandle.mdx#element-handle-eval-on-selector-all-option-expression).

**Returns**
- object

---

### FillAsync {/* #element-handle-fill */}



:::warningDiscouraged

Use locator-based [Locator.FillAsync()](/api/class-locator.mdx#locator-fill) instead. Read more about [locators](../locators.mdx).

:::


This method waits for [actionability](../actionability.mdx) checks, focuses the element, fills it and triggers an `input` event after filling. Note that you can pass an empty string to clear the input field.

If the target element is not an `<input>`, `<textarea>` or `contenteditable` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be filled instead.

To send fine-grained keyboard events, use [Locator.PressSequentiallyAsync()](/api/class-locator.mdx#locator-press-sequentially).

**Usage**

```csharp
await ElementHandle.FillAsync(value, options);
```

**Arguments**
- `value` string
  
  Value to set for the `<input>`, `<textarea>` or `contenteditable` element.
- `options` `ElementHandleFillOptions?` *(optional)*
  - `Force` bool? *(optional)* 
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### FocusAsync {/* #element-handle-focus */}



:::warningDiscouraged

Use locator-based [Locator.FocusAsync()](/api/class-locator.mdx#locator-focus) instead. Read more about [locators](../locators.mdx).

:::


Calls [focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) on the element.

**Usage**

```csharp
await ElementHandle.FocusAsync();
```

**Returns**
- void

---

### GetAttributeAsync {/* #element-handle-get-attribute */}



:::warningDiscouraged

Use locator-based [Locator.GetAttributeAsync()](/api/class-locator.mdx#locator-get-attribute) instead. Read more about [locators](../locators.mdx).

:::


Returns element attribute value.

**Usage**

```csharp
await ElementHandle.GetAttributeAsync(name);
```

**Arguments**
- `name` string
  
  Attribute name to get the value for.

**Returns**
- string?

---

### HoverAsync {/* #element-handle-hover */}



:::warningDiscouraged

Use locator-based [Locator.HoverAsync()](/api/class-locator.mdx#locator-hover) instead. Read more about [locators](../locators.mdx).

:::


This method hovers over the element by performing the following steps:
1. Wait for [actionability](../actionability.mdx) checks on the element, unless [Force](/api/class-elementhandle.mdx#element-handle-hover-option-force) option is set.
1. Scroll the element into view if needed.
1. Use [Page.Mouse](/api/class-page.mdx#page-mouse) to hover over the center of the element, or the specified [Position](/api/class-elementhandle.mdx#element-handle-hover-option-position).

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [Timeout](/api/class-elementhandle.mdx#element-handle-hover-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```csharp
await ElementHandle.HoverAsync(options);
```

**Arguments**
- `options` `ElementHandleHoverOptions?` *(optional)*
  - `Force` bool? *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `Modifiers` IEnumerable?<`enum KeyboardModifier { Alt, Control, ControlOrMeta, Meta, Shift }`> *(optional)*
    
    Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
  - `NoWaitAfter` bool? *(optional)* 
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Position` Position? *(optional)*
    - `X` float
      
      
    - `Y` float
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `Scroll` `enum ScrollMode { Auto, None }?` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `Trial` bool? *(optional)* 
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- void

---

### InnerHTMLAsync {/* #element-handle-inner-html */}



:::warningDiscouraged

Use locator-based [Locator.InnerHTMLAsync()](/api/class-locator.mdx#locator-inner-html) instead. Read more about [locators](../locators.mdx).

:::


Returns the `element.innerHTML`.

**Usage**

```csharp
await ElementHandle.InnerHTMLAsync();
```

**Returns**
- string

---

### InnerTextAsync {/* #element-handle-inner-text */}



:::warningDiscouraged

Use locator-based [Locator.InnerTextAsync()](/api/class-locator.mdx#locator-inner-text) instead. Read more about [locators](../locators.mdx).

:::


Returns the `element.innerText`.

**Usage**

```csharp
await ElementHandle.InnerTextAsync();
```

**Returns**
- string

---

### InputValueAsync {/* #element-handle-input-value */}



:::warningDiscouraged

Use locator-based [Locator.InputValueAsync()](/api/class-locator.mdx#locator-input-value) instead. Read more about [locators](../locators.mdx).

:::


Returns `input.value` for the selected `<input>` or `<textarea>` or `<select>` element.

Throws for non-input elements. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), returns the value of the control.

**Usage**

```csharp
await ElementHandle.InputValueAsync(options);
```

**Arguments**
- `options` `ElementHandleInputValueOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    :::warningDeprecated
    This option is ignored. The value is returned immediately.
    :::
    

**Returns**
- string

---

### IsCheckedAsync {/* #element-handle-is-checked */}



:::warningDiscouraged

Use locator-based [Locator.IsCheckedAsync()](/api/class-locator.mdx#locator-is-checked) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is checked. Throws if the element is not a checkbox or radio input.

**Usage**

```csharp
await ElementHandle.IsCheckedAsync();
```

**Returns**
- bool

---

### IsDisabledAsync {/* #element-handle-is-disabled */}



:::warningDiscouraged

Use locator-based [Locator.IsDisabledAsync()](/api/class-locator.mdx#locator-is-disabled) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is disabled, the opposite of [enabled](../actionability.mdx#enabled).

**Usage**

```csharp
await ElementHandle.IsDisabledAsync();
```

**Returns**
- bool

---

### IsEditableAsync {/* #element-handle-is-editable */}



:::warningDiscouraged

Use locator-based [Locator.IsEditableAsync()](/api/class-locator.mdx#locator-is-editable) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is [editable](../actionability.mdx#editable).

**Usage**

```csharp
await ElementHandle.IsEditableAsync();
```

**Returns**
- bool

---

### IsEnabledAsync {/* #element-handle-is-enabled */}



:::warningDiscouraged

Use locator-based [Locator.IsEnabledAsync()](/api/class-locator.mdx#locator-is-enabled) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is [enabled](../actionability.mdx#enabled).

**Usage**

```csharp
await ElementHandle.IsEnabledAsync();
```

**Returns**
- bool

---

### IsHiddenAsync {/* #element-handle-is-hidden */}



:::warningDiscouraged

Use locator-based [Locator.IsHiddenAsync()](/api/class-locator.mdx#locator-is-hidden) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is hidden, the opposite of [visible](../actionability.mdx#visible).

**Usage**

```csharp
await ElementHandle.IsHiddenAsync();
```

**Returns**
- bool

---

### IsVisibleAsync {/* #element-handle-is-visible */}



:::warningDiscouraged

Use locator-based [Locator.IsVisibleAsync()](/api/class-locator.mdx#locator-is-visible) instead. Read more about [locators](../locators.mdx).

:::


Returns whether the element is [visible](../actionability.mdx#visible).

**Usage**

```csharp
await ElementHandle.IsVisibleAsync();
```

**Returns**
- bool

---

### PressAsync {/* #element-handle-press */}



:::warningDiscouraged

Use locator-based [Locator.PressAsync()](/api/class-locator.mdx#locator-press) instead. Read more about [locators](../locators.mdx).

:::


Focuses the element, and then uses [Keyboard.DownAsync()](/api/class-keyboard.mdx#keyboard-down) and [Keyboard.UpAsync()](/api/class-keyboard.mdx#keyboard-up).

[key](/api/class-elementhandle.mdx#element-handle-press-option-key) can specify the intended [keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value or a single character to generate the text for. A superset of the [key](/api/class-elementhandle.mdx#element-handle-press-option-key) values can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`, `Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`, `ControlOrMeta`.

Holding down `Shift` will type the text that corresponds to the [key](/api/class-elementhandle.mdx#element-handle-press-option-key) in the upper case.

If [key](/api/class-elementhandle.mdx#element-handle-press-option-key) is a single character, it is case-sensitive, so the values `a` and `A` will generate different respective texts.

Shortcuts such as `key: "Control+o"`, `key: "Control++` or `key: "Control+Shift+T"` are supported as well. When specified with the modifier, modifier is pressed and being held while the subsequent key is being pressed.

**Usage**

```csharp
await ElementHandle.PressAsync(key, options);
```

**Arguments**
- `key` string
  
  Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.
- `options` `ElementHandlePressOptions?` *(optional)*
  - `Delay` float? *(optional)*
    
    Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option will default to `true` in the future.
    :::
    
    
    Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating to inaccessible pages. Defaults to `false`.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### QuerySelectorAsync {/* #element-handle-query-selector */}



:::warningDiscouraged

Use locator-based [Page.Locator()](/api/class-page.mdx#page-locator) instead. Read more about [locators](../locators.mdx).

:::


The method finds an element matching the specified selector in the `ElementHandle`'s subtree. If no elements match the selector, returns `null`.

**Usage**

```csharp
await ElementHandle.QuerySelectorAsync(selector);
```

**Arguments**
- `selector` string
  
  A selector to query for.

**Returns**
- ElementHandle?

---

### QuerySelectorAllAsync {/* #element-handle-query-selector-all */}



:::warningDiscouraged

Use locator-based [Page.Locator()](/api/class-page.mdx#page-locator) instead. Read more about [locators](../locators.mdx).

:::


The method finds all elements matching the specified selector in the `ElementHandle`s subtree. If no elements match the selector, returns empty array.

**Usage**

```csharp
await ElementHandle.QuerySelectorAllAsync(selector);
```

**Arguments**
- `selector` string
  
  A selector to query for.

**Returns**
- IReadOnlyList<ElementHandle>

---

### ScreenshotAsync {/* #element-handle-screenshot */}



:::warningDiscouraged

Use locator-based [Locator.ScreenshotAsync()](/api/class-locator.mdx#locator-screenshot) instead. Read more about [locators](../locators.mdx).

:::


This method captures a screenshot of the page, clipped to the size and position of this particular element. If the element is covered by other elements, it will not be actually visible on the screenshot. If the element is a scrollable container, only the currently scrolled content will be visible on the screenshot.

This method waits for the [actionability](../actionability.mdx) checks, then scrolls element into view before taking a screenshot. If the element is detached from DOM, the method throws an error.

Returns the buffer with the captured screenshot.

**Usage**

```csharp
await ElementHandle.ScreenshotAsync(options);
```

**Arguments**
- `options` `ElementHandleScreenshotOptions?` *(optional)*
  - `Animations` `enum ScreenshotAnimations { Disabled, Allow }?` *(optional)*
    
    When set to `"disabled"`, stops CSS animations, CSS transitions and Web Animations. Animations get different treatment depending on their duration:
    * finite animations are fast-forwarded to completion, so they'll fire `transitionend` event.
    * infinite animations are canceled to initial state, and then played over after the screenshot.
    
    Defaults to `"allow"` that leaves animations untouched.
  - `Caret` `enum ScreenshotCaret { Hide, Initial }?` *(optional)*
    
    When set to `"hide"`, screenshot will hide text caret. When set to `"initial"`, text caret behavior will not be changed.  Defaults to `"hide"`.
  - `Mask` IEnumerable?<Locator> *(optional)*
    
    Specify locators that should be masked when the screenshot is taken. Masked elements will be overlaid with a pink box `#FF00FF` (customized by [MaskColor](/api/class-elementhandle.mdx#element-handle-screenshot-option-mask-color)) that completely covers its bounding box. The mask is also applied to invisible elements, see [Matching only visible elements](../locators.mdx#matching-only-visible-elements) to disable that.
  - `MaskColor` string? *(optional)* 
    
    Specify the color of the overlay box for masked elements, in [CSS color format](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). Default color is pink `#FF00FF`.
  - `OmitBackground` bool? *(optional)*
    
    Hides default white background and allows capturing screenshots with transparency. Not applicable to `jpeg` images. Defaults to `false`.
  - `Path` string? *(optional)*
    
    The file path to save the image to. The screenshot type will be inferred from file extension. If [Path](/api/class-elementhandle.mdx#element-handle-screenshot-option-path) is a relative path, then it is resolved relative to the current working directory. If no path is provided, the image won't be saved to the disk.
  - `Quality` int? *(optional)*
    
    The quality of the image, between 0-100. Not applicable to `png` images. For `jpeg` the default is `80`. For `webp`, a quality of `100` (the default) produces a lossless image, while lower values use lossy compression.
  - `Scale` `enum ScreenshotScale { Css, Device }?` *(optional)*
    
    When set to `"css"`, screenshot will have a single pixel per each css pixel on the page. For high-dpi devices, this will keep screenshots small. Using `"device"` option will produce a single pixel per each device pixel, so screenshots of high-dpi devices will be twice as large or even larger.
    
    Defaults to `"device"`.
  - `Style` string? *(optional)* 
    
    Text of the stylesheet to apply while making the screenshot. This is where you can hide dynamic elements, make elements invisible or change their properties to help you creating repeatable screenshots. This stylesheet pierces the Shadow DOM and applies to the inner frames.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `Type` `enum ScreenshotType { Png, Jpeg, Webp }?` *(optional)*
    
    Specify screenshot type, defaults to `png`.

**Returns**
- byte&#91;&#93;

---

### ScrollIntoViewIfNeededAsync {/* #element-handle-scroll-into-view-if-needed */}



:::warningDiscouraged

Use locator-based [Locator.ScrollIntoViewIfNeededAsync()](/api/class-locator.mdx#locator-scroll-into-view-if-needed) instead. Read more about [locators](../locators.mdx).

:::


This method waits for [actionability](../actionability.mdx) checks, then tries to scroll element into view, unless it is completely visible as defined by [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)'s `ratio`.

Throws when `elementHandle` does not point to an element [connected](https://developer.mozilla.org/en-US/docs/Web/API/Node/isConnected) to a Document or a ShadowRoot.

See [scrolling](../input.mdx#scrolling) for alternative ways to scroll.

**Usage**

```csharp
await ElementHandle.ScrollIntoViewIfNeededAsync(options);
```

**Arguments**
- `options` `ElementHandleScrollIntoViewIfNeededOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### SelectOptionAsync {/* #element-handle-select-option */}



:::warningDiscouraged

Use locator-based [Locator.SelectOptionAsync()](/api/class-locator.mdx#locator-select-option) instead. Read more about [locators](../locators.mdx).

:::


This method waits for [actionability](../actionability.mdx) checks, waits until all specified options are present in the `<select>` element and selects these options.

If the target element is not a `<select>` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be used instead.

Returns the array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.

**Usage**

```csharp
// Single selection matching the value or label
await handle.SelectOptionAsync(new[] { "blue" });
// single selection matching the label
await handle.SelectOptionAsync(new[] { new SelectOptionValue() { Label = "blue" } });
// multiple selection
await handle.SelectOptionAsync(new[] { "red", "green", "blue" });
// multiple selection for blue, red and second option
await handle.SelectOptionAsync(new[] {
    new SelectOptionValue() { Label = "blue" },
    new SelectOptionValue() { Index = 2 },
    new SelectOptionValue() { Value = "red" }});
```

**Arguments**
- `values` string | ElementHandle | IEnumerable | `SelectOption` | IEnumerable | IEnumerable?
  - `Value` string? *(optional)*
    
    Matches by `option.value`. Optional.
  - `Label` string? *(optional)*
    
    Matches by `option.label`. Optional.
  - `Index` int? *(optional)*
    
    Matches by the index. Optional.
  
  Options to select. If the `<select>` has the `multiple` attribute, all matching options are selected, otherwise only the first option matching one of the passed options is selected. String values are matching both values and labels. Option is considered matching if all specified properties match.
- `options` `ElementHandleSelectOptionOptions?` *(optional)*
  - `Force` bool? *(optional)* 
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- IReadOnlyList<string>

---

### SelectTextAsync {/* #element-handle-select-text */}



:::warningDiscouraged

Use locator-based [Locator.SelectTextAsync()](/api/class-locator.mdx#locator-select-text) instead. Read more about [locators](../locators.mdx).

:::


This method waits for [actionability](../actionability.mdx) checks, then focuses the element and selects all its text content.

If the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), focuses and selects text in the control instead.

**Usage**

```csharp
await ElementHandle.SelectTextAsync(options);
```

**Arguments**
- `options` `ElementHandleSelectTextOptions?` *(optional)*
  - `Force` bool? *(optional)* 
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### SetCheckedAsync {/* #element-handle-set-checked */}



:::warningDiscouraged

Use locator-based [Locator.SetCheckedAsync()](/api/class-locator.mdx#locator-set-checked) instead. Read more about [locators](../locators.mdx).

:::


This method checks or unchecks an element by performing the following steps:
1. Ensure that element is a checkbox or a radio input. If not, this method throws.
1. If the element already has the right checked state, this method returns immediately.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [Force](/api/class-elementhandle.mdx#element-handle-set-checked-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [Page.Mouse](/api/class-page.mdx#page-mouse) to click in the center of the element.
1. Ensure that the element is now checked or unchecked. If not, this method throws.

When all steps combined have not finished during the specified [Timeout](/api/class-elementhandle.mdx#element-handle-set-checked-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```csharp
await ElementHandle.SetCheckedAsync(checked, options);
```

**Arguments**
- `checkedState` bool
  
  Whether to check or uncheck the checkbox.
- `options` `ElementHandleSetCheckedOptions?` *(optional)*
  - `Force` bool? *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Position` Position? *(optional)*
    - `X` float
      
      
    - `Y` float
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `Scroll` `enum ScrollMode { Auto, None }?` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `Trial` bool? *(optional)*
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- void

---

### SetInputFilesAsync {/* #element-handle-set-input-files */}



:::warningDiscouraged

Use locator-based [Locator.SetInputFilesAsync()](/api/class-locator.mdx#locator-set-input-files) instead. Read more about [locators](../locators.mdx).

:::


Sets the value of the file input to these file paths or files. If some of the `filePaths` are relative paths, then they are resolved relative to the current working directory. For empty array, clears the selected files. For inputs with a `webkitdirectory` attribute, only a single directory path is supported.

This method expects ElementHandle to point to an [input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input). However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), targets the control instead.

**Usage**

```csharp
await ElementHandle.SetInputFilesAsync(files, options);
```

**Arguments**
- `files` string | IEnumerable<string> | `FilePayload` | IEnumerable<`FilePayload`>
  - `Name` string
    
    File name
  - `MimeType` string
    
    File type
  - `Buffer` byte&#91;&#93;
    
    File content
- `options` `ElementHandleSetInputFilesOptions?` *(optional)*
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### TapAsync {/* #element-handle-tap */}



:::warningDiscouraged

Use locator-based [Locator.TapAsync()](/api/class-locator.mdx#locator-tap) instead. Read more about [locators](../locators.mdx).

:::


This method taps the element by performing the following steps:
1. Wait for [actionability](../actionability.mdx) checks on the element, unless [Force](/api/class-elementhandle.mdx#element-handle-tap-option-force) option is set.
1. Scroll the element into view if needed.
1. Use [Page.Touchscreen](/api/class-page.mdx#page-touchscreen) to tap the center of the element, or the specified [Position](/api/class-elementhandle.mdx#element-handle-tap-option-position).

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [Timeout](/api/class-elementhandle.mdx#element-handle-tap-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

:::note

`elementHandle.tap()` requires that the `hasTouch` option of the browser context be set to true.
:::

**Usage**

```csharp
await ElementHandle.TapAsync(options);
```

**Arguments**
- `options` `ElementHandleTapOptions?` *(optional)*
  - `Force` bool? *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `Modifiers` IEnumerable?<`enum KeyboardModifier { Alt, Control, ControlOrMeta, Meta, Shift }`> *(optional)*
    
    Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows and Linux and to "Meta" on macOS.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Position` Position? *(optional)*
    - `X` float
      
      
    - `Y` float
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `Scroll` `enum ScrollMode { Auto, None }?` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `Trial` bool? *(optional)* 
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- void

---

### TextContentAsync {/* #element-handle-text-content */}



:::warningDiscouraged

Use locator-based [Locator.TextContentAsync()](/api/class-locator.mdx#locator-text-content) instead. Read more about [locators](../locators.mdx).

:::


Returns the `node.textContent`.

**Usage**

```csharp
await ElementHandle.TextContentAsync();
```

**Returns**
- string?

---

### TypeAsync {/* #element-handle-type */}



:::warningDeprecated

In most cases, you should use [Locator.FillAsync()](/api/class-locator.mdx#locator-fill) instead. You only need to press keys one by one if there is special keyboard handling on the page - in this case use [Locator.PressSequentiallyAsync()](/api/class-locator.mdx#locator-press-sequentially).

:::


Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [ElementHandle.PressAsync()](/api/class-elementhandle.mdx#element-handle-press).

**Usage**

**Arguments**
- `text` string
  
  A text to type into a focused element.
- `options` `ElementHandleTypeOptions?` *(optional)*
  - `Delay` float? *(optional)*
    
    Time to wait between key presses in milliseconds. Defaults to 0.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### UncheckAsync {/* #element-handle-uncheck */}



:::warningDiscouraged

Use locator-based [Locator.UncheckAsync()](/api/class-locator.mdx#locator-uncheck) instead. Read more about [locators](../locators.mdx).

:::


This method checks the element by performing the following steps:
1. Ensure that element is a checkbox or a radio input. If not, this method throws. If the element is already unchecked, this method returns immediately.
1. Wait for [actionability](../actionability.mdx) checks on the element, unless [Force](/api/class-elementhandle.mdx#element-handle-uncheck-option-force) option is set.
1. Scroll the element into view if needed.
1. Use [Page.Mouse](/api/class-page.mdx#page-mouse) to click in the center of the element.
1. Ensure that the element is now unchecked. If not, this method throws.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [Timeout](/api/class-elementhandle.mdx#element-handle-uncheck-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

**Usage**

```csharp
await ElementHandle.UncheckAsync(options);
```

**Arguments**
- `options` `ElementHandleUncheckOptions?` *(optional)*
  - `Force` bool? *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Position` Position? *(optional)* 
    - `X` float
      
      
    - `Y` float
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `Scroll` `enum ScrollMode { Auto, None }?` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `Trial` bool? *(optional)* 
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- void

---

### WaitForSelectorAsync {/* #element-handle-wait-for-selector */}



:::warningDiscouraged

Use web assertions that assert visibility or a locator-based [Locator.WaitForAsync()](/api/class-locator.mdx#locator-wait-for) instead.

:::


Returns element specified by selector when it satisfies [State](/api/class-elementhandle.mdx#element-handle-wait-for-selector-option-state) option. Returns `null` if waiting for `hidden` or `detached`.

Wait for the [selector](/api/class-elementhandle.mdx#element-handle-wait-for-selector-option-selector) relative to the element handle to satisfy [State](/api/class-elementhandle.mdx#element-handle-wait-for-selector-option-state) option (either appear/disappear from dom, or become visible/hidden). If at the moment of calling the method [selector](/api/class-elementhandle.mdx#element-handle-wait-for-selector-option-selector) already satisfies the condition, the method will return immediately. If the selector doesn't satisfy the condition for the [Timeout](/api/class-elementhandle.mdx#element-handle-wait-for-selector-option-timeout) milliseconds, the function will throw.

**Usage**

```csharp
await page.SetContentAsync("<div><span></span></div>");
var div = await page.QuerySelectorAsync("div");
// Waiting for the "span" selector relative to the div.
var span = await page.WaitForSelectorAsync("span", WaitForSelectorState.Attached);
```

:::note
This method does not work across navigations, use [Page.WaitForSelectorAsync()](/api/class-page.mdx#page-wait-for-selector) instead.
:::

**Arguments**
- `selector` string
  
  A selector to query for.
- `options` `ElementHandleWaitForSelectorOptions?` *(optional)*
  - `State` `enum WaitForSelectorState { Attached, Detached, Visible, Hidden }?` *(optional)*
    
    Defaults to `'visible'`. Can be either:
    * `'attached'` - wait for element to be present in DOM.
    * `'detached'` - wait for element to not be present in DOM.
    * `'visible'` - wait for element to have non-empty bounding box and no `visibility:hidden`. Note that element without any content or with `display:none` has an empty bounding box and is not considered visible.
    * `'hidden'` - wait for element to be either detached from DOM, or have an empty bounding box or `visibility:hidden`. This is opposite to the `'visible'` option.
  - `Strict` bool? *(optional)* 
    
    When true, the call requires selector to resolve to a single element. If given selector resolves to more than one element, the call throws an exception.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- ElementHandle?


APIRequest: /api/class-apirequest.mdx "APIRequest"
APIRequestContext: /api/class-apirequestcontext.mdx "APIRequestContext"
APIResponse: /api/class-apiresponse.mdx "APIResponse"
APIResponseAssertions: /api/class-apiresponseassertions.mdx "APIResponseAssertions"
Browser: /api/class-browser.mdx "Browser"
BrowserContext: /api/class-browsercontext.mdx "BrowserContext"
BrowserType: /api/class-browsertype.mdx "BrowserType"
CDPSession: /api/class-cdpsession.mdx "CDPSession"
CDPSessionEvent: /api/class-cdpsessionevent.mdx "CDPSessionEvent"
Clock: /api/class-clock.mdx "Clock"
ConsoleMessage: /api/class-consolemessage.mdx "ConsoleMessage"
Credentials: /api/class-credentials.mdx "Credentials"
Debugger: /api/class-debugger.mdx "Debugger"
Dialog: /api/class-dialog.mdx "Dialog"
Download: /api/class-download.mdx "Download"
ElementHandle: /api/class-elementhandle.mdx "ElementHandle"
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
PlaywrightAssertions: /api/class-playwrightassertions.mdx "PlaywrightAssertions"
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
WebSocketFrame: /api/class-websocketframe.mdx "WebSocketFrame"
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

bool: https://docs.microsoft.com/en-us/dotnet/api/system.boolean "bool"
Date: https://learn.microsoft.com/en-us/dotnet/api/system.datetime "DateTime"
double: https://docs.microsoft.com/en-us/dotnet/api/system.double "double"
byte: https://docs.microsoft.com/en-us/dotnet/api/system.byte "byte"
int: https://docs.microsoft.com/en-us/dotnet/api/system.int32 "int"
long: https://docs.microsoft.com/en-us/dotnet/api/system.int64 "long"
void: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/void "void"
string: https://docs.microsoft.com/en-us/dotnet/api/system.string "string"
URL: https://nodejs.org/api/url.html "URL"
Regex: https://docs.microsoft.com/en-us/dotnet/api/system.text.regularexpressions.regex "Regex"

Action: https://docs.microsoft.com/en-us/dotnet/api/system.action-1 "Action"
Func: https://docs.microsoft.com/en-us/dotnet/api/system.func-2 "Func"
IEnumerable: https://docs.microsoft.com/en-us/dotnet/api/system.collections.ienumerable "IEnumerable"
IReadOnlyList: https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.ireadonlylist-1?view=net-9.0 "IReadOnlyList"
IDictionary: https://docs.microsoft.com/en-us/dotnet/api/system.collections.idictionary "IDictionary"
Task: https://docs.microsoft.com/en-us/dotnet/api/system.threading.tasks.task?view=net-5.0 "Task"
IReadOnlyDictionary: https://docs.microsoft.com/en-us/dotnet/api/system.collections.generic.ireadonlydictionary-2 "IReadOnlyDictionary"
JsonElement: https://docs.microsoft.com/en-us/dotnet/api/system.text.json.jsonelement "JsonElement"

all available image tags: https://mcr.microsoft.com/en-us/product/playwright/dotnet/about "all available image tags"
Microsoft Artifact Registry: https://mcr.microsoft.com/en-us/product/playwright/dotnet/about "Microsoft Artifact Registry"
Dockerfile.noble: https://github.com/microsoft/playwright-dotnet/blob/main/utils/docker/Dockerfile.noble "Dockerfile.noble"
