---
title: ocrClickOnText
---
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
