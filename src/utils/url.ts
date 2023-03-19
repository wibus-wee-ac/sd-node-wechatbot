import { getConfig } from "./get-config";

export function url(path: string) {
  return `${getConfig("API")}${path}`;
}
