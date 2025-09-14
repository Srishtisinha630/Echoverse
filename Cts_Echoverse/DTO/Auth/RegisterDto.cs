using System.ComponentModel.DataAnnotations;

namespace EchoVerse_API.DTO.Auth
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;
    }
}