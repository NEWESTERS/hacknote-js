/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "csstype" {
  interface Properties {
    /**
     * CSS Custom Properties
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
     */
    [index: `--${string}`]: any;
  }
}
