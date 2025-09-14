using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EchoVerse_API.DTO.Auth;

namespace EchoVerse.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EchoVerseAuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly ILogger<EchoVerseAuthController> _logger;

        // I have added ILogger for better error diagnostics.
        public EchoVerseAuthController(UserManager<IdentityUser> userManager, IConfiguration configuration, ILogger<EchoVerseAuthController> logger)
        {
            _userManager = userManager;
            _configuration = configuration;
            _logger = logger;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var userExists = await _userManager.FindByNameAsync(registerDto.Username);
            if (userExists != null)
            {
                return Conflict("User with this username already exists.");
            }

            var user = new IdentityUser
            {
                UserName = registerDto.Username,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);
                return BadRequest(string.Join(", ", errors));
            }

            return Ok(new { Message = "User created successfully!" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(loginDto.Username);
                if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                {
                    return Unauthorized(new { Message = "Invalid credentials." });
                }
                // Build claims for JWT (can add roles/ids later)


                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };
                //  Read JWT settings from configuration


                var jwtSettings = _configuration.GetSection("JwtSettings");
                if (jwtSettings == null || string.IsNullOrEmpty(jwtSettings["Secret"]))
                {
                    // Log this critical error on the server side
                    _logger.LogError("JWT Secret key is not configured in appsettings.json.");
                    return StatusCode(500, "Server configuration error.");
                }
                // Create a symmetric signing key from the secret


                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Secret"]));

                // Safely parse the expiration time, with a fallback
                if (!double.TryParse(jwtSettings["ExpiresInMinutes"], out double expiresInMinutes))
                {
                    _logger.LogWarning("Invalid 'ExpiresInMinutes' value in appsettings.json. Defaulting to 60 minutes.");
                    expiresInMinutes = 60; // Default to 60 minutes if the setting is invalid
                }
                //  Create the token (issuer, audience, expiry, claims, signing creds)

                var token = new JwtSecurityToken(
                    issuer: jwtSettings["ValidIssuer"],
                    audience: jwtSettings["ValidAudience"],
                    expires: DateTime.UtcNow.AddMinutes(expiresInMinutes),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            catch (Exception ex)
            {
                // Log the exception for detailed debugging on the server-side
                _logger.LogError(ex, "An unhandled exception occurred during the login process.");
                return StatusCode(500, "An internal server error occurred.");
            }
        }
    }
}
