import expressiveCode, { ExpressiveCodeTheme } from "astro-expressive-code";

import { pluginFramesTexts } from "@expressive-code/plugin-frames";

// This is how you override the texts of an existing language:
pluginFramesTexts.overrideTexts("ru", {
  terminalWindowFallbackTitle: "Окно терминала",
  copyButtonTooltip: "Скопировать в буфер обмена",
  copyButtonCopied: "Скопировано!",
});

const colorTheme = ExpressiveCodeTheme.fromJSONString(
  fs.readFileSync(new URL(`../color-scheme.json`, import.meta.url), "utf-8")
);

export default expressiveCode({
  defaultLocale: "ru",
  themes: [colorTheme],
  styleOverrides: {
    borderWidth: "0px",
    borderRadius: "0px",
    codePaddingInline: "32px",
    frames: {
      shadowColor: "transparent",
    },
  },
});
