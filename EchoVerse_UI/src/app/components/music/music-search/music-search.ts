import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-music-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './music-search.html'
})
export class MusicSearch {
  searchModel: any = {
    title: '',
    artist: '',
    album: '',
    category: ''
  };

  @Output() searchSubmitted = new EventEmitter<any>();
  @Output() searchCancelled = new EventEmitter<void>();
  @Output() formClosed = new EventEmitter<void>();

  onSearch() {
    // Emit search query only if any field is filled
    const hasSearchInput = Object.values(this.searchModel).some(val => val && val.toString().trim() !== '');
    if (hasSearchInput) {
      this.searchSubmitted.emit({ ...this.searchModel });
    } else {
      // Emit empty object to load full list
      this.searchSubmitted.emit({});
    }
  }

  resetSearch() {
    this.searchModel = {
      title: '',
      artist: '',
      album: '',
      category: ''
    };
    this.searchCancelled.emit(); // This will trigger reload of full list
  }

  onCancel() {
    this.resetSearch();
    this.searchCancelled.emit();
  }

  closeForm() {
    this.formClosed.emit();
  }
}
