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

- create a screenshot of your screen
- uses [Optical Character Recognition](https://en.wikipedia.org/wiki/Optical_character_recognition) from
  [Tesseract](https://github.com/tesseract-ocr/tesseract) to get all text from the screen
- uses Fuzzy Logic from [Fuse.js](https://fusejs.io/) to find strings that are *approximately equal* to a given pattern
  (rather than exactly). This means for example that the search value `Username` can also find the text `Usename` or
  visa versa.

It works with **ZERO** system dependencies (besides from what WebdriverIO uses), but if needed it can also work with a
local installation from [Tesseract](https://tesseract-ocr.github.io/tessdoc/) which will reduce the execution time
drastically! (See also the [Test Execution Optimization](#test-execution-optimization) on how to speed up your tests.)

Enthusiastic? Start using it today by following the [installation](./getting-started) instructions below.
