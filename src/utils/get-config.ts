export function getConfig(key: string) {
  key = key.toLocaleLowerCase()
  const config = JSON.parse(process.env.BOT || "{}")
  return config[key] || ""
}