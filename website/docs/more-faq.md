---
title: Frequently asked questions
---

## My tests are very slow
When you are using this `wdio-ocr-service` you are not using it to speed up your tests, you use it because you have a
hard time locating elements in your mobile app, and you want an easier way to locate them. And we all hopefully know
that when you want something, you *loose* something else. **But....**, there is a way to make the `wdio-ocr-service`
execute faster than normal. More information about that can be found [here](./more-test-optimization).

## Can I use the commands from this service with the default WebdriverIO Mobile commands/selectors?
Yes, you can combine the commands to make your script even more powerful! The advice is to use the default WebdriverIO
mobile commands/selectors as much as possible. You can inspect your app with
[Appium Desktop](https://github.com/appium/appium-desktop), but when you can find a unique selector, or your selector
will become to brittle then the commands from this service can definitely help you.

## Can I fully automate my app with the ocr commands provided by this service?
I've never done it, but in theory it should be possible. Please let me know if you succeed with that ☺️.

## Is there an easy way to see which text is found on my screen without running a test?
No, there is currently not an API or something else to easily scan an image and return the data that is found. I have
this on the roadmap, but any help is appreciated ☺️.
