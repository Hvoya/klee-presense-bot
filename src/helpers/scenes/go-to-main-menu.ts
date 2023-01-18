import { SceneContextMessageUpdate } from "telegraf/typings/stage";
import { mainMenu } from "../../content/keyboards";

export const goToMainMenu = async (ctx: SceneContextMessageUpdate, text: string) => {
    ctx.scene.leave();
    ctx.reply(text, mainMenu);
  };