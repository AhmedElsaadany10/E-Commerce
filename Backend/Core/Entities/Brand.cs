using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Entities
{
    public class Brand : BaseEntity, IHasProducts
    {
        public ICollection<Product> Products { get; set; } = new List<Product>();

        [NotMapped]
        public int ProductsCount { get; set; }
    }

}
