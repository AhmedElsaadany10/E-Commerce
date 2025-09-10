using Core.Entities;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
        IQueryable<Product> GetAllAsync();
        Task<Product> GetByIdAsync(int id);
    }
}
