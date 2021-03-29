# OCR Services

> **NOTE:** This module is still in development and is not officially released. You can only use it by installing OR the
> exact version, see below, or by providing `@next` as a version. Any feedback is welcome!

A WebdriverIO service that is using Tesseract OCR for Appium Native App tests.

[![NPM](https://nodei.co/npm/wdio-ocr-service.png)](https://nodei.co/npm/wdio-ocr-service/)

- [Background](#background)
  - [How does it work](#how-does-it-work)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Configuration Options](#configuration-options)
- [Commands](#commands)
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
  (rather than exactly). This means for example that the search value `Username` can also find the text `Usename` or
  visa versa.

It works with **ZERO** system dependencies (besides from what WebdriverIO uses) , but if needed it can also work with a
local installation from [Tesseract](https://tesseract-ocr.github.io/tessdoc/) which will reduce the execution time
drastically! (See also the [Test Execution Optimization](#test-execution-optimization) on how to speed up your tests.)

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
npm install wdio-ocr-service@next --save-dev
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
All information about the commands and their options can be found [here](./docs/COMMANDS.md)

## Test Execution Optimization
There are ways to optimize the test execution time. Please check [this](./docs/OPTIMIZATION.md) document for some tips
and tricks.

## FAQ
### Can I use the commands from this service with the default WebdriverIO Mobile commands/selectors?
Yes, you can combine the commands to make your script even more powerful! The advice is to use the default WebdriverIO
mobile commands/selectors as much as possible. You can inspect your app with
[Appium Desktop](https://github.com/appium/appium-desktop), but when you can find a unique selector, or your selector
will become to brittle then the commands from this service can definitely help you.

### Can I fully automate my app with the ocr commands provided by this service?
I've never done it, but in theory it should be possible. Please let me know if you succeed with that ☺️.

## TODO:
- [ ] Create Unit tests
- [ ] provide language as an option, now English is the default
- [ ] create contribution docs
- [x] provide the option to OCR in *restricted* areas
- [ ] Build GitHub pages with a sample and instructions (?)
