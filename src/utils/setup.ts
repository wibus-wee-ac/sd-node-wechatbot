import chalk from "chalk";
import { existsSync, readFileSync, watchFile, writeFileSync } from "fs";

export function setup() {
  if (!existsSync("config.json")) {
    writeFileSync("config.json", JSON.stringify({
      api: ""
    }, null, 2));
  }

  const config = readFileSync("config.json", "utf-8");
  process.env.BOT = config;

  watchFile("config.json", () => {
    console.log(`${chalk.blue("[CONFIG]")} 配置文件更新，正在同步...`);
    const config = readFileSync("config.json", "utf-8");
    process.env.BOT = config;
  });
}