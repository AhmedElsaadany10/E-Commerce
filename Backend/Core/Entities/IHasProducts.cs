using Core.Entities;

public interface IHasProducts
{
    ICollection<Product> Products { get; set; }
}
