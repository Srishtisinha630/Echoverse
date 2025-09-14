import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MusicReadDto } from '../../../models/music/MusicReadDto';
import { MusicUpdateDto } from '../../../models/music/MusicUpdateDto';
import { MusicService } from '../../../services/musicService';

@Component({
  selector: 'app-music-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './music-edit.html',
  styleUrls: ['./music-edit.css']
})
export class MusicEdit implements OnChanges {
  @Input() showEditForm: boolean = false;
  @Input() musicToEdit: MusicReadDto | null = null;

  @Input() loading: boolean = false; // optional, mirrors your other components
  @Output() musicUpdated = new EventEmitter<MusicReadDto>();
  @Output() formClosed = new EventEmitter<void>();

  musicModel: MusicUpdateDto = {
    title: '',
    artist: '',
    album: '',
    releaseYear: null
  };

  constructor(private musicService: MusicService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['musicToEdit'] && this.musicToEdit) {
      this.musicModel = {
        title: this.musicToEdit.title,
        artist: this.musicToEdit.artist,
        album: this.musicToEdit.album ?? '',
        releaseYear: this.musicToEdit.releaseYear
      };
    }
  }

  onEditSubmit(form: NgForm) {
    if (!form.valid || !this.musicToEdit) return;

    const payload: MusicUpdateDto = {
      title: (this.musicModel.title || '').trim(),
      artist: (this.musicModel.artist || '').trim(),
      album: (this.musicModel.album || '').trim(),
      releaseYear: this.musicModel.releaseYear ? Number(this.musicModel.releaseYear) : null
    };

    this.musicService.updateMusic(this.musicToEdit.id, payload).subscribe({
      next: (updated) => {
        const merged: MusicReadDto = updated ?? { ...this.musicToEdit!, ...payload };
        this.musicUpdated.emit(merged);
        alert('Music updated successfully!');
      },
      error: (err) => {
        console.error('Error updating music:', err);
        alert('Failed to update music');
      }
    });
  }

  onClose() {
    this.formClosed.emit();
  }
}
