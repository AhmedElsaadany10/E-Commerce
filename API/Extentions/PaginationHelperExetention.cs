using API.Helpers;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Exetentions
{
    public static class PaginationHelperExtention
    {
        public static async Task<PagedResult<T>> CreatePagedResult<T>( 
            IQueryable<T> source, PaginationParams _params)
        {
            // Apply filtering
            if (_params.BrandId.HasValue)
                source = source.Where(p => EF.Property<int>(p, "BrandId") == _params.BrandId);

            if (_params.CategoryId.HasValue)
                source = source.Where(p => EF.Property<int>(p, "CategoryId") == _params.CategoryId);

            // Apply sorting
            if (!string.IsNullOrEmpty(_params.SortBy))
            {
                var sortType = _params.SortType?.ToLower() == "desc" ? false : true;
                source = _params.SortBy.ToLower() switch
                {
                    "name" => sortType ?
                    source.OrderBy(p => EF.Property<object>(p, "Name")) :
                    source.OrderByDescending(p => EF.Property<object>(p, "Name")),
                    "price" => sortType ? 
                    source.OrderBy(p => EF.Property<object>(p, "Price")) : 
                    source.OrderByDescending(p => EF.Property<object>(p, "Price")),
                    _ => source
                };

            }

            // Apply pagination
            var totalCount=await source.CountAsync();
            var items=await source.Skip((_params.PageNumber -1)* _params.PageSize).Take(_params.PageSize)
                .ToListAsync();

            return new PagedResult<T>
            {
                Items = items,
                TotalCount = totalCount,
                PageNumber = _params.PageNumber,
                PageSize = _params.PageSize,
            };
        }
    }
}
