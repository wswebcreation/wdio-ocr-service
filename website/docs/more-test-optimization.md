---
title: Test execution time
---

By default this module will check if you have a local installation of Tesseract on your machine/in your pipeline. If you
don't have a local installation it will automatically use a [NodeJS](https://github.com/naptha/tesseract.js) version.
This might cause some slowness because the image processing will be done by Node.js. NodeJS is not the best system to do
heavy processing.

**BUT....**, there are ways to optimize the execution time. Let's take the following test script

```js
describe('My first OCR test', () => {
    it('should be able to login with the new selectors', () => {
        // Wait for the initial screen to be shown
        driver.ocrWaitForTextDisplayed('Username')

        // Sign in
        driver.ocrSetValue('Username', 'standard_user')
        driver.ocrSetValue('Password', 'secret_sauce')
        driver.ocrClickOnText('Login')

        // Wait for the text to be displayed
        driver.ocrWaitForTextDisplayed('PRODUCTS')

        // Assert that the page is shown
        expect(driver.ocrGetText()).toContain('PRODUCTS')
    })
})
```

When you execute this for the first time on a local Android emulator and a local iOS simulator you might see the
following results.

```log
[emulator-5554 Android 10 #0-0] Spec: /tests/e2e/specs/ocr.spec.ts
[emulator-5554 Android 10 #0-0] Running: emulator-5554 on Android 10 executing /apps/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk
[emulator-5554 Android 10 #0-0] Session ID: fd1b629c-77bb-42f2-8dbf-006c8a18e0c3
[emulator-5554 Android 10 #0-0]
[emulator-5554 Android 10 #0-0] My first OCR test
[emulator-5554 Android 10 #0-0]    ✓ should be able to login with the new selectors
[emulator-5554 Android 10 #0-0]
[emulator-5554 Android 10 #0-0] 1 passing (2m 0.4s)
------------------------------------------------------------------
[iPhone 11 iOS 14.2 #1-0] Spec: /tests/e2e/specs/ocr.spec.ts
[iPhone 11 iOS 14.2 #1-0] Running: iPhone 11 on iOS 14.2 executing /apps/iOS.Simulator.SauceLabs.Mobile.Sample.app.2.7.1.zip
[iPhone 11 iOS 14.2 #1-0] Session ID: 1df326fa-ae0a-41be-b4aa-6e0e76b69fef
[iPhone 11 iOS 14.2 #1-0]
[iPhone 11 iOS 14.2 #1-0] My first OCR test
[iPhone 11 iOS 14.2 #1-0]    ✓ should be able to login with the new selectors
[iPhone 11 iOS 14.2 #1-0]
[iPhone 11 iOS 14.2 #1-0] 1 passing (2m 34.7s)
```

## Re-using already processed images
You can optimize the execution time by re-using the already processed images by providing the option `{reuseOcr: true}`
for the following commands:

- [`ocrClickOnText`](./ocr-click-on-text)
- [`ocrGetElementPositionByText`](./ocr-get-element-position-by-text)
- [`ocrGetText`](./ocr-get-text)
- [`ocrSetValue`](./ocr-set-value)
- [`ocrSetValue`](./ocr-set-value)

If you would then change the script to this:

```js
describe('My OCR first test', () => {
    it('should be able to login with new ocr selectors', () => {
        // Wait for the initial screen to be shown
        driver.ocrWaitForTextDisplayed('Username')

        // Sign in
        driver.ocrSetValue('Username', 'standard_user', {reuseOcr: true})
        driver.ocrSetValue('Password', 'secret_sauce', {reuseOcr: true})
        driver.ocrClickOnText('Login', {reuseOcr: true})

        // Wait for the text to be displayed
        driver.ocrWaitForTextDisplayed('PRODUCTS')

        // Assert that the page is shown
        expect(driver.ocrGetText({reuseOcr: true})).toContain('PRODUCTS')
    })
})
```

