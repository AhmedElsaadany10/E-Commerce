namespace API.Helpers
{
    public class PaginationParams
    {
        //Pagination parameters
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;

        //Filtering parameters
        public int? BrandId { get; set; }
        public int? CategoryId { get; set; }

        //Sorting parameters
        public string? SortBy { get; set; } // name or price
        public string? SortType { get; set; } // asc or desc

    }
}
