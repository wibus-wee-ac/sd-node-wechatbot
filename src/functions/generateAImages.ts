import { FileBox } from "file-box";
import { writeFileSync } from "fs";
import { ofetch } from "ofetch";
import { Message } from "wechaty";
import { SD_APIS } from "../constants/apis";
import { ITxt2Img, ITxt2ImgSuccess } from "../types/txt2img";
import { getConfig } from "../utils/get-config";
import { Command } from "../utils/parse-commands";
import { url } from "../utils/url";

export async function generateAiImages(command: Command, msg: Message) {
  let prompts = command.input;
  let { negative, size, networks, steps, count, cfg } = command.options;
  negative =
    negative ||
    "EasyNegative,paintings,sketches,(worst quality:2),(low quality:2),(normal quality:2),lowres,normal quality,((monochrome)),((grayscale)),skin spots,acnes,skin blemishes,age spot,glans,extra fingers,fewer fingers";
  size = size || "512,512";
  steps = steps || "31";
  count = count || "1";
  cfg = cfg || "7";

  /* prettier-ignore */
  await msg.say(`🪅 正在生成图片...
正向提示词: ${prompts.substring(0, 20)}...
负向提示词: ${negative.substring(0, 20)}...
图片大小: ${size}
步数: ${steps}
图片数量: ${count}
配置: ${cfg}`);

  if (networks) {
    const networksArr = networks.split(",");
    networks = networksArr
      .map((network) => {
        const [networkName, weight] = network.split(":");
        return `<lora:${networkName}:${weight}>`;
      })
      .join(",");
    prompts += `,${networks}`;
  }

  const body: ITxt2Img = {
    prompt: prompts,
    negative_prompt: negative,
    cfg_scale: Number(cfg),
    width: Number(size.split(",")[0]),
    height: Number(size.split(",")[1]),
    steps: Number(steps),
    restore_faces: false,
    sampler_name: "DPM++ SDE Karras",
  };

  const images: Array<string> = [];

  for (let i = 0; i < Number(count); i++) {
    await msg.say(`🪄 正在生成第 ${i + 1} 张图片...`);
    const _api = url(SD_APIS.Txt2Img);
    await ofetch<ITxt2ImgSuccess>(_api, {
      method: "POST",
      body: JSON.stringify(body),
    }).then((res) => {
      res.images.forEach((image) => {
        images.push(image);
        msg.say(FileBox.fromBase64(image, `image-${i}.png`));
      });
    });
  }

  // images.forEach(async (image) => {
  //   await msg.say(FileBox.fromBase64(image));
  // });

  if (getConfig("saveImages")) {
    for (let i = 0; i < images.length; i++) {
      const time = new Date().getTime();
      writeFileSync(`./images/${time}-${i}.png`, images[i], "base64");
    }
  }

  await msg.say(`🎉 图片生成完毕！`);
}
