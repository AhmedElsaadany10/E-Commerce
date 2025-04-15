using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Product>().HasOne(p => p.Category).WithMany()
                .HasForeignKey(p=>p.CategoryId);
            modelBuilder.Entity<Product>().HasOne(p => p.Brand).WithMany()
                .HasForeignKey(p => p.BrandId);
            modelBuilder.Entity<ProductImage>()
           .HasOne(pi => pi.Product)
           .WithMany(p => p.ProductImages)
           .HasForeignKey(pi => pi.ProductId)
            .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
