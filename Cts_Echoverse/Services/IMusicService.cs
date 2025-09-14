using EchoVerse.API.DTOs;
using EchoVerse.API.Models;
using EchoVerse_API.DTO.Music;





namespace EchoVerse.Services
{
    public interface IMusicService
    {
        Task<Music> CreateMusicAsync(CreateMusicDto dto);
        Task<Music> GetMusicByIdAsync(int id);
        Task<List<MusicDto>> GetAllMusicAsync();

        Task<bool> DeleteMusicAsync(int id);
        Task<Music> UpdateMusicAsync(int id, UpdateMusicDto musicDto);

        //Task<IEnumerable<Music>> SearchMusicAsync(MusicSearchRequest request);
        Task<IEnumerable<MusicDto>> SearchMusicAsync(string? title, string? artist, string? album, string? category);



    }
}