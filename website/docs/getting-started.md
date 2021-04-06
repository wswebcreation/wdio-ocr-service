---
title: Getting Started
---

Welcome to the `wdio-ocr-service` documentation. It will help you to get started fast. If you run into problems, you
can find help and answers on my [wdio-ocr-service Gitter Channel](https://gitter.im/wswebcreation/wdio-ocr-service) or
you can hit me on [Twitter](https://twitter.com/wswebcreation).

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

:::note
This module uses Tesseract as an OCR engine. By default, it will verify if you have a local installation of
Tesseract installed on your system, if so, it will use that. If not, it will use the
[Node.js Tesseract.js](https://github.com/naptha/tesseract.js) module which is automatically installed for you.
:::

Instruction on how to install Tesseract on your local system can be found
[here](https://tesseract-ocr.github.io/tessdoc/Installation.html).

:::caution
For installation questions / errors with Tesseract please refer to the
[Tesseract](https://github.com/tesseract-ocr/tesseract) project.
:::


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
