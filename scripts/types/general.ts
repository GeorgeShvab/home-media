export type SourceResponseStatus = "ok" | "fail";

export interface SourceApiResponse<T extends object> {
  status: SourceResponseStatus;
  status_message: string;
  data: T;
}

export interface SourceApiSource {
  url: string;
  hash: string;
  quality: string;
  type: string;
  is_repack: string;
  video_codec: string;
  bit_depth: string;
  audio_channels: string;
  seeds: number;
  peers: number;
  size: string;
  size_bytes: number;
  date_uploaded: string;
  date_uploaded_unix: number;
}

export interface SourceApiActor {
  name: string;
  character_name: string;
  url_small_image: string;
  imdb_code: string;
}
