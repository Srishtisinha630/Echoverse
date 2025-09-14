using System.ComponentModel.DataAnnotations;

namespace EchoVerse_API.DTO.Music
{
    public class UpdateMusicDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Artist { get; set; }

        public string Album { get; set; }

        public int? ReleaseYear { get; set; }
    }
}
