using API.Models;

namespace API.Repositories.Interfaces
{
    public interface ICategoryRepository
    {
        public Task<List<Category>> GetAllAsync();
        public Task<Category> GetByIdAsync(int id);


    }
}
