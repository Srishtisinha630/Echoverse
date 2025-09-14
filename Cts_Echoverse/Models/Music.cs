using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EchoVerse.API.Models
{
    public class Music
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string Title { get; set; }

        [Required]
        [StringLength(255)]
        public string Artist { get; set; }

        [StringLength(255)]
        public string Album { get; set; }

        public int? ReleaseYear { get; set; }

        public int? DurationInSeconds { get; set; }

        public string? FilePath { get; set; }

        
        public int? CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }
    }
}
