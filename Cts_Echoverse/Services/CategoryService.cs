using EchoVerse.API.Context;
using EchoVerse.API.Models;
using EchoVerse.API.Repository;
using EchoVerse_API.DTO.Category;
using EchoVerse_API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace EchoVerse.API.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly AppDbContext _ctx;
        private readonly AppDbContext _context;
        public CategoryService(AppDbContext context, ICategoryRepository categoryRepository)
        {
            _ctx = context;
            _categoryRepository = categoryRepository;
            _context = context;
        }

        //Depencency Injection
        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            return await _categoryRepository.GetAllCategoriesAsync();
        }

        public async Task<Category> GetCategoryByIdAsync(int id)
        {
            return await _categoryRepository.GetCategoryByIdAsync(id);
        }

        public async Task<bool> AddCategoryAsync(Category category)
        {
            // Add business logic/validation here if needed
            await _categoryRepository.AddCategoryAsync(category);
            return true;
        }

        //For update of Category
        public async Task<bool> UpdateCategoryAsync(Category category)
        {

            await _categoryRepository.UpdateCategoryAsync(category);
            return true;
        }

        //Deletion of category
        public async Task<bool> DeleteCategoryAsync(int id)
        {


            await _categoryRepository.DeleteCategoryAsync(id);
            return true;
        }

        // In your CategoryController
       
        public async Task<IEnumerable<CategoryWithTitlesDto>> GetCategoriesWithMusicTitlesAsync()
        {
            return await _ctx.Categories
                .Select(c => new CategoryWithTitlesDto
                {
                    CategoryId = c.CategoryId,
                    CategoryName = c.CategoryName,
                    // NOTE: Your navigation property is named "Music" in your model.
                    // If it's "Musics" in your codebase, change c.Music to c.Musics.
                    MusicTitles = c.Music.Select(m => m.Title).ToList()
                })
                .ToListAsync();
        }
        public async Task<IEnumerable<MusicCategoryDto>> SearchCategoriesByNameAsync(string name)
        {
            return await _ctx.Categories
                .Where(c => c.CategoryName.Contains(name))
                .Select(c => new MusicCategoryDto
                {
                    CategoryId = c.CategoryId,
                    CategoryName = c.CategoryName
                })
                .ToListAsync();
        }

        

        public Task SearchCategories(string name)
        {
            throw new NotImplementedException();
        }
    }
}