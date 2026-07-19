# Locator

> **Source:** [playwright.dev/dotnet/docs/api/class-locator](https://playwright.dev/dotnet/docs/api/class-locator)

---

Locators are the central piece of Playwright's auto-waiting and retry-ability. In a nutshell, locators represent a way to find element(s) on the page at any moment. A locator can be created with the [Page.Locator()](/api/class-page.mdx#page-locator) method.

[Learn more about locators](../locators.mdx).


---

## Methods

### AllAsync {/* #locator-all */}



When the locator points to a list of elements, this returns an array of locators, pointing to their respective elements.

:::note

[Locator.AllAsync()](/api/class-locator.mdx#locator-all) does not wait for elements to match the locator, and instead immediately returns whatever is present in the page.

When the list of elements changes dynamically, [Locator.AllAsync()](/api/class-locator.mdx#locator-all) will produce unpredictable and flaky results.

When the list of elements is stable, but loaded dynamically, wait for the full list to finish loading before calling [Locator.AllAsync()](/api/class-locator.mdx#locator-all).
:::

**Usage**

```csharp
foreach (var li in await page.GetByRole("listitem").AllAsync())
  await li.ClickAsync();
```

**Returns**
- IReadOnlyList<Locator>

---

### AllInnerTextsAsync {/* #locator-all-inner-texts */}



Returns an array of `node.innerText` values for all matching nodes.

:::warningAsserting text

If you need to assert text on the page, prefer [Expect(Locator).ToHaveTextAsync()](/api/class-locatorassertions.mdx#locator-assertions-to-have-text) with [UseInnerText](/api/class-locatorassertions.mdx#locator-assertions-to-have-text-option-use-inner-text) option to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

```csharp
var texts = await page.GetByRole(AriaRole.Link).AllInnerTextsAsync();
```

**Returns**
- IReadOnlyList<string>

---

### AllTextContentsAsync {/* #locator-all-text-contents */}



Returns an array of `node.textContent` values for all matching nodes.

:::warningAsserting text

If you need to assert text on the page, prefer [Expect(Locator).ToHaveTextAsync()](/api/class-locatorassertions.mdx#locator-assertions-to-have-text) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

```csharp
var texts = await page.GetByRole(AriaRole.Link).AllTextContentsAsync();
```

**Returns**
- IReadOnlyList<string>

---

### And {/* #locator-and */}



Creates a locator that matches both this locator and the argument locator.

**Usage**

The following example finds a button with a specific title.

```csharp
var button = page.GetByRole(AriaRole.Button).And(page.GetByTitle("Subscribe"));
```

**Arguments**
- `locator` Locator
  
  Additional locator to match.

**Returns**
- Locator

---

### AriaSnapshotAsync {/* #locator-aria-snapshot */}



Captures the aria snapshot of the given element. Read more about [aria snapshots](../aria-snapshots.mdx) and [Expect(Locator).ToMatchAriaSnapshotAsync()](/api/class-locatorassertions.mdx#locator-assertions-to-match-aria-snapshot) for the corresponding assertion.

**Usage**

```csharp
await page.GetByRole(AriaRole.Link).AriaSnapshotAsync();
```

**Arguments**
- `options` `LocatorAriaSnapshotOptions?` *(optional)*
  - `Boxes` bool? *(optional)* 
    
    When `true`, appends each element's bounding box as `box=x,y,width,height` to the snapshot. Coordinates are relative to the viewport, in CSS pixels, as returned by [`Element.getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect). Defaults to `false`.
  - `Depth` int? *(optional)* 
    
    When specified, limits the depth of the snapshot.
  - `Mode` `enum AriaSnapshotMode { Ai, Default }?` *(optional)* 
    
    When set to `"ai"`, returns a snapshot optimized for AI consumption. Defaults to `"default"`. See details for more information.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- string

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

An AI-optimized snapshot, controlled by [Mode](/api/class-locator.mdx#locator-aria-snapshot-option-mode), is different from a default snapshot:
1. Includes element references `ref=e2`. 2. Does not wait for an element matching the locator, and throws when no elements match. 3. Includes snapshots of `<iframe>`s inside the target.

---

### BlurAsync {/* #locator-blur */}



Calls [blur](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/blur) on the element.

**Usage**

```csharp
await Locator.BlurAsync(options);
```

**Arguments**
- `options` `LocatorBlurOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### BoundingBoxAsync {/* #locator-bounding-box */}



This method returns the bounding box of the element matching the locator, or `null` if the element is not visible. The bounding box is calculated relative to the main frame viewport - which is usually the same as the browser window.

**Usage**

```csharp
var box = await page.GetByRole(AriaRole.Button).BoundingBoxAsync();
await page.Mouse.ClickAsync(box.X + box.Width / 2, box.Y + box.Height / 2);
```

**Arguments**
- `options` `LocatorBoundingBoxOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

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

**Details**

Scrolling affects the returned bounding box, similarly to [Element.getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect). That means `x` and/or `y` may be negative.

Elements from child frames return the bounding box relative to the main frame, unlike the [Element.getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect).

Assuming the page is static, it is safe to use bounding box coordinates to perform input. For example, the following snippet should click the center of the element.

---

### CheckAsync {/* #locator-check */}



Ensure that checkbox or radio element is checked.

**Usage**

```csharp
await page.GetByRole(AriaRole.Checkbox).CheckAsync();
```

**Arguments**
- `options` `LocatorCheckOptions?` *(optional)*
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

**Details**

Performs the following steps:
1. Ensure that element is a checkbox or a radio input. If not, this method throws. If the element is already checked, this method returns immediately.
1. Wait for [actionability](../actionability.mdx) checks on the element, unless [Force](/api/class-locator.mdx#locator-check-option-force) option is set.
1. Scroll the element into view if needed.
1. Use [Page.Mouse](/api/class-page.mdx#page-mouse) to click in the center of the element.
1. Ensure that the element is now checked. If not, this method throws.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [Timeout](/api/class-locator.mdx#locator-check-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

---

### ClearAsync {/* #locator-clear */}



Clear the input field.

**Usage**

```csharp
await page.GetByRole(AriaRole.Textbox).ClearAsync();
```

**Arguments**
- `options` `LocatorClearOptions?` *(optional)*
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

**Details**

This method waits for [actionability](../actionability.mdx) checks, focuses the element, clears it and triggers an `input` event after clearing.

If the target element is not an `<input>`, `<textarea>` or `contenteditable` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be cleared instead.

---

### ClickAsync {/* #locator-click */}



Click an element.

**Usage**

Click a button:

```csharp
await page.GetByRole(AriaRole.Button).ClickAsync();
```

Shift-right-click at a specific position on a canvas:

```csharp
await page.Locator("canvas").ClickAsync(new() {
  Button = MouseButton.Right,
  Modifiers = new[] { KeyboardModifier.Shift },
  Position = new Position { X = 0, Y = 0 }
});
```

**Arguments**
- `options` `LocatorClickOptions?` *(optional)*
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
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- void

**Details**

This method clicks the element by performing the following steps:
1. Wait for [actionability](../actionability.mdx) checks on the element, unless [Force](/api/class-locator.mdx#locator-click-option-force) option is set.
1. Scroll the element into view if needed.
1. Use [Page.Mouse](/api/class-page.mdx#page-mouse) to click in the center of the element, or the specified [Position](/api/class-locator.mdx#locator-click-option-position).
1. Wait for initiated navigations to either succeed or fail, unless [NoWaitAfter](/api/class-locator.mdx#locator-click-option-no-wait-after) option is set.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [Timeout](/api/class-locator.mdx#locator-click-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

---

### ContentFrame {/* #locator-content-frame */}



Returns a FrameLocator object pointing to the same `iframe` as this locator.

Useful when you have a Locator object obtained somewhere, and later on would like to interact with the content inside the frame.

For a reverse operation, use [FrameLocator.Owner](/api/class-framelocator.mdx#frame-locator-owner).

**Usage**

```csharp
var locator = Page.Locator("iframename=\"embedded\"");
// ...
var frameLocator = locator.ContentFrame;
await frameLocator.GetByRole(AriaRole.Button).ClickAsync();
```

**Returns**
- FrameLocator

---

### CountAsync {/* #locator-count */}



Returns the number of elements matching the locator.

:::warningAsserting count

If you need to assert the number of elements on the page, prefer [Expect(Locator).ToHaveCountAsync()](/api/class-locatorassertions.mdx#locator-assertions-to-have-count) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

```csharp
int count = await page.GetByRole(AriaRole.Listitem).CountAsync();
```

**Returns**
- int

---

### DblClickAsync {/* #locator-dblclick */}



Double-click an element.

**Usage**

```csharp
await Locator.DblClickAsync(options);
```

**Arguments**
- `options` `LocatorDblClickOptions?` *(optional)*
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
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- void

**Details**

This method double clicks the element by performing the following steps:
1. Wait for [actionability](../actionability.mdx) checks on the element, unless [Force](/api/class-locator.mdx#locator-dblclick-option-force) option is set.
1. Scroll the element into view if needed.
1. Use [Page.Mouse](/api/class-page.mdx#page-mouse) to double click in the center of the element, or the specified [Position](/api/class-locator.mdx#locator-dblclick-option-position).

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [Timeout](/api/class-locator.mdx#locator-dblclick-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

:::note

`element.dblclick()` dispatches two `click` events and a single `dblclick` event.
:::

---

### Describe {/* #locator-describe */}



Describes the locator, description is used in the trace viewer and reports. Returns the locator pointing to the same element.

**Usage**

```csharp
var button = Page.GetByTestId("btn-sub").Describe("Subscribe button");
await button.ClickAsync();
```

**Arguments**
- `description` string
  
  Locator description.

**Returns**
- Locator

---

### Description {/* #locator-description */}



Returns locator description previously set with [Locator.Describe()](/api/class-locator.mdx#locator-describe). Returns `null` if no custom description has been set.

**Usage**

```csharp
var button = Page.GetByRole(AriaRole.Button).Describe("Subscribe button");
Console.WriteLine(button.Description()); // "Subscribe button"

var input = Page.GetByRole(AriaRole.Textbox);
Console.WriteLine(input.Description()); // null
```

**Returns**
- string?

---

### DispatchEventAsync {/* #locator-dispatch-event */}



Programmatically dispatch an event on the matching element.

**Usage**

```csharp
await locator.DispatchEventAsync("click");
```

**Arguments**
- `type` string
  
  DOM event type: `"click"`, `"dragstart"`, etc.
- `eventInit` EvaluationArgument? *(optional)*
  
  Optional event-specific initialization properties.
- `options` `LocatorDispatchEventOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

**Details**

The snippet above dispatches the `click` event on the element. Regardless of the visibility state of the element, `click` is dispatched. This is equivalent to calling [element.click()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click).

Under the hood, it creates an instance of an event based on the given [type](/api/class-locator.mdx#locator-dispatch-event-option-type), initializes it with [eventInit](/api/class-locator.mdx#locator-dispatch-event-option-event-init) properties and dispatches it on the element. Events are `composed`, `cancelable` and bubble by default.

Since [eventInit](/api/class-locator.mdx#locator-dispatch-event-option-event-init) is event-specific, please refer to the events documentation for the lists of initial properties:
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

```csharp
var dataTransfer = await page.EvaluateHandleAsync("() => new DataTransfer()");
await locator.DispatchEventAsync("dragstart", new Dictionary<string, object>
{
    { "dataTransfer", dataTransfer }
});
```

---

### DragToAsync {/* #locator-drag-to */}



Drag the source element towards the target element and drop it.

**Usage**

```csharp
var source = Page.Locator("#source");
var target = Page.Locator("#target");

await source.DragToAsync(target);
// or specify exact positions relative to the top-left corners of the elements:
await source.DragToAsync(target, new()
{
    SourcePosition = new() { X = 34, Y = 7 },
    TargetPosition = new() { X = 10, Y = 20 },
});
```

**Arguments**
- `target` Locator
  
  Locator of the element to drag to.
- `options` `LocatorDragToOptions?` *(optional)*
  - `Force` bool? *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Scroll` `enum ScrollMode { Auto, None }?` *(optional)* 
    
    Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`, which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to `"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport. This is useful to assert that an element is reachable by the user without additional scrolling.
  - `SourcePosition` SourcePosition? *(optional)*
    - `X` float
      
      
    - `Y` float
      
      
    Clicks on the source element at this point relative to the top-left corner of the element's padding box. If not specified, some visible point of the element is used.
  - `Steps` int? *(optional)* 
    
    Defaults to 1. Sends `n` interpolated `mousemove` events to represent travel between the `mousedown` and `mouseup` of the drag. When set to 1, emits a single `mousemove` event at the destination location.
  - `TargetPosition` TargetPosition? *(optional)*
    - `X` float
      
      
    - `Y` float
      
      
    Drops on the target element at this point relative to the top-left corner of the element's padding box. If not specified, some visible point of the element is used.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.
  - `Trial` bool? *(optional)*
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

**Returns**
- void

**Details**

This method drags the locator to another target locator or target position. It will first move to the source element, perform a `mousedown`, then move to the target element or position and perform a `mouseup`.

---

### DropAsync {/* #locator-drop */}



Simulate an external drag-and-drop of files or clipboard-like data onto this locator.

**Usage**

Drop a file buffer onto an upload area:

Drop plain text and a URL together:

**Arguments**
- `payload` Payload
  - `Files` string? | IEnumerable?<string> | Files? | IEnumerable?<Files> *(optional)*
    - `Name` string
      
      File name
    - `MimeType` string
      
      File type
    - `Buffer` byte&#91;&#93;
      
      File content
    
    
  - `Data` IDictionary?<string, string> *(optional)*
    
    
  Data to drop onto the target. Provide `files` (file paths or in-memory buffers), `data` (a mime-type → string map for clipboard-like content such as `text/plain`, `text/html`, `text/uri-list`), or both.
- `options` `LocatorDropOptions?` *(optional)*
  - `Position` Position? *(optional)*
    - `X` float
      
      
    - `Y` float
      
      
    A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

**Details**

Dispatches the native `dragenter`, `dragover`, and `drop` events at the center of the target element with a synthetic DataTransfer carrying the provided files and/or data entries. Works cross-browser by constructing the DataTransfer in the page context.

If the target element's `dragover` listener does not call `preventDefault()`, the target is considered to have rejected the drop: Playwright dispatches `dragleave` and this method throws.

---

### EvaluateAsync {/* #locator-evaluate */}



Execute JavaScript code in the page, taking the matching element as an argument.

**Usage**

Passing argument to [expression](/api/class-locator.mdx#locator-evaluate-option-expression):

```csharp
var result = await page.GetByTestId("myId").EvaluateAsync<string>("(element, x, y) => element.textContent + ' ' + x * y)", new[] { 7, 8 });
Console.WriteLine(result); // prints "myId text 56"
```

**Arguments**
- `expression` string
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument? *(optional)*
  
  Optional argument to pass to [expression](/api/class-locator.mdx#locator-evaluate-option-expression).
- `options` `LocatorEvaluateOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds to wait for the locator before evaluating. Note that after locator is resolved, evaluation itself is not limited by the timeout. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- object

**Details**

Returns the return value of [expression](/api/class-locator.mdx#locator-evaluate-option-expression), called with the matching element as a first argument, and [arg](/api/class-locator.mdx#locator-evaluate-option-arg) as a second argument.

If [expression](/api/class-locator.mdx#locator-evaluate-option-expression) returns a Promise, this method will wait for the promise to resolve and return its value.

If [expression](/api/class-locator.mdx#locator-evaluate-option-expression) throws or rejects, this method throws.

---

### EvaluateAllAsync {/* #locator-evaluate-all */}



Execute JavaScript code in the page, taking all matching elements as an argument.

**Usage**

```csharp
var locator = page.Locator("div");
var moreThanTen = await locator.EvaluateAllAsync<bool>("(divs, min) => divs.length > min", 10);
```

**Arguments**
- `expression` string
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument? *(optional)*
  
  Optional argument to pass to [expression](/api/class-locator.mdx#locator-evaluate-all-option-expression).

**Returns**
- object

**Details**

Returns the return value of [expression](/api/class-locator.mdx#locator-evaluate-all-option-expression), called with an array of all matching elements as a first argument, and [arg](/api/class-locator.mdx#locator-evaluate-all-option-arg) as a second argument.

If [expression](/api/class-locator.mdx#locator-evaluate-all-option-expression) returns a Promise, this method will wait for the promise to resolve and return its value.

If [expression](/api/class-locator.mdx#locator-evaluate-all-option-expression) throws or rejects, this method throws.

---

### EvaluateHandleAsync {/* #locator-evaluate-handle */}



Execute JavaScript code in the page, taking the matching element as an argument, and return a JSHandle with the result.

**Usage**

```csharp
await Locator.EvaluateHandleAsync(expression, arg, options);
```

**Arguments**
- `expression` string
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument? *(optional)*
  
  Optional argument to pass to [expression](/api/class-locator.mdx#locator-evaluate-handle-option-expression).
- `options` `LocatorEvaluateHandleOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds to wait for the locator before evaluating. Note that after locator is resolved, evaluation itself is not limited by the timeout. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

**Returns**
- JSHandle

**Details**

Returns the return value of [expression](/api/class-locator.mdx#locator-evaluate-handle-option-expression) as aJSHandle, called with the matching element as a first argument, and [arg](/api/class-locator.mdx#locator-evaluate-handle-option-arg) as a second argument.

The only difference between [Locator.EvaluateAsync()](/api/class-locator.mdx#locator-evaluate) and [Locator.EvaluateHandleAsync()](/api/class-locator.mdx#locator-evaluate-handle) is that [Locator.EvaluateHandleAsync()](/api/class-locator.mdx#locator-evaluate-handle) returns JSHandle.

If [expression](/api/class-locator.mdx#locator-evaluate-handle-option-expression) returns a Promise, this method will wait for the promise to resolve and return its value.

If [expression](/api/class-locator.mdx#locator-evaluate-handle-option-expression) throws or rejects, this method throws.

See [Page.EvaluateHandleAsync()](/api/class-page.mdx#page-evaluate-handle) for more details.

---

### FillAsync {/* #locator-fill */}



Set a value to the input field.

**Usage**

```csharp
await page.GetByRole(AriaRole.Textbox).FillAsync("example value");
```

**Arguments**
- `value` string
  
  Value to set for the `<input>`, `<textarea>` or `contenteditable` element.
- `options` `LocatorFillOptions?` *(optional)*
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

**Details**

This method waits for [actionability](../actionability.mdx) checks, focuses the element, fills it and triggers an `input` event after filling. Note that you can pass an empty string to clear the input field.

If the target element is not an `<input>`, `<textarea>` or `contenteditable` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be filled instead.

To send fine-grained keyboard events, use [Locator.PressSequentiallyAsync()](/api/class-locator.mdx#locator-press-sequentially).

---

### Filter {/* #locator-filter */}



This method narrows existing locator according to the options, for example filters by text. It can be chained to filter multiple times.

**Usage**

```csharp
var rowLocator = page.Locator("tr");
// ...
await rowLocator
    .Filter(new() { HasText = "text in column 1" })
    .Filter(new() {
        Has = page.GetByRole(AriaRole.Button, new() { Name = "column 2 button" } )
    })
    .ScreenshotAsync();
```

**Arguments**
- `options` `LocatorFilterOptions?` *(optional)*
  - `Has` Locator? *(optional)*
    
    Narrows down the results of the method to those which contain elements matching this relative locator. For example, `article` that has `text=Playwright` matches `<article><div>Playwright</div></article>`.
    
    Inner locator **must be relative** to the outer locator and is queried starting with the outer locator match, not the document root. For example, you can find `content` that has `div` in `<article><content><div>Playwright</div></content></article>`. However, looking for `content` that has `article div` will fail, because the inner locator must be relative and should not use any elements outside the `content`.
    
    Note that outer and inner locators must belong to the same frame. Inner locator must not contain FrameLocators.
  - `HasNot` Locator? *(optional)* 
    
    Matches elements that do not contain an element that matches an inner locator. Inner locator is queried against the outer one. For example, `article` that does not have `div` matches `<article><span>Playwright</span></article>`.
    
    Note that outer and inner locators must belong to the same frame. Inner locator must not contain FrameLocators.
  - `HasNotText|HasNotTextRegex` string? | Regex? *(optional)* 
    
    Matches elements that do not contain specified text somewhere inside, possibly in a child or a descendant element. When passed a string, matching is case-insensitive and searches for a substring.
  - `HasText|HasTextRegex` string? | Regex? *(optional)*
    
    Matches elements containing specified text somewhere inside, possibly in a child or a descendant element. When passed a string, matching is case-insensitive and searches for a substring. For example, `"Playwright"` matches `<article><div>Playwright</div></article>`.
  - `Visible` bool? *(optional)* 
    
    Only matches visible or invisible elements.

**Returns**
- Locator

---

### First {/* #locator-first */}



Returns locator to the first matching element.

**Usage**

```csharp
Locator.First
```

**Returns**
- Locator

---

### FocusAsync {/* #locator-focus */}



Calls [focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) on the matching element.

**Usage**

```csharp
await Locator.FocusAsync(options);
```

**Arguments**
- `options` `LocatorFocusOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### FrameLocator {/* #locator-frame-locator */}



When working with iframes, you can create a frame locator that will enter the iframe and allow locating elements in that iframe:

**Usage**

```csharp
var locator = page.FrameLocator("iframe").GetByText("Submit");
await locator.ClickAsync();
```

**Arguments**
- `selector` string
  
  A selector to use when resolving DOM element.

**Returns**
- FrameLocator

---

### GetAttributeAsync {/* #locator-get-attribute */}



Returns the matching element's attribute value.

:::warningAsserting attributes

If you need to assert an element's attribute, prefer [Expect(Locator).ToHaveAttributeAsync()](/api/class-locatorassertions.mdx#locator-assertions-to-have-attribute) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

```csharp
await Locator.GetAttributeAsync(name, options);
```

**Arguments**
- `name` string
  
  Attribute name to get the value for.
- `options` `LocatorGetAttributeOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- string?

---

### GetByAltText {/* #locator-get-by-alt-text */}



Allows locating elements by their alt text.

**Usage**

For example, this method will find the image by alt text "Playwright logo":

```html
<img alt='Playwright logo'>
```

```csharp
await page.GetByAltText("Playwright logo").ClickAsync();
```

**Arguments**
- `text` string | Regex
  
  Text to locate the element for.
- `options` `LocatorGetByAltTextOptions?` *(optional)*
  - `Exact` bool? *(optional)*
    
    Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### GetByLabel {/* #locator-get-by-label */}



Allows locating input elements by the text of the associated `<label>` or `aria-labelledby` element, or by the `aria-label` attribute.

**Usage**

For example, this method will find inputs by label "Username" and "Password" in the following DOM:

```html
<input aria-label="Username">
<label for="password-input">Password:</label>
<input id="password-input">
```

```csharp
await page.GetByLabel("Username").FillAsync("john");
await page.GetByLabel("Password").FillAsync("secret");
```

**Arguments**
- `text` string | Regex
  
  Text to locate the element for.
- `options` `LocatorGetByLabelOptions?` *(optional)*
  - `Exact` bool? *(optional)*
    
    Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### GetByPlaceholder {/* #locator-get-by-placeholder */}



Allows locating input elements by the placeholder text.

**Usage**

For example, consider the following DOM structure.

```html
<input type="email" placeholder="name@example.com" />
```

You can fill the input after locating it by the placeholder text:

```csharp
await page
    .GetByPlaceholder("name@example.com")
    .FillAsync("playwright@microsoft.com");
```

**Arguments**
- `text` string | Regex
  
  Text to locate the element for.
- `options` `LocatorGetByPlaceholderOptions?` *(optional)*
  - `Exact` bool? *(optional)*
    
    Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### GetByRole {/* #locator-get-by-role */}



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

```csharp
await Expect(Page
    .GetByRole(AriaRole.Heading, new() { Name = "Sign up" }))
    .ToBeVisibleAsync();

await page
    .GetByRole(AriaRole.Checkbox, new() { Name = "Subscribe" })
    .CheckAsync();

await page
    .GetByRole(AriaRole.Button, new() {
        NameRegex = new Regex("submit", RegexOptions.IgnoreCase)
    })
    .ClickAsync();
```

**Arguments**
- `role` `enum AriaRole { Alert, Alertdialog, Application, Article, Banner, Blockquote, Button, Caption, Cell, Checkbox, Code, Columnheader, Combobox, Complementary, Contentinfo, Definition, Deletion, Dialog, Directory, Document, Emphasis, Feed, Figure, Form, Generic, Grid, Gridcell, Group, Heading, Img, Insertion, Link, List, Listbox, Listitem, Log, Main, Marquee, Math, Meter, Menu, Menubar, Menuitem, Menuitemcheckbox, Menuitemradio, Navigation, None, Note, Option, Paragraph, Presentation, Progressbar, Radio, Radiogroup, Region, Row, Rowgroup, Rowheader, Scrollbar, Search, Searchbox, Separator, Slider, Spinbutton, Status, Strong, Subscript, Superscript, Switch, Tab, Table, Tablist, Tabpanel, Term, Textbox, Time, Timer, Toolbar, Tooltip, Tree, Treegrid, Treeitem }`
  
  Required aria role.
- `options` `LocatorGetByRoleOptions?` *(optional)*
  - `Checked` bool? *(optional)*
    
    An attribute that is usually set by `aria-checked` or native `<input type=checkbox>` controls.
    
    Learn more about [`aria-checked`](https://www.w3.org/TR/wai-aria-1.2/#aria-checked).
  - `Description|DescriptionRegex` string? | Regex? *(optional)* 
    
    Option to match the [accessible description](https://w3c.github.io/accname/#dfn-accessible-description). By default, matching is case-insensitive and searches for a substring, use [Exact](/api/class-locator.mdx#locator-get-by-role-option-exact) to control this behavior.
    
    Learn more about [accessible description](https://w3c.github.io/accname/#dfn-accessible-description).
  - `Disabled` bool? *(optional)*
    
    An attribute that is usually set by `aria-disabled` or `disabled`.
    
    :::note
    
    Unlike most other attributes, `disabled` is inherited through the DOM hierarchy. Learn more about [`aria-disabled`](https://www.w3.org/TR/wai-aria-1.2/#aria-disabled).
    :::
    
  - `Exact` bool? *(optional)* 
    
    Whether [Name|NameRegex](/api/class-locator.mdx#locator-get-by-role-option-name) and [Description|DescriptionRegex](/api/class-locator.mdx#locator-get-by-role-option-description) are matched exactly: case-sensitive and whole-string. Defaults to false. Ignored when the value is a regular expression. Note that exact match still trims whitespace.
  - `Expanded` bool? *(optional)*
    
    An attribute that is usually set by `aria-expanded`.
    
    Learn more about [`aria-expanded`](https://www.w3.org/TR/wai-aria-1.2/#aria-expanded).
  - `IncludeHidden` bool? *(optional)*
    
    Option that controls whether hidden elements are matched. By default, only non-hidden elements, as [defined by ARIA](https://www.w3.org/TR/wai-aria-1.2/#tree_exclusion), are matched by role selector.
    
    Learn more about [`aria-hidden`](https://www.w3.org/TR/wai-aria-1.2/#aria-hidden).
  - `Level` int? *(optional)*
    
    A number attribute that is usually present for roles `heading`, `listitem`, `row`, `treeitem`, with default values for `<h1>-<h6>` elements.
    
    Learn more about [`aria-level`](https://www.w3.org/TR/wai-aria-1.2/#aria-level).
  - `Name|NameRegex` string? | Regex? *(optional)*
    
    Option to match the [accessible name](https://w3c.github.io/accname/#dfn-accessible-name). By default, matching is case-insensitive and searches for a substring, use [Exact](/api/class-locator.mdx#locator-get-by-role-option-exact) to control this behavior.
    
    Learn more about [accessible name](https://w3c.github.io/accname/#dfn-accessible-name).
  - `Pressed` bool? *(optional)*
    
    An attribute that is usually set by `aria-pressed`.
    
    Learn more about [`aria-pressed`](https://www.w3.org/TR/wai-aria-1.2/#aria-pressed).
  - `Selected` bool? *(optional)*
    
    An attribute that is usually set by `aria-selected`.
    
    Learn more about [`aria-selected`](https://www.w3.org/TR/wai-aria-1.2/#aria-selected).

**Returns**
- Locator

**Details**

Role selector **does not replace** accessibility audits and conformance tests, but rather gives early feedback about the ARIA guidelines.

Many html elements have an implicitly [defined role](https://w3c.github.io/html-aam/#html-element-role-mappings) that is recognized by the role selector. You can find all the [supported roles here](https://www.w3.org/TR/wai-aria-1.2/#role_definitions). ARIA guidelines **do not recommend** duplicating implicit roles and attributes by setting `role` and/or `aria-*` attributes to default values.

---

### GetByTestId {/* #locator-get-by-test-id */}



Locate element by the test id.

**Usage**

Consider the following DOM structure.

```html
<button data-testid="directions">Itinéraire</button>
```

You can locate the element by its test id:

```csharp
await page.GetByTestId("directions").ClickAsync();
```

**Arguments**
- `testId` string | Regex
  
  Id to locate the element by.

**Returns**
- Locator

**Details**

By default, the `data-testid` attribute is used as a test id. Use [Selectors.SetTestIdAttribute()](/api/class-selectors.mdx#selectors-set-test-id-attribute) to configure a different test id attribute if necessary.

---

### GetByText {/* #locator-get-by-text */}



Allows locating elements that contain given text.

See also [Locator.Filter()](/api/class-locator.mdx#locator-filter) that allows to match by another criteria, like an accessible role, and then filter by the text content.

**Usage**

Consider the following DOM structure:

```html
<div>Hello <span>world</span></div>
<div>Hello</div>
```

You can locate by text substring, exact string, or a regular expression:

```csharp
// Matches <span>
page.GetByText("world");

// Matches first <div>
page.GetByText("Hello world");

// Matches second <div>
page.GetByText("Hello", new() { Exact = true });

// Matches both <div>s
page.GetByText(new Regex("Hello"));

// Matches second <div>
page.GetByText(new Regex("^hello$", RegexOptions.IgnoreCase));
```

**Arguments**
- `text` string | Regex
  
  Text to locate the element for.
- `options` `LocatorGetByTextOptions?` *(optional)*
  - `Exact` bool? *(optional)*
    
    Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

**Details**

Matching by text always normalizes whitespace, even with exact match. For example, it turns multiple spaces into one, turns line breaks into spaces and ignores leading and trailing whitespace.

Input elements of the type `button` and `submit` are matched by their `value` instead of the text content. For example, locating by text `"Log in"` matches `<input type=button value="Log in">`.

---

### GetByTitle {/* #locator-get-by-title */}



Allows locating elements by their title attribute.

**Usage**

Consider the following DOM structure.

```html
<span title='Issues count'>25 issues</span>
```

You can check the issues count after locating it by the title text:

```csharp
await Expect(Page.GetByTitle("Issues count")).toHaveText("25 issues");
```

**Arguments**
- `text` string | Regex
  
  Text to locate the element for.
- `options` `LocatorGetByTitleOptions?` *(optional)*
  - `Exact` bool? *(optional)*
    
    Whether to find an exact match: case-sensitive and whole-string. Default to false. Ignored when locating by a regular expression. Note that exact match still trims whitespace.

**Returns**
- Locator

---

### HideHighlightAsync {/* #locator-hide-highlight */}



Hides the element highlight previously added by [Locator.HighlightAsync()](/api/class-locator.mdx#locator-highlight).

**Usage**

```csharp
await Locator.HideHighlightAsync();
```

**Returns**
- void

---

### HighlightAsync {/* #locator-highlight */}



Highlight the corresponding element(s) on the screen. Useful for debugging, don't commit the code that uses [Locator.HighlightAsync()](/api/class-locator.mdx#locator-highlight).

**Usage**

```csharp
await Locator.HighlightAsync(options);
```

**Arguments**
- `options` `LocatorHighlightOptions?` *(optional)*
  - `Style` string? *(optional)* 
    
    Additional inline CSS applied to the highlight overlay, e.g. `"outline: 2px dashed red"`.

**Returns**
- Disposable

---

### HoverAsync {/* #locator-hover */}



Hover over the matching element.

**Usage**

```csharp
await page.GetByRole(AriaRole.Link).HoverAsync();
```

**Arguments**
- `options` `LocatorHoverOptions?` *(optional)*
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
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- void

**Details**

This method hovers over the element by performing the following steps:
1. Wait for [actionability](../actionability.mdx) checks on the element, unless [Force](/api/class-locator.mdx#locator-hover-option-force) option is set.
1. Scroll the element into view if needed.
1. Use [Page.Mouse](/api/class-page.mdx#page-mouse) to hover over the center of the element, or the specified [Position](/api/class-locator.mdx#locator-hover-option-position).

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [Timeout](/api/class-locator.mdx#locator-hover-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

---

### InnerHTMLAsync {/* #locator-inner-html */}



Returns the [`element.innerHTML`](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML).

**Usage**

```csharp
await Locator.InnerHTMLAsync(options);
```

**Arguments**
- `options` `LocatorInnerHTMLOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- string

---

### InnerTextAsync {/* #locator-inner-text */}



Returns the [`element.innerText`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText).

:::warningAsserting text

If you need to assert text on the page, prefer [Expect(Locator).ToHaveTextAsync()](/api/class-locatorassertions.mdx#locator-assertions-to-have-text) with [UseInnerText](/api/class-locatorassertions.mdx#locator-assertions-to-have-text-option-use-inner-text) option to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

```csharp
await Locator.InnerTextAsync(options);
```

**Arguments**
- `options` `LocatorInnerTextOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- string

---

### InputValueAsync {/* #locator-input-value */}



Returns the value for the matching `<input>` or `<textarea>` or `<select>` element.

:::warningAsserting value

If you need to assert input value, prefer [Expect(Locator).ToHaveValueAsync()](/api/class-locatorassertions.mdx#locator-assertions-to-have-value) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

```csharp
String value = await page.GetByRole(AriaRole.Textbox).InputValueAsync();
```

**Arguments**
- `options` `LocatorInputValueOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- string

**Details**

Throws elements that are not an input, textarea or a select. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), returns the value of the control.

---

### IsCheckedAsync {/* #locator-is-checked */}



Returns whether the element is checked. Throws if the element is not a checkbox or radio input.

:::warningAsserting checked state

If you need to assert that checkbox is checked, prefer [Expect(Locator).ToBeCheckedAsync()](/api/class-locatorassertions.mdx#locator-assertions-to-be-checked) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

```csharp
var isChecked = await page.GetByRole(AriaRole.Checkbox).IsCheckedAsync();
```

**Arguments**
- `options` `LocatorIsCheckedOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- bool

---

### IsDisabledAsync {/* #locator-is-disabled */}



Returns whether the element is disabled, the opposite of [enabled](../actionability.mdx#enabled).

:::warningAsserting disabled state

If you need to assert that an element is disabled, prefer [Expect(Locator).ToBeDisabledAsync()](/api/class-locatorassertions.mdx#locator-assertions-to-be-disabled) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

```csharp
Boolean disabled = await page.GetByRole(AriaRole.Button).IsDisabledAsync();
```

**Arguments**
- `options` `LocatorIsDisabledOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- bool

---

### IsEditableAsync {/* #locator-is-editable */}



Returns whether the element is [editable](../actionability.mdx#editable). If the target element is not an `<input>`, `<textarea>`, `<select>`, `contenteditable` and does not have a role allowing `aria-readonly`, this method throws an error.

:::warningAsserting editable state

If you need to assert that an element is editable, prefer [Expect(Locator).ToBeEditableAsync()](/api/class-locatorassertions.mdx#locator-assertions-to-be-editable) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

```csharp
Boolean editable = await page.GetByRole(AriaRole.Textbox).IsEditableAsync();
```

**Arguments**
- `options` `LocatorIsEditableOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- bool

---

### IsEnabledAsync {/* #locator-is-enabled */}



Returns whether the element is [enabled](../actionability.mdx#enabled).

:::warningAsserting enabled state

If you need to assert that an element is enabled, prefer [Expect(Locator).ToBeEnabledAsync()](/api/class-locatorassertions.mdx#locator-assertions-to-be-enabled) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

```csharp
Boolean enabled = await page.GetByRole(AriaRole.Button).IsEnabledAsync();
```

**Arguments**
- `options` `LocatorIsEnabledOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- bool

---

### IsHiddenAsync {/* #locator-is-hidden */}



Returns whether the element is hidden, the opposite of [visible](../actionability.mdx#visible).

:::warningAsserting visibility

If you need to assert that element is hidden, prefer [Expect(Locator).ToBeHiddenAsync()](/api/class-locatorassertions.mdx#locator-assertions-to-be-hidden) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

```csharp
Boolean hidden = await page.GetByRole(AriaRole.Button).IsHiddenAsync();
```

**Arguments**
- `options` `LocatorIsHiddenOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    :::warningDeprecated
    This option is ignored. [Locator.IsHiddenAsync()](/api/class-locator.mdx#locator-is-hidden) does not wait for the element to become hidden and returns immediately.
    :::
    

**Returns**
- bool

---

### IsVisibleAsync {/* #locator-is-visible */}



Returns whether the element is [visible](../actionability.mdx#visible).

:::warningAsserting visibility

If you need to assert that element is visible, prefer [Expect(Locator).ToBeVisibleAsync()](/api/class-locatorassertions.mdx#locator-assertions-to-be-visible) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

```csharp
Boolean visible = await page.GetByRole(AriaRole.Button).IsVisibleAsync();
```

**Arguments**
- `options` `LocatorIsVisibleOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    :::warningDeprecated
    This option is ignored. [Locator.IsVisibleAsync()](/api/class-locator.mdx#locator-is-visible) does not wait for the element to become visible and returns immediately.
    :::
    

**Returns**
- bool

---

### Last {/* #locator-last */}



Returns locator to the last matching element.

**Usage**

```csharp
var banana = await page.GetByRole(AriaRole.Listitem).Last(1);
```

**Returns**
- Locator

---

### Locator {/* #locator-locator */}



The method finds an element matching the specified selector in the locator's subtree. It also accepts filter options, similar to [Locator.Filter()](/api/class-locator.mdx#locator-filter) method.

[Learn more about locators](../locators.mdx).

**Usage**

```csharp
Locator.Locator(selectorOrLocator, options);
```

**Arguments**
- `selectorOrLocator` string | Locator
  
  A selector or locator to use when resolving DOM element.
- `options` `LocatorLocatorOptions?` *(optional)*
  - `Has` Locator? *(optional)*
    
    Narrows down the results of the method to those which contain elements matching this relative locator. For example, `article` that has `text=Playwright` matches `<article><div>Playwright</div></article>`.
    
    Inner locator **must be relative** to the outer locator and is queried starting with the outer locator match, not the document root. For example, you can find `content` that has `div` in `<article><content><div>Playwright</div></content></article>`. However, looking for `content` that has `article div` will fail, because the inner locator must be relative and should not use any elements outside the `content`.
    
    Note that outer and inner locators must belong to the same frame. Inner locator must not contain FrameLocators.
  - `HasNot` Locator? *(optional)* 
    
    Matches elements that do not contain an element that matches an inner locator. Inner locator is queried against the outer one. For example, `article` that does not have `div` matches `<article><span>Playwright</span></article>`.
    
    Note that outer and inner locators must belong to the same frame. Inner locator must not contain FrameLocators.
  - `HasNotText|HasNotTextRegex` string? | Regex? *(optional)* 
    
    Matches elements that do not contain specified text somewhere inside, possibly in a child or a descendant element. When passed a string, matching is case-insensitive and searches for a substring.
  - `HasText|HasTextRegex` string? | Regex? *(optional)*
    
    Matches elements containing specified text somewhere inside, possibly in a child or a descendant element. When passed a string, matching is case-insensitive and searches for a substring. For example, `"Playwright"` matches `<article><div>Playwright</div></article>`.

**Returns**
- Locator

---

### NormalizeAsync {/* #locator-normalize */}



Returns a new locator that uses best practices for referencing the matched element, prioritizing test ids, aria roles, and other user-facing attributes over CSS selectors. This is useful for converting implementation-detail selectors into more resilient, human-readable locators.

**Usage**

```csharp
await Locator.NormalizeAsync();
```

**Returns**
- Locator

---

### Nth {/* #locator-nth */}



Returns locator to the n-th matching element. It's zero based, `nth(0)` selects the first element.

**Usage**

```csharp
var banana = await page.GetByRole(AriaRole.Listitem).Nth(2);
```

**Arguments**
- `index` int

**Returns**
- Locator

---

### Or {/* #locator-or */}



Creates a locator matching all elements that match one or both of the two locators.

Note that when both locators match something, the resulting locator will have multiple matches, potentially causing a [locator strictness](../locators.mdx#strictness) violation.

**Usage**

Consider a scenario where you'd like to click on a "New email" button, but sometimes a security settings dialog shows up instead. In this case, you can wait for either a "New email" button, or a dialog and act accordingly.

:::note

If both "New email" button and security dialog appear on screen, the "or" locator will match both of them, possibly throwing the ["strict mode violation" error](../locators.mdx#strictness). In this case, you can use [Locator.First](/api/class-locator.mdx#locator-first) to only match one of them.
:::

```csharp
var newEmail = page.GetByRole(AriaRole.Button, new() { Name = "New" });
var dialog = page.GetByText("Confirm security settings");
await Expect(newEmail.Or(dialog).First).ToBeVisibleAsync();
if (await dialog.IsVisibleAsync())
  await page.GetByRole(AriaRole.Button, new() { Name = "Dismiss" }).ClickAsync();
await newEmail.ClickAsync();
```

**Arguments**
- `locator` Locator
  
  Alternative locator to match.

**Returns**
- Locator

---

### Page {/* #locator-page */}



A page this locator belongs to.

**Usage**

```csharp
Locator.Page
```

**Returns**
- Page

---

### PressAsync {/* #locator-press */}



Focuses the matching element and presses a combination of the keys.

**Usage**

```csharp
await page.GetByRole(AriaRole.Textbox).PressAsync("Backspace");
```

**Arguments**
- `key` string
  
  Name of the key to press or a character to generate, such as `ArrowLeft` or `a`.
- `options` `LocatorPressOptions?` *(optional)*
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

**Details**

Focuses the element, and then uses [Keyboard.DownAsync()](/api/class-keyboard.mdx#keyboard-down) and [Keyboard.UpAsync()](/api/class-keyboard.mdx#keyboard-up).

[key](/api/class-locator.mdx#locator-press-option-key) can specify the intended [keyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key) value or a single character to generate the text for. A superset of the [key](/api/class-locator.mdx#locator-press-option-key) values can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values). Examples of the keys are:

`F1` - `F12`, `Digit0`- `Digit9`, `KeyA`- `KeyZ`, `Backquote`, `Minus`, `Equal`, `Backslash`, `Backspace`, `Tab`, `Delete`, `Escape`, `ArrowDown`, `End`, `Enter`, `Home`, `Insert`, `PageDown`, `PageUp`, `ArrowRight`, `ArrowUp`, etc.

Following modification shortcuts are also supported: `Shift`, `Control`, `Alt`, `Meta`, `ShiftLeft`, `ControlOrMeta`. `ControlOrMeta` resolves to `Control` on Windows and Linux and to `Meta` on macOS.

Holding down `Shift` will type the text that corresponds to the [key](/api/class-locator.mdx#locator-press-option-key) in the upper case.

If [key](/api/class-locator.mdx#locator-press-option-key) is a single character, it is case-sensitive, so the values `a` and `A` will generate different respective texts.

Shortcuts such as `key: "Control+o"`, `key: "Control++` or `key: "Control+Shift+T"` are supported as well. When specified with the modifier, modifier is pressed and being held while the subsequent key is being pressed.

---

### PressSequentiallyAsync {/* #locator-press-sequentially */}



:::tip

In most cases, you should use [Locator.FillAsync()](/api/class-locator.mdx#locator-fill) instead. You only need to press keys one by one if there is special keyboard handling on the page.
:::

Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [Locator.PressAsync()](/api/class-locator.mdx#locator-press).

**Usage**

```csharp
await locator.PressSequentiallyAsync("Hello"); // Types instantly
await locator.PressSequentiallyAsync("World", new() { Delay = 100 }); // Types slower, like a user
```

An example of typing into a text field and then submitting the form:

```csharp
var locator = page.GetByLabel("Password");
await locator.PressSequentiallyAsync("my password");
await locator.PressAsync("Enter");
```

**Arguments**
- `text` string
  
  String of characters to sequentially press into a focused element.
- `options` `LocatorPressSequentiallyOptions?` *(optional)*
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

### ScreenshotAsync {/* #locator-screenshot */}



Take a screenshot of the element matching the locator.

**Usage**

```csharp
await page.GetByRole(AriaRole.Link).ScreenshotAsync();
```

Disable animations and save screenshot to a file:

```csharp
await page.GetByRole(AriaRole.Link).ScreenshotAsync(new() {
  Animations = ScreenshotAnimations.Disabled,
  Path = "link.png"
});
```

**Arguments**
- `options` `LocatorScreenshotOptions?` *(optional)*
  - `Animations` `enum ScreenshotAnimations { Disabled, Allow }?` *(optional)*
    
    When set to `"disabled"`, stops CSS animations, CSS transitions and Web Animations. Animations get different treatment depending on their duration:
    * finite animations are fast-forwarded to completion, so they'll fire `transitionend` event.
    * infinite animations are canceled to initial state, and then played over after the screenshot.
    
    Defaults to `"allow"` that leaves animations untouched.
  - `Caret` `enum ScreenshotCaret { Hide, Initial }?` *(optional)*
    
    When set to `"hide"`, screenshot will hide text caret. When set to `"initial"`, text caret behavior will not be changed.  Defaults to `"hide"`.
  - `Mask` IEnumerable?<Locator> *(optional)*
    
    Specify locators that should be masked when the screenshot is taken. Masked elements will be overlaid with a pink box `#FF00FF` (customized by [MaskColor](/api/class-locator.mdx#locator-screenshot-option-mask-color)) that completely covers its bounding box. The mask is also applied to invisible elements, see [Matching only visible elements](../locators.mdx#matching-only-visible-elements) to disable that.
  - `MaskColor` string? *(optional)* 
    
    Specify the color of the overlay box for masked elements, in [CSS color format](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). Default color is pink `#FF00FF`.
  - `OmitBackground` bool? *(optional)*
    
    Hides default white background and allows capturing screenshots with transparency. Not applicable to `jpeg` images. Defaults to `false`.
  - `Path` string? *(optional)*
    
    The file path to save the image to. The screenshot type will be inferred from file extension. If [Path](/api/class-locator.mdx#locator-screenshot-option-path) is a relative path, then it is resolved relative to the current working directory. If no path is provided, the image won't be saved to the disk.
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

**Details**

This method captures a screenshot of the page, clipped to the size and position of a particular element matching the locator. If the element is covered by other elements, it will not be actually visible on the screenshot. If the element is a scrollable container, only the currently scrolled content will be visible on the screenshot.

This method waits for the [actionability](../actionability.mdx) checks, then scrolls element into view before taking a screenshot. If the element is detached from DOM, the method throws an error.

Returns the buffer with the captured screenshot.

---

### ScrollIntoViewIfNeededAsync {/* #locator-scroll-into-view-if-needed */}



This method waits for [actionability](../actionability.mdx) checks, then tries to scroll element into view, unless it is completely visible as defined by [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)'s `ratio`.

See [scrolling](../input.mdx#scrolling) for alternative ways to scroll.

**Usage**

```csharp
await Locator.ScrollIntoViewIfNeededAsync(options);
```

**Arguments**
- `options` `LocatorScrollIntoViewIfNeededOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### SelectOptionAsync {/* #locator-select-option */}



Selects option or options in `<select>`.

**Usage**

```html
<select multiple>
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</select>
```

```csharp
// single selection matching the value or label
await element.SelectOptionAsync(new[] { "blue" });
// single selection matching the label
await element.SelectOptionAsync(new[] { new SelectOptionValue() { Label = "blue" } });
// multiple selection for blue, red and second option
await element.SelectOptionAsync(new[] { "red", "green", "blue" });
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
- `options` `LocatorSelectOptionOptions?` *(optional)*
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

**Details**

This method waits for [actionability](../actionability.mdx) checks, waits until all specified options are present in the `<select>` element and selects these options.

If the target element is not a `<select>` element, this method throws an error. However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), the control will be used instead.

Returns the array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.

---

### SelectTextAsync {/* #locator-select-text */}



This method waits for [actionability](../actionability.mdx) checks, then focuses the element and selects all its text content.

If the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), focuses and selects text in the control instead.

**Usage**

```csharp
await Locator.SelectTextAsync(options);
```

**Arguments**
- `options` `LocatorSelectTextOptions?` *(optional)*
  - `Force` bool? *(optional)*
    
    Whether to bypass the [actionability](../actionability.mdx) checks. Defaults to `false`.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### SetCheckedAsync {/* #locator-set-checked */}



Set the state of a checkbox or a radio element.

**Usage**

```csharp
await page.GetByRole(AriaRole.Checkbox).SetCheckedAsync(true);
```

**Arguments**
- `checkedState` bool
  
  Whether to check or uncheck the checkbox.
- `options` `LocatorSetCheckedOptions?` *(optional)*
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

**Details**

This method checks or unchecks an element by performing the following steps:
1. Ensure that matched element is a checkbox or a radio input. If not, this method throws.
1. If the element already has the right checked state, this method returns immediately.
1. Wait for [actionability](../actionability.mdx) checks on the matched element, unless [Force](/api/class-locator.mdx#locator-set-checked-option-force) option is set. If the element is detached during the checks, the whole action is retried.
1. Scroll the element into view if needed.
1. Use [Page.Mouse](/api/class-page.mdx#page-mouse) to click in the center of the element.
1. Ensure that the element is now checked or unchecked. If not, this method throws.

When all steps combined have not finished during the specified [Timeout](/api/class-locator.mdx#locator-set-checked-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

---

### SetInputFilesAsync {/* #locator-set-input-files */}



Upload file or multiple files into `<input type=file>`. For inputs with a `webkitdirectory` attribute, only a single directory path is supported.

**Usage**

```csharp
// Select one file
await page.GetByLabel("Upload file").SetInputFilesAsync("myfile.pdf");

// Select multiple files
await page.GetByLabel("Upload files").SetInputFilesAsync(new[] { "file1.txt", "file12.txt" });

// Select a directory
await page.GetByLabel("Upload directory").SetInputFilesAsync("mydir");

// Remove all the selected files
await page.GetByLabel("Upload file").SetInputFilesAsync(new[] {});

// Upload buffer from memory
await page.GetByLabel("Upload file").SetInputFilesAsync(new FilePayload
{
    Name = "file.txt",
    MimeType = "text/plain",
    Buffer = System.Text.Encoding.UTF8.GetBytes("this is a test"),
});
```

**Arguments**
- `files` string | IEnumerable<string> | `FilePayload` | IEnumerable<`FilePayload`>
  - `Name` string
    
    File name
  - `MimeType` string
    
    File type
  - `Buffer` byte&#91;&#93;
    
    File content
- `options` `LocatorSetInputFilesOptions?` *(optional)*
  - `NoWaitAfter` bool? *(optional)*
    
    :::warningDeprecated
    This option has no effect.
    :::
    
    
    This option has no effect.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

**Details**

Sets the value of the file input to these file paths or files. If some of the `filePaths` are relative paths, then they are resolved relative to the current working directory. For empty array, clears the selected files.

This method expects Locator to point to an [input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input). However, if the element is inside the `<label>` element that has an associated [control](https://developer.mozilla.org/en-US/docs/Web/API/HTMLLabelElement/control), targets the control instead.

---

### TapAsync {/* #locator-tap */}



Perform a tap gesture on the element matching the locator. For examples of emulating other gestures by manually dispatching touch events, see the [emulating legacy touch events](../touch-events.mdx) page.

**Usage**

```csharp
await Locator.TapAsync(options);
```

**Arguments**
- `options` `LocatorTapOptions?` *(optional)*
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
    
    When set, this method only performs the [actionability](../actionability.mdx) checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

**Returns**
- void

**Details**

This method taps the element by performing the following steps:
1. Wait for [actionability](../actionability.mdx) checks on the element, unless [Force](/api/class-locator.mdx#locator-tap-option-force) option is set.
1. Scroll the element into view if needed.
1. Use [Page.Touchscreen](/api/class-page.mdx#page-touchscreen) to tap the center of the element, or the specified [Position](/api/class-locator.mdx#locator-tap-option-position).

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [Timeout](/api/class-locator.mdx#locator-tap-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

:::note

`element.tap()` requires that the `hasTouch` option of the browser context be set to true.
:::

---

### TextContentAsync {/* #locator-text-content */}



Returns the [`node.textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent).

:::warningAsserting text

If you need to assert text on the page, prefer [Expect(Locator).ToHaveTextAsync()](/api/class-locatorassertions.mdx#locator-assertions-to-have-text) to avoid flakiness. See [assertions guide](../test-assertions.mdx) for more details.
:::

**Usage**

```csharp
await Locator.TextContentAsync(options);
```

**Arguments**
- `options` `LocatorTextContentOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- string?

---

### UncheckAsync {/* #locator-uncheck */}



Ensure that checkbox or radio element is unchecked.

**Usage**

```csharp
await page.GetByRole(AriaRole.Checkbox).UncheckAsync();
```

**Arguments**
- `options` `LocatorUncheckOptions?` *(optional)*
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

**Details**

This method unchecks the element by performing the following steps:
1. Ensure that element is a checkbox or a radio input. If not, this method throws. If the element is already unchecked, this method returns immediately.
1. Wait for [actionability](../actionability.mdx) checks on the element, unless [Force](/api/class-locator.mdx#locator-uncheck-option-force) option is set.
1. Scroll the element into view if needed.
1. Use [Page.Mouse](/api/class-page.mdx#page-mouse) to click in the center of the element.
1. Ensure that the element is now unchecked. If not, this method throws.

If the element is detached from the DOM at any moment during the action, this method throws.

When all steps combined have not finished during the specified [Timeout](/api/class-locator.mdx#locator-uncheck-option-timeout), this method throws a TimeoutError. Passing zero timeout disables this.

---

### WaitForAsync {/* #locator-wait-for */}



Returns when element specified by locator satisfies the [State](/api/class-locator.mdx#locator-wait-for-option-state) option.

If target element already satisfies the condition, the method returns immediately. Otherwise, waits for up to [Timeout](/api/class-locator.mdx#locator-wait-for-option-timeout) milliseconds until the condition is met.

**Usage**

```csharp
var orderSent = page.Locator("#order-sent");
orderSent.WaitForAsync();
```

**Arguments**
- `options` `LocatorWaitForOptions?` *(optional)*
  - `State` `enum WaitForSelectorState { Attached, Detached, Visible, Hidden }?` *(optional)*
    
    Defaults to `'visible'`. Can be either:
    * `'attached'` - wait for element to be present in DOM.
    * `'detached'` - wait for element to not be present in DOM.
    * `'visible'` - wait for element to have non-empty bounding box and no `visibility:hidden`. Note that element without any content or with `display:none` has an empty bounding box and is not considered visible.
    * `'hidden'` - wait for element to be either detached from DOM, or have an empty bounding box or `visibility:hidden`. This is opposite to the `'visible'` option.
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

### WaitForFunctionAsync {/* #locator-wait-for-function */}



Returns when [expression](/api/class-locator.mdx#locator-wait-for-function-option-expression) returns a truthy value, called with the matching element as a first argument, and [arg](/api/class-locator.mdx#locator-wait-for-function-option-arg) as a second argument.

This is a generic way to wait for an element to reach a custom condition without asserting it. The locator is re-resolved on each retry, so it tolerates the element being re-rendered while waiting.

If [expression](/api/class-locator.mdx#locator-wait-for-function-option-expression) returns a Promise, this method will wait for the promise to resolve before checking its value.

If [expression](/api/class-locator.mdx#locator-wait-for-function-option-expression) throws or rejects, this method throws.

**Usage**

Wait for an attribute to appear:

Passing argument to [expression](/api/class-locator.mdx#locator-wait-for-function-option-expression):

**Arguments**
- `expression` string
  
  JavaScript expression to be evaluated in the browser context. If the expression evaluates to a function, the function is automatically invoked.
- `arg` EvaluationArgument? *(optional)*
  
  Optional argument to pass to [expression](/api/class-locator.mdx#locator-wait-for-function-option-expression).
- `options` `LocatorWaitForFunctionOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- void

---

## Deprecated

### ElementHandleAsync {/* #locator-element-handle */}



:::warningDiscouraged

Always prefer using Locators and web assertions over ElementHandles because latter are inherently racy.

:::


Resolves given locator to the first matching DOM element. If there are no matching elements, waits for one. If multiple elements match the locator, throws.

**Usage**

```csharp
await Locator.ElementHandleAsync(options);
```

**Arguments**
- `options` `LocatorElementHandleOptions?` *(optional)*
  - `Timeout` float? *(optional)*
    
    Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [BrowserContext.SetDefaultTimeout()](/api/class-browsercontext.mdx#browser-context-set-default-timeout) or [Page.SetDefaultTimeout()](/api/class-page.mdx#page-set-default-timeout) methods.

**Returns**
- ElementHandle

---

### ElementHandlesAsync {/* #locator-element-handles */}



:::warningDiscouraged

Always prefer using Locators and web assertions over ElementHandles because latter are inherently racy.

:::


Resolves given locator to all matching DOM elements. If there are no matching elements, returns an empty list.

**Usage**

```csharp
await Locator.ElementHandlesAsync();
```

**Returns**
- IReadOnlyList<ElementHandle>

---

### TypeAsync {/* #locator-type */}



:::warningDeprecated

In most cases, you should use [Locator.FillAsync()](/api/class-locator.mdx#locator-fill) instead. You only need to press keys one by one if there is special keyboard handling on the page - in this case use [Locator.PressSequentiallyAsync()](/api/class-locator.mdx#locator-press-sequentially).

:::


Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [Locator.PressAsync()](/api/class-locator.mdx#locator-press).

**Usage**

**Arguments**
- `text` string
  
  A text to type into a focused element.
- `options` `LocatorTypeOptions?` *(optional)*
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
