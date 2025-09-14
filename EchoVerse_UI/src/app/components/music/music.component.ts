import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MusicService } from '../../services/musicService';
import { MusicCategoryService } from '../../services/musicCategoryService';
import { AuthService } from '../../services/auth/authservice';

import { MusicReadDto } from '../../models/music/MusicReadDto';
import { MusicCategoryDto } from '../../models/music/MusicCategoryDto';

import { MusicSearch } from './music-search/music-search';
import { MusicCreateComponent } from './music-create/music-create';
import { MusicEdit } from './music-edit/music-edit';
import { MusicList } from './music-list/music-list'; // <-- ensure this path
import { finalize, tap, timeout } from 'rxjs';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule, FormsModule, MusicSearch, MusicCreateComponent, MusicEdit, MusicList],
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
  musicTracks: MusicReadDto[] = [];
  categories: MusicCategoryDto[] = [];

  loading = false;
  error = '';

  selectedTrack: MusicReadDto | null = null;
  showCreateForm = false;
  showEditForm = false;
  showSearchForm = false;

  constructor(
    private musicService: MusicService,
    private categoryService: MusicCategoryService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.isAuthenticated()) {
      this.loadMusic();
      // this.loadCategories(); // enable when endpoint is ready
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  /** Full load with visible spinner (first load & resets) */
  loadMusic() {
    this.loading = true;
    this.error = '';
    console.log('[MusicComponent] loading=true → GET /api/music/all');
    this.musicService.getMusic()
      .pipe(
        timeout(8000), // prevents an infinite spinner on CORS/network stalls
        tap(tracks => console.log('[MusicComponent] response:', tracks)),
        finalize(() => {
          this.loading = false;
          console.log('[MusicComponent] finalize → loading=false');
          // Force a change-detection pass just in case
          this.cdr.detectChanges();
          // extra safety on next tick
          setTimeout(() => { this.loading = false; this.cdr.detectChanges(); }, 0);
        })
      )
      .subscribe({
        next: tracks => {
          this.musicTracks = tracks ?? [];
          console.log('[MusicComponent] musicTracks.length =', this.musicTracks.length);
        },
        error: err => {
          console.error('[MusicComponent] GET /api/music/all failed:', err);
          this.error = 'Could not load music (network/CORS/auth?). See console.';
        }
      });
  }

  /** Optional: categories load (no spinner) */
  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: cats => { this.categories = cats ?? []; },
      error: err => { console.warn('Error loading categories:', err); }
    });
  }

  /** Search flow — same spinner & error handling */
  onSearchSubmitted(query: any) {
    this.loading = true;
    this.error = '';
    const params = {
      title: query?.title,
      artist: query?.artist,
      album: query?.album,
      category: query?.category
    };
    this.musicService.searchMusic(params)
      .pipe(
        timeout(8000),
        finalize(() => { this.loading = false; this.cdr.detectChanges(); })
      )
      .subscribe({
        next: tracks => { this.musicTracks = tracks ?? []; },
        error: err => {
          console.error('[MusicComponent] search failed:', err);
          this.error = 'Search failed (network/CORS/auth?). See console.';
        }
      });
  }

  onSearchCancelled() { this.loadMusic(); this.hideForms(); }
  onSearchFormClosed() { this.loadMusic(); this.hideForms(); }

  showCreateMusicForm() { this.showCreateForm = true; this.showEditForm = false; this.showSearchForm = false; }
  showSearchMusicForm() { this.showSearchForm = true; this.showCreateForm = false; this.showEditForm = false; }

  onMusicCreated(track: MusicReadDto) {
  // optimistic UI so users see it instantly
  this.musicTracks = [track, ...this.musicTracks];

  // close the form
  this.showCreateForm = false;

  // hard refresh from API to ensure we're in sync with the DB
  this.loading = true;
  this.musicService.getMusic()
    .pipe(finalize(() => {
      this.loading = false;
      // if you keep ChangeDetectionRef, keep the nudge:
      this.cdr.detectChanges();
    }))
    .subscribe({
      next: (tracks) => { this.musicTracks = tracks ?? []; },
      error: (err) => {
        console.error('[MusicComponent] refresh after create failed:', err);
        // keep the optimistic item if refresh fails
      }
    });
}

  onCreateFormClosed() { this.showCreateForm = false; }

  /** Open editor */
  onEditMusic(track: MusicReadDto) {
    this.selectedTrack = track;
    this.showEditForm = true;
    this.showCreateForm = false;
    this.showSearchForm = false;
  }

  /** UPDATE: optimistic UI update */
  onMusicUpdated(updated: MusicReadDto) {
    this.musicTracks = this.musicTracks.map(m => m.id === updated.id ? updated : m);
    this.showEditForm = false;
    this.selectedTrack = null;
    this.cdr.detectChanges();
  }

  onEditFormClosed() { this.showEditForm = false; this.selectedTrack = null; }

  /** DELETE: instant remove */
onMusicDeleted(deletedTrack: MusicReadDto) {
  this.musicService.deleteMusic(deletedTrack.id).subscribe({
    next: () => {
      this.musicTracks = this.musicTracks.filter(t => t.id !== deletedTrack.id);
    },
   
  });
}

  hideForms() {
    this.showCreateForm = false;
    this.showEditForm = false;
    this.showSearchForm = false;
    this.selectedTrack = null;
  }
}
