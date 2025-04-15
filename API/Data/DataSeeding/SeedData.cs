using API.Models;
using System.Text.Json;

namespace API.Data.DataSeeding
{
    public class SeedData
    {
        public static async Task SeedAsync(AppDbContext context)
        {

            if (!context.Brands.Any())
            {
                var brandsData = await File.ReadAllTextAsync("Data/DataSeeding/brands.json");
                var brands = JsonSerializer.Deserialize<List<Brand>>(brandsData);
                foreach (var item in brands)
                {
                    context.Brands.Add(item);
                }
                await context.SaveChangesAsync();
            }
            if (!context.Categories.Any())
            {
                var categoriesData = await File.ReadAllTextAsync("Data/DataSeeding/categories.json");
                var categories = JsonSerializer.Deserialize<List<Category>>(categoriesData);
                foreach (var item in categories)
                {
                    context.Categories.Add(item);
                }
                await context.SaveChangesAsync();
            }
            if (!context.Products.Any())
            {
                var productsData = await File.ReadAllTextAsync("Data/DataSeeding/products.json");
                var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                foreach (var item in products)
                {
                    context.Products.Add(item);
                }
                await context.SaveChangesAsync();
            }
            if (!context.ProductImages.Any())
            {
                var imagesData = await File.ReadAllTextAsync("Data/DataSeeding/productImages.json");
                var images = JsonSerializer.Deserialize<List<ProductImage>>(imagesData);
                foreach (var item in images)
                {
                    context.ProductImages.Add(item);
                }
                await context.SaveChangesAsync();
            }

        }

    }
}
