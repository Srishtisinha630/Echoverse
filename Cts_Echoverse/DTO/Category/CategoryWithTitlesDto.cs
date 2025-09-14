namespace EchoVerse_API.DTO.Category
{
    public class CategoryWithTitlesDto
    {
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;
        public List<string> MusicTitles { get; set; } = new();
    }
}
