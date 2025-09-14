using EchoVerse.API.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var basePath = Directory.GetCurrentDirectory();

        var config = new ConfigurationBuilder()
            .SetBasePath(basePath)
            .AddJsonFile("appsettings.Development.json", optional: true)
            .AddJsonFile("appsettings.json", optional: false)
            .AddEnvironmentVariables()
            .Build();

        var cs = config.GetConnectionString("DefaultConnection");
        Console.WriteLine($"[DESIGN-TIME] DefaultConnection = {cs}  (basePath: {basePath})");

        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlServer(cs)
            .Options;

        return new AppDbContext(options);
    }
}
