namespace API.Helpers
{
    public class PaginationParams
    {
        //Pagination parameters
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;

        private int _pageSize = 10;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        //Filtering parameters
        public int? BrandId { get; set; }
        public int? CategoryId { get; set; }

        //Sorting parameters
        public string? SortBy { get; set; } // name or price
        public string? SortType { get; set; } // asc or desc

    }
}
