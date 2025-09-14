// src/app/models/music/MusicUpdateDto.ts
export interface MusicUpdateDto {
  title: string;
  artist: string;
  album: string | null;
  releaseYear: number | null | undefined; // allow undefined
  category?: string | null;
}
