using Core.Entities;

namespace Core.Interfaces
{
    public interface ICategoryRepository
    {
        public Task<List<Category>> GetAllAsync();
        public Task<Category> GetByIdAsync(int id);


    }
}
