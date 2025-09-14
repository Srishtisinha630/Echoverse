using Microsoft.AspNetCore.Mvc;
using EchoVerse.Services;
using EchoVerse_API.DTO.Music;
using EchoVerse.API.DTOs;

[ApiController]
[Route("api/music")]
public class EchoVerseController : ControllerBase
{
    private readonly IMusicService _musicService;

    public EchoVerseController(IMusicService musicService)
    {
        _musicService = musicService;
    }

    [HttpPost("create")]
    public async Task<IActionResult> CreateMusic([FromBody] CreateMusicDto musicDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var createdMusic = await _musicService.CreateMusicAsync(musicDto);

        var dto = new MusicDto
        {
            Id = createdMusic.Id,
            Title = createdMusic.Title,
            Artist = createdMusic.Artist,
            Album = createdMusic.Album,
            ReleaseYear = createdMusic.ReleaseYear,
            CategoryId = createdMusic.CategoryId,
            CategoryName = createdMusic.Category?.CategoryName
        };

        return CreatedAtAction(nameof(GetMusicById), new { id = dto.Id }, dto);
    }

    [HttpGet("get/{id:int}")]
    public async Task<IActionResult> GetMusicById(int id)
    {
        var music = await _musicService.GetMusicByIdAsync(id);
        if (music == null)
            return NotFound();

        var dto = new MusicDto
        {
            Id = music.Id,
            Title = music.Title,
            Artist = music.Artist,
            Album = music.Album,
            ReleaseYear = music.ReleaseYear,
            CategoryId = music.CategoryId,
            CategoryName = music.Category?.CategoryName
        };

        return Ok(dto);
    }

    [HttpDelete("delete-music/{id:int}")]
    public async Task<IActionResult> DeleteMusic(int id)
    {
        var result = await _musicService.DeleteMusicAsync(id);

        if (!result)
            return NotFound(new { Message = "Music not found or already deleted." });

        return Ok(new { Message = "Music deleted successfully." });
    }

    [HttpPut("update/{id:int}")]
    public async Task<IActionResult> UpdateMusic(int id, [FromBody] UpdateMusicDto musicDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var updatedMusic = await _musicService.UpdateMusicAsync(id, musicDto);
        if (updatedMusic == null)
            return NotFound(new { Message = "Music not found." });

        return Ok(updatedMusic);
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAllMusic()
    {
        var musicList = await _musicService.GetAllMusicAsync();
        return Ok(musicList);
    }

    [HttpGet("search")]
    public async Task<IActionResult> Search(
        [FromQuery] string? title,
        [FromQuery] string? artist,
        [FromQuery] string? album,
        [FromQuery] string? category)
    {
        var results = await _musicService.SearchMusicAsync(title, artist, album, category);
        return Ok(results);
    }
}
