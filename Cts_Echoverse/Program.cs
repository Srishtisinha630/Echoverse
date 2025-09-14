using EchoVerse.API.Context;
using EchoVerse.API.Repository;
using EchoVerse.API.Services;
using EchoVerse.Services;
using Echoverse_API.AppExtensions;
using EchoVerse_API.Repository;
using EchoVerse_API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization;


namespace EchoVerse.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var runtimeCs = builder.Configuration.GetConnectionString("DefaultConnection");
            Console.WriteLine($"[RUNTIME] DefaultConnection = {runtimeCs}");


            // Add services to the container
            builder.Services.AddControllers();
           
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Database connection
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Configure Identity
            // The previous code had a duplicate AddIdentity call here which caused the 'Scheme already exists' error.
            builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
            {
                options.SignIn.RequireConfirmedAccount = false;
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequiredLength = 6;
            })
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();

            // Configure CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ProductPolicy",
                    corsBuilder => corsBuilder.WithOrigins("http://localhost:4200") // Replace with your Angular app URL
                                             .AllowAnyHeader()
                                             .AllowAnyMethod()
                                             .AllowCredentials()); // If you're sending credentials/cookies
            });

            // JWT Authentication
            var jwtSettings = builder.Configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings["Secret"];

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidAudience = jwtSettings["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
                };
            });

            builder.Services.AddAuthorization();
            // Removed redundant builder.Services.AddControllers(), AddEndpointsApiExplorer(), and AddSwaggerGen() calls.
            // These were already added at the top.

            // Dependency Injection
            builder.Services.AddScoped<IMusicService, MusicService>();
            builder.Services.AddScoped<ICategoryService, CategoryService>();

            builder.Services.AddScoped<IMusicRepository, MusicRepository>();
            builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();

            var app = builder.Build();

            // Middleware pipeline
            var logger = app.Services.GetRequiredService<ILogger<Program>>();
            app.UseProductExceptionHandler(logger);

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseRouting();
            // app.UseHttpsRedirection(); // optional
            app.UseCors("ProductPolicy");
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}