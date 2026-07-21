# Intl.DurationFormat.supportedLocalesOf()

> **Source:** [developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/supportedLocalesOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DurationFormat/supportedLocalesOf)

---

The **`Intl.DurationFormat.supportedLocalesOf()`** static method returns an array containing those of the provided locales that are supported in duration formatting without having to fall back to the runtime's default locale.

## Syntax

```js-nolint
Intl.DurationFormat.supportedLocalesOf(locales)
Intl.DurationFormat.supportedLocalesOf(locales, options)
```

### Parameters

- `locales`
  - : A string with a `BCP 47 language tag`, or an array of such strings. For the general form and interpretation of the `locales` argument, see [the parameter description on the `Intl` main page](/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument).
- `options` (optional)
  - : An object that may have the following property:
    - `localeMatcher`
      - : The locale matching algorithm to use. Possible values are `"lookup"` and `"best fit"`; the default is `"best fit"`. For information about this option, see the `Intl` page.

### Return value

An array of strings representing a subset of the given locale tags that are supported in duration formatting without having to fall back to the runtime's default locale.

## Examples

### Using supportedLocalesOf()

Assuming a runtime that supports Indonesian and German but not Balinese in duration formatting, `supportedLocalesOf` returns the Indonesian and German language tags unchanged, even though `pinyin` collation is neither relevant to duration formatting nor used with Indonesian, and a specialized German for Indonesia is unlikely to be supported. Note the specification of the `"lookup"` algorithm here — a `"best fit"` matcher might decide that Indonesian is an adequate match for Balinese since most Balinese speakers also understand Indonesian, and therefore return the Balinese language tag as well.

```js
const locales = ["ban", "id-u-co-pinyin", "de-ID"];
const options = { localeMatcher: "lookup" };
console.log(Intl.DurationFormat.supportedLocalesOf(locales, options));
// ["id-u-co-pinyin", "de-ID"]
```

## Specifications



## Browser compatibility



## See also

- `Intl.DurationFormat`
