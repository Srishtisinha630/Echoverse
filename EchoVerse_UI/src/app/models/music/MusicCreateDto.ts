export interface MusicCreateDto {
  title: string;
  artist: string;
  album: string | null;
  releaseYear: number | null;
  category: string;              // <-- string, required
}
