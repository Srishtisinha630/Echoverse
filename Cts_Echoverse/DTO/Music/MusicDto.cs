namespace EchoVerse.API.DTOs
{
    public class MusicDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = default!;
        public string Artist { get; set; } = default!;
        public string? Album { get; set; }
        public int? ReleaseYear { get; set; }

        public int? CategoryId { get; set; }         // make nullable
        public string? CategoryName { get; set; }    // allow null when no category
    }

    public class CategoryWithMusicDto
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; }
        public List<MusicDto> Music { get; set; }
    }
}
