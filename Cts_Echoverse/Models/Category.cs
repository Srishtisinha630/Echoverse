using System.ComponentModel.DataAnnotations;
using EchoVerse.API.Models;

namespace EchoVerse.API.Models
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }

        [Required]
        [MaxLength(100)]
        public string CategoryName { get; set; }

        // Navigation property for the one-to-many relationship
        public ICollection<Music> Music { get; set; } = new List<Music>();
       
    }
}
