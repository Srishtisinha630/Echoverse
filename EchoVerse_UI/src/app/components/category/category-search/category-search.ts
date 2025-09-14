import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-search.html',
  styleUrl: './category-search.css'
})
export class CategorySearchComponent {
  searchName: string = '';

  @Output() searchSubmitted = new EventEmitter<string>();
  @Output() searchCancelled = new EventEmitter<void>();

  search() {
    const name = this.searchName.trim();
    this.searchSubmitted.emit(name);
  }

  cancel() {
    this.searchName = '';
    this.searchCancelled.emit();
  }
}
