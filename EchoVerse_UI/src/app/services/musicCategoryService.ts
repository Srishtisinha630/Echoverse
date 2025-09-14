import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MusicCategoryDto } from '../models/music/MusicCategoryDto'; 
import { CategoryWithTitles } from '../models/music/CategoryWithTitles';

const API_BASE_URL = 'http://localhost:5000/api/categories';

@Injectable({
  providedIn: 'root'
})
export class MusicCategoryService {
  private http = inject(HttpClient);

  // Matches GET: api/categories/all
  getCategories(): Observable<MusicCategoryDto[]> {
    return this.http.get<MusicCategoryDto[]>(`${API_BASE_URL}/all`);
  }

  // Matches GET: api/categories/{id}
  getCategory(id: number): Observable<MusicCategoryDto> {
    return this.http.get<MusicCategoryDto>(`${API_BASE_URL}/${id}`);
  }

  // Matches POST: api/categories/create
  createCategory(category: MusicCategoryDto): Observable<MusicCategoryDto> {
    return this.http.post<MusicCategoryDto>(`${API_BASE_URL}/create`, category);
  }

  // Matches PUT: api/categories/{id}
  updateCategory(id: number, category: MusicCategoryDto): Observable<MusicCategoryDto> {
    return this.http.put<MusicCategoryDto>(`${API_BASE_URL}/${id}`, category);
  }

  // Matches DELETE: api/categories/{id}
  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/${id}`);
  }

  // This one will only work if you have a backend endpoint like GET api/categories/search
  searchCategories(name: string): Observable<MusicCategoryDto[]> {
    return this.http.get<MusicCategoryDto[]>(`${API_BASE_URL}/search?name=${encodeURIComponent(name)}`);
  }

  getCategoriesWithMusicTitles(): Observable<CategoryWithTitles[]> {
  return this.http.get<CategoryWithTitles[]>(`${API_BASE_URL}/with-music-titles`);
}

}
