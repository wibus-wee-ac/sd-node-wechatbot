import { generateAiImages } from "../functions/generateAImages";
import { getLoRAs } from "../functions/getLoRAs";

export const FUNCTIONS = {
  "ai": generateAiImages,
  "loras": getLoRAs,
}