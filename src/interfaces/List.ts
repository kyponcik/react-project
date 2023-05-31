export interface Quote {
  anime: string;
  character: string;
  quote: string;
}

interface Tag {
  tag_id: number;
  name: string;
  description: string;
  is_nsfw: boolean;
}

export interface Image {
  signature: string;
  extension: string;
  image_id: number;
  favorites: number;
  dominant_color: string;
  source: string;
  artist: {
    artist_id: number;
    name: string;
    patreon: null;
    pixiv: null;
    twitter: string;
    deviant_art: string;
  };
  uploaded_at: string;
  liked_at: string;
  is_nsfw: boolean;
  width: number;
  height: number;
  byte_size: number;
  url: string;
  preview_url: string;
  tags: Tag[];
}

export interface ImageData {
  images: Image[];
}
