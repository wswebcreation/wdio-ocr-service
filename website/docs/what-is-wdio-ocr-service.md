---
title: What is wdio-ocr-service
slug: /
---

## Background
Sometimes it can be hard to find an element in a native app with the default
[WebdriverIO Mobile selectors](https://webdriver.io/docs/selectors#mobile-selectors). In that case it would be nice if
you would be able to use something like OCR
([Optical Character Recognition](https://en.wikipedia.org/wiki/Optical_character_recognition)) to interact with elements
on your screen.

This service provides you **that** option to interact with elements on your mobile screen based on **visible text**. It
will provide [multiple commands](./ocr-click-on-text) to:

- wait
- search
- and interact

with an element, all based on text.

### How does it work
This service will

1. create a screenshot of your screen
1. optimize the result for OCR by turning the screenshot into a black/white with a high contrast screenshot (the high
   contrast is needed to prevent a lot of image background noise).
1. uses [Optical Character Recognition](https://en.wikipedia.org/wiki/Optical_character_recognition) from
   [Tesseract](https://github.com/tesseract-ocr/tesseract) to get all text from the screen and highlight all found text
   on an image. Can support several languages, all supported languages can be found [here.](https://tesseract-ocr.github.io/tessdoc/Data-Files-in-different-versions.html)
1. uses Fuzzy Logic from [Fuse.js](https://fusejs.io/) to find strings that are *approximately equal* to a given pattern
   (rather than exactly). This means for example that the search value `Username` can also find the text `Usename` or
   visa versa.

An example of step 1, 2 and 3 can be found in this image

![Process steps](../static/img/processing-steps.png)

It works with **ZERO** system dependencies (besides from what WebdriverIO uses), but if needed it can also work with a
local installation from [Tesseract](https://tesseract-ocr.github.io/tessdoc/) which will reduce the execution time
drastically! (See also the [Test Execution Optimization](#test-execution-optimization) on how to speed up your tests.)

Enthusiastic? Start using it today by following the [installation](./getting-started) instructions below.

:::caution Important
There are a variety of reasons you might not get good quality output from Tesseract. One of the biggest reasons that
could be related to your app and this module could be the fact that there is no proper color distinguish between the
text that needs to be found, and the background. For example, a white text on a dark background can *easily* be found,
but a light text on a white background or a dark text on a dark background can hardly be found.

See also [this page](https://tesseract-ocr.github.io/tessdoc/ImproveQuality) for more information from Tesseract.

Also don't forget to read the [FAQ](./more-faq).
:::
