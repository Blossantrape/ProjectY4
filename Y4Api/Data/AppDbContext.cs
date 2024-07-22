using Microsoft.EntityFrameworkCore;
using Y4Api.Model;

namespace Y4Api.Data;

public class AppDbContext:DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
    {
        
    }
    
    public DbSet<Student> Students { get; set; }
    
    /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = "Host=localhost;Port=5432;Database=y4_database;Username=y4;Password=y4";
        optionsBuilder.UseNpgsql(connectionString);
    }*/
}