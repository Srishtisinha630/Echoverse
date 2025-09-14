using System.ComponentModel.DataAnnotations;

namespace EchoVerse_API.DTO.Category
{
    public class MusicCategoryDto
    {
        public int CategoryId { get; set; }

        [Required]
        public string CategoryName { get; set; }
    }
}
