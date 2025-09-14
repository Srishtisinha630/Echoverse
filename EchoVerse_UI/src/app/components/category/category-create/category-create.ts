import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MusicCategoryService } from '../../../services/musicCategoryService';
import { MusicCategoryDto } from '../../../models/music/MusicCategoryDto';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-create.html'
})
export class CategoryCreateComponent {
  @Output() categoryCreated = new EventEmitter<MusicCategoryDto>();
  @Output() formClosed = new EventEmitter<void>();
  @Input() loading!: boolean;


  categoryName = '';

  constructor(private categoryService: MusicCategoryService) {}

  createCategory() {
    if (!this.categoryName || this.categoryName.trim() === '') {
      alert('Please enter a category name');
      return;
    }
        // Build a DTO for the API; id = 0 is typical placeholder for "new"


    const category: MusicCategoryDto = { categoryId: 0, categoryName: this.categoryName.trim() };

        // Call backend to create the category

    this.categoryService.createCategory(category).subscribe({
      next: (created) => {
        // Success popup message
        alert(`✅ Category "${created.categoryName}" created successfully!`);
        this.categoryCreated.emit(created);
        this.categoryName = '';
      },
      error: (err) => {
        console.error('Error creating category:', err);

        // Handle duplicate category
        if (err.status === 400 && err.error && err.error.title && 
            err.error.title.toLowerCase().includes('duplicate')) {
          alert(`⚠️ Category "${this.categoryName}" already exists! Please choose a different name.`);
          return;
        }

        // Handle specific validation errors
        if (err.error && err.error.errors) {
          const validationErrors = err.error.errors;
          let messages = '';
          
          // Check for duplicate category name specifically
          if (validationErrors.CategoryName && 
              validationErrors.CategoryName.some((msg: string) => msg.toLowerCase().includes('duplicate'))) {
            alert(`⚠️ Category "${this.categoryName}" already exists! Please choose a different name.`);
            return;
          }

          // General validation errors
          for (const field in validationErrors) {
            if (validationErrors.hasOwnProperty(field)) {
              messages += `${field}: ${validationErrors[field].join(', ')}\n`;
            }
          }
          alert(`❌ Validation Errors:\n${messages}`);
        } else if (err.status === 409) {
          // Conflict status for duplicate
          alert(`⚠️ Category "${this.categoryName}" already exists! Please choose a different name.`);
        } else {
          alert('❌ Failed to create category. Please check your connection and try again.');
        }
      }
    });
  }

  cancel() {
    this.formClosed.emit();
  }
}
