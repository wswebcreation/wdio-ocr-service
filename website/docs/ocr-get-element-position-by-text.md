---
title: ocrGetElementPositionByText
---
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
