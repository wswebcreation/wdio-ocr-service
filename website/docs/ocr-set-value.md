---
title: ocrSetValue
---
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
