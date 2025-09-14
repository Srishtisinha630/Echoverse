using EchoVerse.API.Context;
using EchoVerse.API.DTOs;
using EchoVerse.API.Models;
using EchoVerse.API.Repository;
using EchoVerse_API.DTO.Music;
using Microsoft.EntityFrameworkCore;

namespace EchoVerse.Services
{
    public class MusicService : IMusicService
    {
        private readonly AppDbContext _context;
        private readonly IMusicRepository _musicRepository;

        public MusicService(AppDbContext context, IMusicRepository musicRepository)
        {
            _context = context;
            _musicRepository = musicRepository;
        }

        // CREATE: with category handling
        public async Task<Music> CreateMusicAsync(CreateMusicDto dto)
        {
            int? categoryId = null;
            var categoryName = (dto.Category ?? string.Empty).Trim();

            if (!string.IsNullOrWhiteSpace(categoryName))
            {
                var category = await _context.Categories
                    .FirstOrDefaultAsync(c => c.CategoryName == categoryName);

                if (category == null)
                {
                    category = new Category { CategoryName = categoryName };
                    _context.Categories.Add(category);
                    await _context.SaveChangesAsync();
                }

                categoryId = category.CategoryId;
            }

            var music = new Music
            {
                Title = dto.Title,
                Artist = dto.Artist,
                Album = dto.Album,
                ReleaseYear = dto.ReleaseYear,
                CategoryId = categoryId
            };

            _context.Music.Add(music);
            await _context.SaveChangesAsync();

            // Reload with category
            await _context.Entry(music).Reference(m => m.Category).LoadAsync();

            return music;
        }

        public async Task<Music> GetMusicByIdAsync(int id)
        {
            return await _context.Music
                .Include(m => m.Category)
                .FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<List<MusicDto>> GetAllMusicAsync()
        {
            return await _context.Music
                .Include(m => m.Category)
                .Select(m => new MusicDto
                {
                    Id = m.Id,
                    Title = m.Title,
                    Artist = m.Artist,
                    Album = m.Album,
                    ReleaseYear = m.ReleaseYear,
                    CategoryId = m.CategoryId,
                    CategoryName = m.Category != null ? m.Category.CategoryName : null
                })
                .ToListAsync();
        }

        public async Task<bool> DeleteMusicAsync(int id)
        {
            var music = await _context.Music.FindAsync(id);
            if (music == null) return false;

            _context.Music.Remove(music);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Music> UpdateMusicAsync(int id, UpdateMusicDto musicDto)
        {
            var music = await _context.Music.FindAsync(id);
            if (music == null) return null;

            music.Title = musicDto.Title;
            music.Artist = musicDto.Artist;
            music.Album = musicDto.Album;
            music.ReleaseYear = musicDto.ReleaseYear;

            await _context.SaveChangesAsync();
            return music;
        }

        public async Task<IEnumerable<MusicDto>> SearchMusicAsync(
            string? title, string? artist, string? album, string? category)
        {
            var query = _context.Music
                .Include(m => m.Category)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(title))
                query = query.Where(m => m.Title.Contains(title));

            if (!string.IsNullOrWhiteSpace(artist))
                query = query.Where(m => m.Artist.Contains(artist));

            if (!string.IsNullOrWhiteSpace(album))
                query = query.Where(m => m.Album != null && m.Album.Contains(album));

            if (!string.IsNullOrWhiteSpace(category))
                query = query.Where(m => m.Category != null &&
                                         m.Category.CategoryName.Contains(category));

            return await query
                .Select(m => new MusicDto
                {
                    Id = m.Id,
                    Title = m.Title,
                    Artist = m.Artist,
                    Album = m.Album,
                    ReleaseYear = m.ReleaseYear,
                    CategoryId = m.CategoryId,
                    CategoryName = m.Category != null ? m.Category.CategoryName : null
                })
                .ToListAsync();
        }
    }
}
