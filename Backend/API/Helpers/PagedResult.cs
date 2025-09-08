namespace API.Helpers
{
    public class PagedResult<T>
    {
        public List<T>  Items { get; set; }  //products showed in page
        public int TotalCount { get; set; } //total count of products
        public int PageNumber { get; set; }   //current page
        public int PageSize { get; set; } //number of products per page

    }
}
