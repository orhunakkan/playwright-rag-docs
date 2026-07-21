# Intl.Locale.prototype.getCalendars()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getCalendars](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getCalendars)

---

The **`getCalendars()`** method of `Intl.Locale` instances returns a list of one or more unique calendar identifiers for this locale.

> [!NOTE]
> In some versions of some browsers, this method was implemented as an accessor property called `calendars`. However, because it returns a new array on each access, it is now implemented as a method to prevent the situation of `locale.calendars === locale.calendars` returning `false`. Check the [browser compatibility table](#browser_compatibility) for details.

## Syntax

```js-nolint
getCalendars()
```

### Parameters

None.

### Return value

An array of strings representing all calendars commonly used for the `Locale`, sorted in descending preference. If the `Locale` already has a [`calendar`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/calendar), then the returned array contains that single value.

For a list of supported calendar types, see [`Intl.supportedValuesOf()`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/supportedValuesOf#supported_calendar_types).

## Examples

### Obtaining supported calendars

If the `Locale` object doesn't have a `calendar` already, `getCalendars()` lists all commonly-used calendars for the given `Locale`. For examples of explicitly setting a `calendar`, see [`calendar` examples](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/calendar#examples).

```js
const arEG = new Intl.Locale("ar-EG");
console.log(arEG.getCalendars()); // ["gregory", "coptic", "islamic", "islamic-civil", "islamic-tbla"]
```

```js
const jaJP = new Intl.Locale("ja-JP");
console.log(jaJP.getCalendars()); // ["gregory", "japanese"]
```

## Specifications



## Browser compatibility



## See also

- `Intl.Locale`
- [`Intl.Locale.prototype.calendar`](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/calendar)
- [Unicode Calendar Identifier](https://www.unicode.org/reports/tr35/#UnicodeCalendarIdentifier) in the Unicode locale data markup language spec
