import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { finalize, timeout } from 'rxjs/operators';

import { MusicCategoryService } from '../../services/musicCategoryService';
import { AuthService } from '../../services/auth/authservice';

import { MusicCategoryDto } from '../../models/music/MusicCategoryDto';
import {  CategorySearchComponent } from './category-search/category-search';
import {  CategoryCreateComponent } from './category-create/category-create';
import {  CategoryEditComponent } from './category-edit/category-edit';
import {  CategoryListComponent } from './category-list/category-list';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule, CategorySearchComponent, CategoryCreateComponent, CategoryEditComponent,  CategoryListComponent],
  templateUrl: './category.component.html',
  styleUrls: ['../music/music.component.css'] // reuse music styles for identical look
})
export class CategoryComponent implements OnInit {
 


  categories: MusicCategoryDto[] = [];

  loading = false;
  error = '';

  selectedCategory: MusicCategoryDto | null = null;
  showCreateForm = false;
  showEditForm = false;
  showSearchForm = false;

  constructor(
    private categoryService: MusicCategoryService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.isAuthenticated()) {
      this.loadCategories();
    }
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  /** Load all categories */
  loadCategories() {
    this.loading = true;
    this.error = '';
    this.categoryService.getCategories()
      .pipe(
        timeout(8000),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: cats => { this.categories = cats ?? []; },
        error: err => {
          console.error('[CategoryComponent] getCategories failed:', err);
          this.error = 'Could not load categories.';
        }
      });
  }

  /** Search flow */
  onSearchSubmitted(query: any) {
    this.loading = true;
    this.error = '';
    this.categoryService.searchCategories(query)
      .pipe(
        timeout(8000),
        finalize(() => { this.loading = false; this.cdr.detectChanges(); })
      )
      .subscribe({
        next: cats => { this.categories = cats ?? []; },
        error: err => {
          console.error('[CategoryComponent] search failed:', err);
          this.error = 'Search failed.';
        }
      });
  }

  onSearchCancelled() { this.loadCategories(); this.hideForms(); }
  onSearchFormClosed() { this.loadCategories(); this.hideForms(); }

  showCreateCategoryForm() { this.showCreateForm = true; this.showEditForm = false; this.showSearchForm = false; }
  showSearchCategoryForm() { this.showSearchForm = true; this.showCreateForm = false; this.showEditForm = false; }

  /** CREATE */
  onCategoryCreated(cat: MusicCategoryDto) {
    this.categories = [cat, ...this.categories];
    this.showCreateForm = false;
    this.cdr.detectChanges();
  }

  onCreateFormClosed() { this.showCreateForm = false; }

  /** EDIT */
  onEditCategory(cat: MusicCategoryDto) {
    this.selectedCategory = cat;
    this.showEditForm = true;
    this.showCreateForm = false;
    this.showSearchForm = false;
  }

  onCategoryUpdated(updated: MusicCategoryDto) {
    this.categories = this.categories.map(c => c.categoryId === updated.categoryId ? updated : c);
    this.showEditForm = false;
    this.selectedCategory = null;
    this.cdr.detectChanges();
  }

  onEditFormClosed() { this.showEditForm = false; this.selectedCategory = null; }

  /** DELETE */
  onCategoryDeleted(deletedCat: MusicCategoryDto) {
  if (!deletedCat?.categoryId) return;

  this.loading = true;
  this.categoryService.deleteCategory(deletedCat.categoryId)
    .pipe(finalize(() => { this.loading = false; this.cdr.detectChanges(); }))
    .subscribe({
      next: () => {
        // remove from UI only after server confirms delete
        this.categories = this.categories.filter(c => c.categoryId !== deletedCat.categoryId);
      },
      error: (err) => {
        console.error('[CategoryComponent] delete failed:', err);
        // fall back to a clean reload so UI matches server
        this.loadCategories();
      }
    });
}

  hideForms() {
    this.showCreateForm = false;
    this.showEditForm = false;
    this.showSearchForm = false;
    this.selectedCategory = null;
  }
}
