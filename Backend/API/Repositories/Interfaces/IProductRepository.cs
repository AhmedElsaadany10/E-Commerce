using Core.Entities;

namespace API.Repositories.Interfaces
{
    public interface IProductRepository
    {
        IQueryable<Product> GetAllAsync();
        Task<Product> GetByIdAsync(int id);
    }
}