Then you will see a different execution time.

```log
[iPhone 11 iOS 14.2 #1-0] Spec: /tests/e2e/specs/ocr.spec.ts
[iPhone 11 iOS 14.2 #1-0] Running: iPhone 11 on iOS 14.2 executing /apps/iOS.Simulator.SauceLabs.Mobile.Sample.app.2.7.1.zip
[iPhone 11 iOS 14.2 #1-0] Session ID: 7522423c-7b72-4c60-915f-eccd1caed11d
[iPhone 11 iOS 14.2 #1-0]
[iPhone 11 iOS 14.2 #1-0] My first OCR test
[iPhone 11 iOS 14.2 #1-0]    ✓ should be able to login with the new selectors
[iPhone 11 iOS 14.2 #1-0]
[iPhone 11 iOS 14.2 #1-0] 1 passing (1m 6.6s)
------------------------------------------------------------------
[emulator-5554 Android 10 #0-0] Spec: /tests/e2e/specs/ocr.spec.ts
[emulator-5554 Android 10 #0-0] Running: emulator-5554 on Android 10 executing /apps/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk
[emulator-5554 Android 10 #0-0] Session ID: 9011c9ca-b617-423b-b55a-f3a64bfae9e5
[emulator-5554 Android 10 #0-0]
[emulator-5554 Android 10 #0-0] My first OCR test
[emulator-5554 Android 10 #0-0]    ✓ should be able to login with the new selectors
[emulator-5554 Android 10 #0-0]
[emulator-5554 Android 10 #0-0] 1 passing (1m 11.3s)
```

:::tip Re-use images
This reduced the local execution time from **2 minutes** to **1 minute**.
:::

## Cropping the search area of a screen
You can optimize the execution time by:

