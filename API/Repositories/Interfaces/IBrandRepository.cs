using API.Models;

namespace API.Repositories.Interfaces
{
    public interface IBrandRepository
    {
        public Task<List<Brand>> GetAllAsync();
        public Task<Brand> GetByIdAsync(int id);


    }
}
