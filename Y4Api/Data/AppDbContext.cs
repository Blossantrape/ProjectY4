using Microsoft.EntityFrameworkCore;
using Y4Api.Model;

namespace Y4Api.Data;

public class AppDbContext:DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
    {
        
    }
    
    public DbSet<Student> Students { get; set; }
}