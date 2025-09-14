import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MusicReadDto } from '../models/music/MusicReadDto';
import { MusicCreateDto } from '../models/music/MusicCreateDto';
import { MusicUpdateDto } from '../models/music/MusicUpdateDto';

const API_BASE_URL = 'http://localhost:5000/api/music'; // ← update port/scheme if needed

@Injectable({ providedIn: 'root' })
export class MusicService {
  private http = inject(HttpClient);

  // LIST: GET /api/music/all
  getMusic(): Observable<MusicReadDto[]> {
    return this.http.get<MusicReadDto[]>(`${API_BASE_URL}/all`);
  }

  // DETAILS: GET /api/music/get/{id}
  getMusicById(id: number): Observable<MusicReadDto> {
    return this.http.get<MusicReadDto>(`${API_BASE_URL}/get/${id}`);
  }

  // CREATE: POST /api/music/create
  createMusic(dto: MusicCreateDto): Observable<MusicReadDto> {
    return this.http.post<MusicReadDto>(`${API_BASE_URL}/create`, dto);
  }

  // PUT /api/music/update/{id}
  updateMusic(id: number, dto: MusicUpdateDto) {
  return this.http.put<MusicReadDto>(`${API_BASE_URL}/update/${id}`, dto);
}

  deleteMusic(id: number) {
  return this.http.delete(`${API_BASE_URL}/delete-music/${id}`);
}



  // SEARCH: GET /api/music/search?title=&artist=&album=&category=
  searchMusic(params: { title?: string; artist?: string; album?: string; category?: string }): Observable<MusicReadDto[]> {
    let q = new HttpParams();
    if (params.title)    q = q.set('title', params.title);
    if (params.artist)   q = q.set('artist', params.artist);
    if (params.album)    q = q.set('album', params.album);
    if (params.category) q = q.set('category', params.category);
    return this.http.get<MusicReadDto[]>(`${API_BASE_URL}/search`, { params: q });
  }
}
