using EchoVerse.API.Models; // Required for Category model
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace EchoVerse.API.Context
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {
        }

        // Add DbSets
        public DbSet<Music> Music { get; set; }
        public DbSet<Category> Categories { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model if needed.
            builder.Entity<Category>()
        .HasIndex(c => c.CategoryName)
        .IsUnique();
        }
    }
}
