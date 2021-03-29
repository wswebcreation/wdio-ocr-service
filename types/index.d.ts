import { OcrGetElementPositionByText } from "../src/commands/ocrGetElementPositionByText";
import {
  ClickOnTextOptions,
  ElementPositionByText,
  GetTextOptions,
  OcrServiceConfig,
  SetValueOptions,
  WaitForTextDisplayedOptions,
} from "../src/types/types";

declare global {
  namespace WebdriverIO {
    interface Browser {
      ocrClickOnText(
        selector: string,
        options: ClickOnTextOptions = {}
      ): Promise<void>;

      ocrGetElementPositionByText(
        selector: string,
        options: ElementPositionByText = {}
      ): Promise<OcrGetElementPositionByText>;

      ocrGetText(
        options?: GetTextOptions = {}
      ): Promise<string>;

      ocrSetValue(
        selector: string,
        value: string,
        options: SetValueOptions = {}
      ): Promise<void>;

      ocrWaitForTextDisplayed(
        selector: string,
        options: WaitForTextDisplayedOptions = {}
      ): Promise<void>;
    }

    interface ServiceOption extends OcrServiceConfig {}
  }
}
