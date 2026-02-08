namespace Core.Entities
{
    public class Product:BaseEntity
    {
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int CountInStock { get; set; }
        public ICollection<ProductImage> ProductImages { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
        public Brand Brand { get; set; }
        public int BrandId { get; set; }
    }
}
