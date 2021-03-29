# Commands
All commands and their options can be found below:

- [`ocrClickOnText`](#ocrclickontext)
- [`ocrGetElementPositionByText`](#ocrgetelementpositionbytext)
- [`ocrGetText`](#ocrgettext)
- [`ocrSetValue`](#ocrsetvalue)
- [`ocrWaitForTextDisplayed`](#ocrwaitfortextdisplayed)


## ocrClickOnText
Click on an element by its visible text.

### Usage
```js
driver.ocrClickOnText('Login')
```

### Options

| Name | Type | Default | Details |
| --- | --- | ---| --- |
| selector | `string` | | The visual name of the field |
| options (optional) | `SetValueOptions` | `{}` | command options |
| options.reuseOcr (optional) | `boolean` | `false` | Re-use a previous OCR scan if it is available |
| options.androidRectangles (optional) | `Rectangles` | | Rectangles for Android to crop the search area for OCR |
| options.androidRectangles.top | `number` | | Start position from the top of the screen to start cropping the search area for OCR |
| options.androidRectangles.left | `number` | | Start position from the left of the screen to start cropping the search area for OCR |
| options.androidRectangles.right | `number` | | Start position from the right of the screen to start cropping the search area for OCR |
| options.androidRectangles.bottom | `number` | | Start position from the bottom of the screen to start cropping the search area for OCR |
| options.iOSRectangles (optional) | `Rectangles` | | Rectangles for Android to crop the search area for OCR |
| options.iOSRectangles.top | `number` | | Start position from the top of the screen to start cropping the search area for OCR |
| options.iOSRectangles.left | `number` | | Start position from the left of the screen to start cropping the search area for OCR |
| options.iOSRectangles.right | `number` | | Start position from the right of the screen to start cropping the search area for OCR |
| options.iOSRectangles.bottom | `number` | | Start position from the bottom of the screen to start cropping the search area for OCR |

### Example
```js
it('should set the value of a visible element by using the visible text', () => {
  // Click on text
  driver.ocrClickOnText('Login')

  // OR with options
  driver.ocrClickOnText(
    'Login',
    {
      // Same as for iOSRectangles
      androidRectangles: {
        top: 200,
        left: 0,
        right: 800,
        bottom: 400,
      },
      reuseOcr: true,
    },
  )
})
```

## ocrGetElementPositionByText
Get the position of a text on the screen

### Usage
```js
driver.ocrGetElementPositionByText('Username')
```

### Options

| Name | Type | Default | Details |
| --- | --- | ---| --- |
| selector | `string` |  | The visual name of the field |
| options (optional) | `GetTextOptions` | `{}` | command options |
| options.reuseOcr (optional) | `boolean` | `false` | Re-use a previous OCR scan if it is available |
| options.androidRectangles (optional) | `Rectangles` | | Rectangles for Android to crop the search area for OCR |
| options.androidRectangles.top | `number` | | Start position from the top of the screen to start cropping the search area for OCR |
| options.androidRectangles.left | `number` | | Start position from the left of the screen to start cropping the search area for OCR |
| options.androidRectangles.right | `number` | | Start position from the right of the screen to start cropping the search area for OCR |
| options.androidRectangles.bottom | `number` | | Start position from the bottom of the screen to start cropping the search area for OCR |
| options.iOSRectangles (optional) | `Rectangles` | | Rectangles for Android to crop the search area for OCR |
| options.iOSRectangles.top | `number` | | Start position from the top of the screen to start cropping the search area for OCR |
| options.iOSRectangles.left | `number` | | Start position from the left of the screen to start cropping the search area for OCR |
| options.iOSRectangles.right | `number` | | Start position from the right of the screen to start cropping the search area for OCR |
| options.iOSRectangles.bottom | `number` | | Start position from the bottom of the screen to start cropping the search area for OCR |

### Returns
Returns the search value, the matched text, and the position of the element on the screen

```js
const result = {
  searchValue: 'Username',
  matchedString: 'Username',
  originalPosition: { left: 83, top: 326, right: 248, bottom: 352 },
  dprPosition: { left: 41.5, top: 163, right: 124, bottom: 176 },
  score: 100
}
```

### Example
```js
it('should be able to the position of the visble text on the screen', () => {
  driver.ocrGetElementPositionByText('Username')

  // OR with options
  driver.ocrGetElementPositionByText(
    'Username',
    {
      // Same as for iOSRectangles
      androidRectangles: {
        top: 200,
        left: 0,
        right: 800,
        bottom: 400,
      },
      reuseOcr:true,
    },
  )
})
```

## ocrGetText
Get the text on an image

### Usage
```js
driver.ocrGetText()
```

### Options

| Name | Type | Default | Details |
| --- | --- | ---| --- |
| options (optional) | `GetTextOptions` | `{}` | command options |
| options.reuseOcr (optional) | `boolean` | `false` | Re-use a previous OCR scan if it is available |
| options.androidRectangles (optional) | `Rectangles` | | Rectangles for Android to crop the search area for OCR |
| options.androidRectangles.top | `number` | | Start position from the top of the screen to start cropping the search area for OCR |
| options.androidRectangles.left | `number` | | Start position from the left of the screen to start cropping the search area for OCR |
| options.androidRectangles.right | `number` | | Start position from the right of the screen to start cropping the search area for OCR |
| options.androidRectangles.bottom | `number` | | Start position from the bottom of the screen to start cropping the search area for OCR |
| options.iOSRectangles (optional) | `Rectangles` | | Rectangles for Android to crop the search area for OCR |
| options.iOSRectangles.top | `number` | | Start position from the top of the screen to start cropping the search area for OCR |
| options.iOSRectangles.left | `number` | | Start position from the left of the screen to start cropping the search area for OCR |
| options.iOSRectangles.right | `number` | | Start position from the right of the screen to start cropping the search area for OCR |
| options.iOSRectangles.bottom | `number` | | Start position from the bottom of the screen to start cropping the search area for OCR |

### Returns
Returns the text on the screen

### Example
```js
it('should be able to the the text of a screen', () => {
  // Assert that the word `PRODUCTS` is shown
  expect(driver.ocrGetText()).toContain('PRODUCTS')

  // OR assert with options
  expect(driver.ocrGetText(
    {
      // Same as for iOSRectangles
      androidRectangles: {
        top: 200,
        left: 0,
        right: 800,
        bottom: 400,
      },
      reuseOcr:true,
    }
  )).toContain('PRODUCTS')
})
```

## ocrSetValue
Send a sequence of key strokes to an element. It will:
- automatically detect the element
- put focus on the field by clicking on it
- set the value in the field

### Usage
```js
driver.ocrSetValue('Username', 'standard_user')
```

### Options

| Name | Type | Default | Details |
| --- | --- | ---| --- |
| selector | `string` | | The visual name of the field |
| value | `string` | | Value to be added |
| options (optional) | `SetValueOptions` | `{}` | command options |
| options.androidRectangles (optional) | `Rectangles` | | Rectangles for Android to crop the search area for OCR |
| options.androidRectangles.top | `number` | | Start position from the top of the screen to start cropping the search area for OCR |
| options.androidRectangles.left | `number` | | Start position from the left of the screen to start cropping the search area for OCR |
| options.androidRectangles.right | `number` | | Start position from the right of the screen to start cropping the search area for OCR |
| options.androidRectangles.bottom | `number` | | Start position from the bottom of the screen to start cropping the search area for OCR |
| options.iOSRectangles (optional) | `Rectangles` | | Rectangles for Android to crop the search area for OCR |
| options.iOSRectangles.top | `number` | | Start position from the top of the screen to start cropping the search area for OCR |
| options.iOSRectangles.left | `number` | | Start position from the left of the screen to start cropping the search area for OCR |
| options.iOSRectangles.right | `number` | | Start position from the right of the screen to start cropping the search area for OCR |
| options.iOSRectangles.bottom | `number` | | Start position from the bottom of the screen to start cropping the search area for OCR |
| options.reuseOcr (optional) | `boolean` | `false` | Re-use a previous OCR scan if it is available |

### Example
```js
it('should set the value of a visible element by using the visible text', () => {
  // Set the value
  driver.ocrSetValue('Username', 'standard_user')

  // OR with options
  driver.ocrSetValue(
    'Username',
    'standard_user',
    {
      // Same as for iOSRectangles
      androidRectangles: {
        top: 200,
        left: 0,
        right: 800,
        bottom: 400,
      },
      reuseOcr: true,
    },
  )
})
```

## ocrWaitForTextDisplayed
Wait for a specific text to be displayed on the screen.

### Usage
```js
driver.ocrWaitForTextDisplayed('Username')
```

### Options

| Name | Type | Default | Details |
| --- | --- | ---| --- |
| selector | `string` |  | The text you want to wait for (mandatory) |
| options (optional) | `WaitForTextDisplayed` | `{}` | command options |
| options.androidRectangles (optional) | `Rectangles` | | Rectangles for Android to crop the search area for OCR |
| options.androidRectangles.top | `number` | | Start position from the top of the screen to start cropping the search area for OCR |
| options.androidRectangles.left | `number` | | Start position from the left of the screen to start cropping the search area for OCR |
| options.androidRectangles.right | `number` | | Start position from the right of the screen to start cropping the search area for OCR |
| options.androidRectangles.bottom | `number` | | Start position from the bottom of the screen to start cropping the search area for OCR |
| options.iOSRectangles (optional) | `Rectangles` | | Rectangles for Android to crop the search area for OCR |
| options.iOSRectangles.top | `number` | | Start position from the top of the screen to start cropping the search area for OCR |
| options.iOSRectangles.left | `number` | | Start position from the left of the screen to start cropping the search area for OCR |
| options.iOSRectangles.right | `number` | | Start position from the right of the screen to start cropping the search area for OCR |
| options.iOSRectangles.bottom | `number` | | Start position from the bottom of the screen to start cropping the search area for OCR |
| options.timeout (optional) | `number` | `180000` | Time in ms. *Be aware that the OCR process can take some time, so don't set it too low.* |
| options.timeoutMsg (optional) | `string` | `Could not find the text "{selector}" within the requested time.` | If exists it overrides the default error message |

### Example
```js
it('should detect when text is shown on the screen', () => {
  driver.ocrWaitForTextDisplayed('Username')

  // Wait with options
  driver.ocrWaitForTextDisplayed(
    'Username',
    {
      // Same as for iOSRectangles
      androidRectangles: {
        top: 200,
        left: 0,
        right: 800,
        bottom: 400,
      },
      timeout: 45000,
    },
  )
})
```
