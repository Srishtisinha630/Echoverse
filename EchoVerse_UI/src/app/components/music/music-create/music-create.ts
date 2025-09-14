import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MusicService } from '../../../services/musicService';
import { MusicCreateDto } from '../../../models/music/MusicCreateDto';
import { MusicReadDto } from '../../../models/music/MusicReadDto';

@Component({
  selector: 'app-music-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './music-create.html',
  styleUrls: ['./music-create.css']
})
export class MusicCreateComponent {
  @Input() loading = false;
  @Output() musicCreated = new EventEmitter<MusicReadDto>();
  @Output() formClosed = new EventEmitter<void>();

  formData: MusicCreateDto = {
    title: '',
    artist: '',
    album: '',
    releaseYear: null,
    category: ''
  };

  errorMsg = '';
  isSubmitting = false;

  constructor(private musicService: MusicService) {}

  submitForm() {
    if (!this.formData.title || !this.formData.artist || !this.formData.category) {
      this.errorMsg = 'Title, Artist, and Category are required.';
      return;
    }

    this.errorMsg = '';
    this.isSubmitting = true;

    this.musicService.createMusic(this.formData).subscribe({
      next: (created) => {
        this.musicCreated.emit(created);
        this.isSubmitting = false;
        this.resetForm();
      },
      error: (err) => {
        console.error('Error creating music:', err);
        this.errorMsg = 'Failed to create music. Please try again.';
        this.isSubmitting = false;
      }
    });
  }

  resetForm() {
    this.formData = {
      title: '',
      artist: '',
      album: '',
      releaseYear: null,
      category: ''
    };
  }

  closeForm() {
    this.formClosed.emit();
  }
}
