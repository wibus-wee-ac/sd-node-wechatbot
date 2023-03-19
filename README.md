# sd-node-wechatbot

sd-node-wechatbot 是一个用于微信中的机器人，旨在为Stable Diffusion（SD）绘图提供快捷的方法。你可以通过微信与此机器人进行交互，从而在微信聊天中使用 sd-node-wechatbot 创建有趣的图片。

## 功能

以下是 SD-WeChatBot 的主要功能：

- 🌟 `/ai` 画图

```
/ai <prompt> --negative=<negative_prompt> --cfg=<cfg_scale> --steps=<steps> --count=<count> --size<width,height>
```

- `/loras` 获取可用 LoRAs

下面是暂时不可用的功能：

- 接口用户鉴权
- 命令 `/checkpoint` 切换 checkpoint
- `/set` 设置 API 接口
- `/help` 获取帮助文档

## 配置和使用

请按照以下步骤安装和使用SD-WeChatBot。

### 前置条件

- 首先，您需要一个已实名的微信账号，用于与机器人进行交互。
- 其次，您需要有一个已启动 api 模式的 Stable Diffusion

### 配置

1. 创建一个 `config.json`
2. 输入你的 Stable Diffusion 实例地址到 api 字段，例如 `http://localhost:8080`

```json
{ "api": "http://localhost:8080" }
```

## Author

SD-WeChatBot © Wibus, Released under AGPLv3. Created on Mar 19, 2023

> [Personal Website](http://iucky.cn/) · [Blog](https://blog.iucky.cn/) · GitHub [@wibus-wee](https://github.com/wibus-wee/) · Telegram [@wibus✪](https://t.me/wibus_wee)

## License

此项目 AGPLv3 授权开源，使用此项目进行的二次创作或者衍生项目也必须开源。

## Author

<PROJECT_NAME> © Wibus, Released under AGPLv3. Created on Mar 19, 2023

> [Personal Website](http://iucky.cn/) · [Blog](https://blog.iucky.cn/) · GitHub [@wibus-wee](https://github.com/wibus-wee/) · Telegram [@wibus✪](https://t.me/wibus