using Core.Entities;

namespace Core.Interfaces
{
    public interface IBrandRepository
    {
        public Task<List<Brand>> GetAllAsync();
        public Task<Brand> GetByIdAsync(int id);


    }
}
