import { Contact, log, Message, ScanStatus, WechatyBuilder } from "wechaty";
import qrcodeTerminal from "qrcode-terminal";
import { parseCommand } from "./utils/parse-commands";
import { setup } from "./utils/setup";
import { FUNCTIONS } from "./constants/functions";
import chalk from "chalk";

log.warn = () => {
  /* empty */
};

function onScan(qrcode: string, status: ScanStatus) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    const qrcodeImageUrl = [
      "https://wechaty.js.org/qrcode/",
      encodeURIComponent(qrcode),
    ].join("");
    // log.info(
    //   "StarterBot",
    //   "onScan: %s(%s) - %s",
    //   ScanStatus[status],
    //   status,
    //   qrcodeImageUrl
    // );
    console.log(
      `${chalk.cyan(
        `[${ScanStatus[status]}(${status})]`
      )} Please scan QR Code in above url to login:`
    );
    console.log(qrcodeImageUrl);
    qrcodeTerminal.generate(qrcode, { small: true }); // show qrcode on console
  } else {
    console.log(`${chalk.cyan(`[${ScanStatus[status]}(${status})]`)}`);
  }
}

function onLogin(user: Contact) {
  // log.info("StarterBot", "%s login", user);
  console.log(`${chalk.green(`[Login]`)} 用户 ${user.name()} 已登录`);
}

function onLogout(user: Contact) {
  // log.info("StarterBot", "%s logout", user);
  console.log(`${chalk.red(`[Logout]`)} 用户 ${user.name()} 已登出`);
}

async function onMessage(msg: Message) {
  // log.info("StarterBot", msg.toString());

  if (msg.text() === "ding") {
    await msg.say("dong");
  }

  try {
    const command = parseCommand(msg.text());
    await FUNCTIONS[command.function_name as keyof typeof FUNCTIONS](
      command,
      msg
    );
  } catch {
    /* empty */
  }
  // await msg.say(says)
}

async function main() {
  setup();
  const bot = WechatyBuilder.build({
    name: "sd-node-wechatbot",
  });

  bot.on("scan", onScan);
  bot.on("login", onLogin);
  bot.on("logout", onLogout);
  bot.on("message", onMessage);

  bot.start()
  .then(() => console.log(`✅ SD-WeChatBot 已启动`)) 
  .catch((e: any) => log.error("StarterBot", e));
}

main().catch((err) => console.log(err));
