using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext // represents a session with the database
    {
        public DataContext(DbContextOptions options) : base(options)  // Can use quick fix to generate this 
        {
        }

        public DbSet<Activity> Activities { get; set; } // represents the Actiities table in the db
    }
}
