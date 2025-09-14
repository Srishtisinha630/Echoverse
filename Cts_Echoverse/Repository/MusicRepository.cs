using EchoVerse.API.Context;
using EchoVerse.API.Models;
using EchoVerse.API.Repository;
using Microsoft.EntityFrameworkCore;

namespace EchoVerse_API.Repository
{
    public class MusicRepository : IMusicRepository
    {
        private readonly AppDbContext _context;

        public MusicRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Music>> GetAllMusicAsync()
        {

            return await _context.Music.Include(m => m.Category).ToListAsync();
        }

        public async Task<Music> GetMusicByIdAsync(int id)
        {
            return await _context.Music.Include(m => m.Category).FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task AddMusicAsync(Music music)
        {
            await _context.Music.AddAsync(music);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateMusicAsync(Music music)
        {
            _context.Entry(music).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteMusicAsync(int id)
        {
            var music = await _context.Music.FindAsync(id);
            if (music != null)
            {
                _context.Music.Remove(music);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Music>> SearchMusicAsync(string query)
        {

            var music = _context.Music.Include(m => m.Category).AsQueryable();
            if (!string.IsNullOrEmpty(query))
            {
                music = music.Where(m =>
                    m.Title.Contains(query) ||
                    m.Artist.Contains(query) ||
                    (m.Album != null && m.Album.Contains(query)) ||
                    (m.Category != null && m.Category.CategoryName.Contains(query))
                );
            }
            return await music.ToListAsync();
        }
        public async Task<IEnumerable<Music>> GetAllAsync()
        {
            return await _context.Music.ToListAsync();
        }

    }
}
