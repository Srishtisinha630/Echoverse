import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MusicCategoryService } from '../../../services/musicCategoryService';
import { MusicCategoryDto } from '../../../models/music/MusicCategoryDto';

@Component({
  selector: 'app-category-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-edit.html'
})
export class CategoryEditComponent {
  @Input() category: MusicCategoryDto | null = null;
  @Output() categoryUpdated = new EventEmitter<MusicCategoryDto>();
  @Output() formClosed = new EventEmitter<void>();

  constructor(private categoryService: MusicCategoryService) {}

  updateCategory() {
  if (!this.category) return;
  this.categoryService.updateCategory(this.category.categoryId, this.category).subscribe({
    next: () => {
      // Emit only if category is not null
      if (this.category) this.categoryUpdated.emit(this.category);
    },
    error: (err) => console.error(err)
  });
}


  cancel() {
    this.formClosed.emit();
  }
}
