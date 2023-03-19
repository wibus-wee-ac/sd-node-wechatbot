import { AnyObject } from "./anyObject";

export interface ITxt2Img {
  // enable_hr: boolean;
  // denoising_strength: number;
  // firstphase_width: number;
  // firstphase_height: number;
  // hr_scale: number;
  // hr_upscaler: string;
  // hr_second_pass_steps: number;
  // hr_resize_x: number;
  // hr_resize_y: number;

  prompt?: string;
  negative_prompt?: string;
  steps?: number;
  cfg_scale?: number;
  width?: number;
  height?: number;
  restore_faces?: boolean;
  sampler_name?: string;

  // styles: Array<string>;
  // seed: number | -1;
  // subseed: number | -1;
  // subseed_strength: number;
  // seed_resize_from_h: number | -1;
  // seed_resize_from_w: number | -1;
  // batch_size: number;
  // n_iter: number;
  // tiling: boolean;
  // eta: number;
  // s_churn: number;
  // s_tmax: number;
  // s_tmin: number;
  // s_noise: 1;
  // override_settings: object;
  // override_settings_restore_afterwards: true;
  // script_args: Array<any>;
  // script_name: string;
}
export interface ITxt2ImgSuccess {
  images: Array<string>
  parameters: AnyObject
  info: string
}

export interface ITxt2ImgError {
  detail: [
    {
      loc: Array<string | 0>,
      msg: string,
      type: string
    }
  ]
}