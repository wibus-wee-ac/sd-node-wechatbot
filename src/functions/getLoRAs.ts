import { ofetch } from "ofetch";
import { Message } from "wechaty";
import { SD_APIS } from "../constants/apis";
import { Command } from "../utils/parse-commands";
import { url } from "../utils/url";

export async function getLoRAs(_command: Command, msg: Message) {
  const _api = url(SD_APIS.Config);
  const { components } = await ofetch(_api);
  let choices: Array<string> = [];
  for (const component of components) {
    if (component.props.elem_id === "setting_sd_lora") {
      choices = component.props.choices;
    }
  }

  const reply = `🖼️ LoRA 列表：\n${choices.join("\n")}`;

  await msg.say(reply);
}
