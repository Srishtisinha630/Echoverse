import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryWithTitles } from '../../../models/music/CategoryWithTitles';
import { MusicCategoryService } from '../../../services/musicCategoryService';
import { MusicCategoryDto } from '../../../models/music/MusicCategoryDto';


@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-list.html'
})
export class CategoryListComponent {
   @Input() categories: MusicCategoryDto[] = [];
    @Input() loading = false;
  
    @Output() editCategory = new EventEmitter<MusicCategoryDto>();
  @Output() deleteCategoryEvent = new EventEmitter<MusicCategoryDto>();

  constructor(private categoryService: MusicCategoryService) {}

 deleteCategory(category: MusicCategoryDto) {
  if (confirm(`Delete category "${category.categoryName}"?`)) {
    this.deleteCategoryEvent.emit(category);   // no HTTP here
  }
}


}
