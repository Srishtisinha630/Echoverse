using EchoVerse.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;


namespace EchoVerse.API.Repository
{
    public interface IMusicRepository
    {
        Task<IEnumerable<Music>> GetAllMusicAsync();
        Task<Music> GetMusicByIdAsync(int id);
        Task AddMusicAsync(Music music);
        Task UpdateMusicAsync(Music music);
        Task DeleteMusicAsync(int id);
        Task<IEnumerable<Music>> SearchMusicAsync(string query);
        Task<IEnumerable<Music>> GetAllAsync();

    }
}

