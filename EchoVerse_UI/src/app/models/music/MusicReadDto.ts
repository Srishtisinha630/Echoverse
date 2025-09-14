export interface MusicReadDto {
  id: number;
  title: string;
  artist: string;
  album?: string | null;
  releaseYear?: number | null;
  categoryId?: number | null;
  categoryName?: string | null;
}
