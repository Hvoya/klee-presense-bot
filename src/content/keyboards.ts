import { Markup } from "telegraf";
import { texts } from "./texts";

export const mainMenu = Markup.keyboard([
  [texts.user.buttonCommonPresense],
  [texts.user.buttonSubmitPresense, texts.user.buttonDiscardPresense]
])
  .resize()
  .extra();