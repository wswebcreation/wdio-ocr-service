# OCR Services
A WebdriverIO service that is using Tesseract OCR for Appium Native App tests.

[![NPM](https://nodei.co/npm/wdio-ocr-service.png)](https://nodei.co/npm/wdio-ocr-service/)

- [Background](#background)
  - [How does it work](#how-does-it-work)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Configuration Options](#configuration-options)
- [Commands](#commands)
  - [`ocrClickOnText`](#ocrclickontext)
  - [`ocrGetElementPositionByText`](#ocrgetelementpositionbytext)
  - [`ocrGetText`](#ocrgettext)
  - [`ocrSetValue`](#ocrsetvalue)
  - [`ocrWaitForTextDisplayed`](#ocrwaitfortextdisplayed)
- [Test Execution Optimization](#test-execution-optimization)
- [FAQ](#faq)
- [TODO](#todo)

## Background
Sometimes it can be hard to find an element in a native app with the default
[WebdriverIO Mobile selectors](https://webdriver.io/docs/selectors#mobile-selectors). In that case it would be nice if
you would be able to use something like OCR
([Optical Character Recognition](https://en.wikipedia.org/wiki/Optical_character_recognition)) to interact with elements
on your screen.

This service provides you **that** option to interact with elements on your mobile screen based on **visible text**. It
will provide [multiple commands](./README.md#commands) to:

- wait
- search
- and interact

with an element, all based on text.

### How does it work
This service will

- create a screenshot of your screen
- uses [Optical Character Recognition](https://en.wikipedia.org/wiki/Optical_character_recognition) from
[Tesseract](https://github.com/tesseract-ocr/tesseract) to get all text from the screen
- uses Fuzzy Logic from [Fuse.js](https://fusejs.io/) to find strings that are *approximately equal* to a given pattern
  (rather than exactly)

It works with **ZERO** system dependencies (besides from what WebdriverIO uses) , but if needed it can also work with a
local installation from [Tesseract](https://tesseract-ocr.github.io/tessdoc/) which will reduce the execution time
drastically!

Enthusiastic? Start using it today by following the [installation](./README.md#installation) instructions below.

## Installation
The easiest way is to keep `wdio-ocr-service` as a devDependency in your `package.json`.

```json
{
  "devDependencies": {
    "wdio-ocr-service": "0.1.0"
  }
}
```

You can simply do it by:

```bash
npm install wdio-ocr-service --save-dev
```

Instructions on how to install `WebdriverIO` can be found [here.](https://webdriver.io/docs/gettingstarted.html).

> **NOTE:** This module uses Tesseract as an OCR engine. By default, it will verify if you have a local installation of
> Tesseract installed on your system, if so, it will use that. If not, it will use the
> [Node.js Tesseract.js](https://github.com/naptha/tesseract.js) module which is automatically installed for you.

Instruction on how to install Tesseract on your local system can be found
[here](https://tesseract-ocr.github.io/tessdoc/Installation.html).

> **NOTE:** For installation questions / errors with Tesseract please refer to the
> [Tesseract](https://github.com/tesseract-ocr/tesseract) project.

## Configuration
In order to use the service you need to add `ocr` to your services array in `wdio.conf.js`

```js
// wdio.conf.js
exports.config = {
  //...
  services: [
    // your other services
    [
      'ocr',
      {
        // The OCR options
        ocrImagesPath: 'ocr-images/',
      },
    ]
  ],
};
```

### Configuration Options
The following configuration options are supported and are all optional.

| Option | Default | Description |
| --- | --- | --- |
| ocrImagesPath | `{project-root}/.tmp` | The folder where the OCR-results are stored |

## Commands
### ocrClickOnText
Click on an element by its visible text.

#### Usage
```js
driver.ocrClickOnText('Login')
```

#### Options

| Name | Type | Default | Details |
| --- | --- | ---| --- |
| selector | `string` | | The visual name of the field |
| options (optional) | `SetValueOptions` | `{}` | command options |
| options.reuseOcr (optional) | `boolean` | `false` | Re-use a previous OCR scan if it is available |

#### Example
```js
it('should set the value of a visible element by using the visible text', () => {
  // Click on text
  driver.ocrClickOnText('Login')

  // OR with options
  driver.ocrClickOnText('Login', {reuseOcr: true})
})
```

### ocrGetElementPositionByText
Get the position of a text on the screen

#### Usage
```js
driver.ocrGetElementPositionByText('Username')
```

#### Options

| Name | Type | Default | Details |
| --- | --- | ---| --- |
| selector | `string` |  | The visual name of the field |
| options (optional) | `GetTextOptions` | `{}` | command options |
| options.reuseOcr (optional) | `boolean` | `false` | Re-use a previous OCR scan if it is available |

#### Returns
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

#### Example
```js
it('should be able to the position of the visble text on the screen', () => {
  driver.ocrGetElementPositionByText('Username')

  // OR with options
  driver.ocrGetElementPositionByText('Username', {reuseOcr:true})
})
```

### ocrGetText
Get the text on an image

#### Usage
```js
driver.ocrGetText()
```

#### Options

| Name | Type | Default | Details |
| --- | --- | ---| --- |
| options (optional) | `GetTextOptions` | `{}` | command options |
| options.reuseOcr (optional) | `boolean` | `false` | Re-use a previous OCR scan if it is available |

#### Returns
Returns the text on the screen

#### Example
```js
it('should be able to the the text of a screen', () => {
  // Assert that the word `PRODUCTS` is shown
  expect(driver.ocrGetText()).toContain('PRODUCTS')

  // OR assert with options
  expect(driver.ocrGetText({reuseOcr:true})).toContain('PRODUCTS')
})
```

### ocrSetValue
Send a sequence of key strokes to an element. It will:
- automatically detect the element
- put focus on the field by clicking on it
- set the value in the field

#### Usage
```js
driver.ocrSetValue('Username', 'standard_user')
```

#### Options

| Name | Type | Default | Details |
| --- | --- | ---| --- |
| selector | `string` | | The visual name of the field |
| value | `string` | | Value to be added |
| options (optional) | `SetValueOptions` | `{}` | command options |
| options.reuseOcr (optional) | `boolean` | `false` | Re-use a previous OCR scan if it is available |

#### Example
```js
it('should set the value of a visible element by using the visible text', () => {
  // Set the value
  driver.ocrSetValue('Username', 'standard_user')

  // OR with options
  driver.ocrSetValue('Username', 'standard_user', {reuseOcr: true})
})
```

### ocrWaitForTextDisplayed
Wait for a specific text to be displayed on the screen.

#### Usage
```js
driver.ocrWaitForTextDisplayed('Username')
```

#### Options

| Name | Type | Default | Details |
| --- | --- | ---| --- |
| selector | `string` |  | The text you want to wait for (mandatory) |
| options (optional) | `WaitForTextDisplayed` | `{}` | command options |
| options.timeout (optional) | `number` | `180000` | Time in ms. *Be aware that the OCR process can take some time, so don't set it too low.* |
| options.timeoutMsg (optional) | `string` | `Could not find the text "{selector}" within the requested time.` | If exists it overrides the default error message |

#### Example
```js
it('should detect when text is shown on the screen', () => {
  driver.ocrWaitForTextDisplayed('Username')

  // Wait with options
  driver.ocrWaitForTextDisplayed('Username', { timeout: 45000 })
})
```

## Test Execution Optimization
When you are using this service without a local installation of Tesseract you might experience some slowness. This has
to do with the fact that the image processing will be done by Node.js. This is not the best system to do heavy
processing.

**BUT....**, there are ways to optimize the execution time. Let's take the following test script

<details>
<summary>Click to expand and see the test script.</summary>

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
</details>

When you execute this for the first time on a local Android emulator and a local iOS simulator you might see the
following results.

<details>
<summary>Click to expand and see the logs.</summary>

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
</details>

You can optimize the execution time by re-using the already processed images by providing the option `{reuseOcr: true}`
for certain commands (see [here](./README.md#commands) which commands support this option). If you would then change the
script to this:

<details>
<summary>Click to expand and see the optimized test script.</summary>

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
</details>

Then you will see a different execution time.

<details>
<summary>Click to expand and see the local execution logs with re-using processed images enabled.</summary>

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
</details>

This almost reduced the local execution time from **2 minutes** to **1 minute**.

You can speed up your execution time to even less than a minute if you would have a local installation of Tessarect on
your local machine and or in your pipeline (more information about installing Tesseract on your local system can be
found [here](https://tesseract-ocr.github.io/tessdoc/Installation.html)). You can find the execution time of the same
script using a local installation of Tesseract below.

<details>
<summary>Click to expand and see the local Tesseract execution logs.</summary>

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
</details>

## FAQ
### Can I use the commands from this service with the default WebdriverIO Mobile commands/selectors?
Yes, you can combine the commands to make your script even more powerful! The advice is to use the default WebdriverIO
mobile commands/selectors as much as possible. You can inspect your app with
[Appium Desktop](https://github.com/appium/appium-desktop), but when you can find a unique selector, or your selector
will become to brittle then the commands from this service can definitely help you.

### Can I fully automate my app with the ocr commands provided by this service?
I've never done it, but in theory it should be possible. Please let me know if you succeed with that ☺️.

## TODO:
- [ ] provide language as an option, now English is the default
- [ ] create contribution docs
- [ ] provide the option to OCR in *restricted* areas
- [ ] Build GitHub pages with a sample and instructions (?)
