using EchoVerse.API.Models;
using EchoVerse_API.DTO.Category;


namespace EchoVerse_API.Services
{
    public interface ICategoryService
    {

        Task<IEnumerable<Category>> GetAllCategoriesAsync();
        Task<Category> GetCategoryByIdAsync(int id);
        Task<bool> AddCategoryAsync(Category category);
        Task<bool> UpdateCategoryAsync(Category category);
        Task<bool> DeleteCategoryAsync(int id);
        Task<IEnumerable<CategoryWithTitlesDto>> GetCategoriesWithMusicTitlesAsync();
        //Task SearchCategoriesByNameAsync(string name);
        Task SearchCategories(string name);
         Task<IEnumerable<MusicCategoryDto>> SearchCategoriesByNameAsync(string name);
    }
}