- **AND** re-using the already processed images by providing the option `{reuseOcr: true}`, see
  [Re-using already processed images](#re-using-already-processed-images).
- **AND** by providing a cropped area for Android and or iOS to execute the OCR on.

:::info
Be aware of the fact that each device has its own screen resolution. You need to understand that this could lead to
different text in that cropped area because a smaller screen will hold less information than a bigger screen.
:::

You can provide **AND** Android **AND** iOS rectangles through the options for the following commands:

- [`ocrClickOnText`](./ocr-click-on-text)
- [`ocrGetElementPositionByText`](./ocr-get-element-position-by-text)
- [`ocrGetText`](./ocr-get-text)
- [`ocrSetValue`](./ocr-set-value)
- [`ocrSetValue`](./ocr-set-value)
- [`ocrWaitForTextDisplayed`](./ocr-wait-for-text-displayed)

in the following format:

```ts
{
  androidRectangles: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  },
  {
    iOSRectangles: {
      top: number;
      left: number;
      right: number;
      bottom: number;
    }
  }
}
```

If you would then change the script to this:

```js
describe('My OCR first test', () => {
  it('should be able to login with new ocr selectors and cropped images', () => {
    // Wait for the initial screen to be shown
    driver.ocrWaitForTextDisplayed(
      'Username',
      {
        iOSRectangles: {
          top: 300,
          left: 70,
          right: 750,
          bottom: 745,
        },
        androidRectangles: {
          top: 400,
          left: 100,
          right: 1000,
          bottom: 1100,
        }
      }
    )

    // Sign in
    driver.ocrSetValue('Username', 'standard_user', {reuseOcr: true})
    driver.ocrSetValue('Password', 'secret_sauce', {reuseOcr: true})
    driver.ocrClickOnText('Login', {reuseOcr: true})

    // Wait for the text to be displayed
    driver.ocrWaitForTextDisplayed(
      'PRODUCTS',
      {
        iOSRectangles: {
          top: 200,
          left: 0,
          right: 800,
          bottom: 400,
        },
        androidRectangles: {
          top: 160,
          left: 0,
          right: 800,
          bottom: 360,
        }
      }
    )

    // Assert that the page is shown
    expect(driver.ocrGetText({reuseOcr: true})).toContain('PRODUCTS')
  })
})
```

Then you will see a different execution time.

```log
[iPhone 11 iOS 14.2 #1-0] Spec: tests/e2e/specs/ocr.spec.ts
[iPhone 11 iOS 14.2 #1-0] Running: iPhone 11 on iOS 14.2 executing apps/iOS.Simulator.SauceLabs.Mobile.Sample.app.2.7.1.zip
[iPhone 11 iOS 14.2 #1-0] Session ID: a1e59b85-62c7-455c-8037-952dd03f1821
[iPhone 11 iOS 14.2 #1-0]
[iPhone 11 iOS 14.2 #1-0] My OCR first test
[iPhone 11 iOS 14.2 #1-0]    ✓ should be able to login with new ocr selectors and cropped images
[iPhone 11 iOS 14.2 #1-0]
[iPhone 11 iOS 14.2 #1-0] 1 passing (18.6s)
------------------------------------------------------------------
[emulator-5554 Android 10 #0-0] Spec: tests/e2e/specs/ocr.spec.ts
[emulator-5554 Android 10 #0-0] Running: emulator-5554 on Android 10 executing apps/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk
[emulator-5554 Android 10 #0-0] Session ID: b5b37a08-562e-412b-9efb-2dd6b87b9cf2
[emulator-5554 Android 10 #0-0]
[emulator-5554 Android 10 #0-0] My OCR first test
[emulator-5554 Android 10 #0-0]    ✓ should be able to login with new ocr selectors and cropped images
[emulator-5554 Android 10 #0-0]
[emulator-5554 Android 10 #0-0] 1 passing (25s)

```

:::tip Cropping images
This reduced the local execution time from **2 minutes** to **20-25 seconds!**.
:::

## Using a local installation of Tesseract
You can speed up your execution time to even less than a minute if you would have a local installation of Tessarect on
your local machine and or in your pipeline (more information about installing Tesseract on your local system can be
found [here](https://tesseract-ocr.github.io/tessdoc/Installation.html)). You can find the execution time of the same
script using a local installation of Tesseract below.

```log
[iPhone 11 iOS 14.2 #1-0] Spec: /tests/e2e/specs/ocr.spec.ts
[iPhone 11 iOS 14.2 #1-0] Running: iPhone 11 on iOS 14.2 executing /apps/iOS.Simulator.SauceLabs.Mobile.Sample.app.2.7.1.zip
[iPhone 11 iOS 14.2 #1-0] Session ID: 27cf6492-c46f-40da-b88d-0cc7fe967234
[iPhone 11 iOS 14.2 #1-0]
[iPhone 11 iOS 14.2 #1-0] My first OCR test
[iPhone 11 iOS 14.2 #1-0]    ✓ should be able to login with the new selectors
[iPhone 11 iOS 14.2 #1-0]
[iPhone 11 iOS 14.2 #1-0] 1 passing (12.3s)
------------------------------------------------------------------
[emulator-5554 Android 10 #0-0] Spec: /tests/e2e/specs/ocr.spec.ts
[emulator-5554 Android 10 #0-0] Running: emulator-5554 on Android 10 executing /apps/Android.SauceLabs.Mobile.Sample.app.2.7.1.apk
[emulator-5554 Android 10 #0-0] Session ID: 2297f075-7991-4486-a161-5877be38955c
[emulator-5554 Android 10 #0-0]
[emulator-5554 Android 10 #0-0] My first OCR test
[emulator-5554 Android 10 #0-0]    ✓ should be able to login with the new selectors
[emulator-5554 Android 10 #0-0]
[emulator-5554 Android 10 #0-0] 1 passing (17.2s)
```
:::tip Local installation
This reduced the local execution time from **2 minutes** to **15-20 seconds!**.
:::
