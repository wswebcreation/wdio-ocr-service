export interface ScreenSize {
  width: number;
  height: number;
}

export interface Rectangles {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

export interface ClickPoint {
  x: number;
  y: number;
}

export interface DetermineClickPointOptions {
  rectangles: Rectangles;
}

export interface OcrServiceConfig {
  ocrImagesPath: string;
}

export interface WaitForTextDisplayedOptions {
  timeout?: number;
  timeoutMsg?: string;
}

export interface SetValueOptions {
  reuseOcr?: boolean;
}

export interface ClickOnTextOptions {
  reuseOcr?: boolean;
}

export interface GetTextOptions {
  reuseOcr?: boolean;
}

export interface ElementPositionByText {
  reuseOcr?: boolean;
}

export interface Line {
  text: string;
  bbox: Rectangles;
}

export interface Words {
  text: string;
  bbox: Rectangles;
  wc: number;
}

export interface GetOcrData {
  text: string;
  lines: Line[];
  words: Words[];
}
