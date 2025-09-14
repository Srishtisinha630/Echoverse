import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicReadDto } from '../../../models/music/MusicReadDto';

@Component({
  selector: 'app-music-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-list.html',
  styleUrls: ['./music-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MusicList {
  @Input() musics: MusicReadDto[] = [];
  @Input() loading = false;

  @Output() editMusic = new EventEmitter<MusicReadDto>();
  @Output() deleteMusicEvent = new EventEmitter<MusicReadDto>();

  onEdit(m: MusicReadDto) {
    this.editMusic.emit(m);
  }

  onDelete(m: MusicReadDto) {
    this.deleteMusicEvent.emit(m);
  }

  /** Safely resolve category no matter which DTO field it arrives in. */
  categoryOf(m: any): string {
    return (m?.categoryName ?? m?.category ?? '—') as string;
  }
}
