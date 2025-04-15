using API.Models;

namespace API.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public string ImageUrl { get; set; }
        public List<string> ProductImages { get; set; }
        public string Category { get; set; }
        public string Brand { get; set; }
    }
}
