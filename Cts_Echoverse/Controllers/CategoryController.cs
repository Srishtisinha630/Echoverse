using Microsoft.AspNetCore.Mvc;
using EchoVerse.API.Models;
using EchoVerse_API.Services;
using EchoVerse_API.DTO.Category;

[ApiController]
[Route("api/categories")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoryController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    // GET: api/categories/all
    [HttpGet("all")]
    public async Task<IActionResult> GetAllCategories()
    {
        var categories = await _categoryService.GetAllCategoriesAsync();
        return Ok(categories);
    }

    // GET: api/categories/search?name=xxx
    [HttpGet("search")]
    public async Task<IActionResult> SearchCategories([FromQuery] string name)
    {
        if (string.IsNullOrWhiteSpace(name))
            return BadRequest("Search term is required");

        var categories = await _categoryService.SearchCategoriesByNameAsync(name);
        return Ok(categories);
    }

    // GET: api/categories/with-music-titles
    [HttpGet("with-music-titles")]
    public async Task<IActionResult> GetCategoriesWithMusicTitles()
    {
        var data = await _categoryService.GetCategoriesWithMusicTitlesAsync();
        return Ok(data);
    }

    // GET: api/categories/{id}
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetCategoryById(int id)
    {
        var category = await _categoryService.GetCategoryByIdAsync(id);
        if (category == null)
            return NotFound();
        return Ok(category);
    }

    // POST: api/categories/create
    [HttpPost("create")]
    public async Task<IActionResult> AddCategory([FromBody] MusicCategoryDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var category = new Category
        {
            CategoryName = dto.CategoryName
        };

        var added = await _categoryService.AddCategoryAsync(category);

        if (!added)
            return BadRequest("Category could not be created.");

        return CreatedAtAction(nameof(GetCategoryById), new { id = category.CategoryId }, category);
    }

    // PUT: api/categories/{id}
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateCategory(int id, [FromBody] MusicCategoryDto dto)
    {
        if (!ModelState.IsValid || id != dto.CategoryId)
            return BadRequest();

        var category = new Category
        {
            CategoryId = dto.CategoryId,
            CategoryName = dto.CategoryName
        };

        var result = await _categoryService.UpdateCategoryAsync(category);
        if (!result)
            return NotFound();

        return Ok(result);
    }

    // DELETE: api/categories/{id}
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var result = await _categoryService.DeleteCategoryAsync(id);
        if (!result)
            return NotFound();

        return Ok(result);
    }
}
