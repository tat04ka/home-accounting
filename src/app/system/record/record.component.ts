import { Component, OnInit, Output } from '@angular/core';

import { Category } from '../shared/models/category.model';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  categories: Category[] = [];
  isLoaded = false;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesService.getCategoriesList()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isLoaded = true;
      });
  }

  newCategoryAdded(category: Category) {
    this.categories = [...this.categories, category];
  }

  categoryUpdated(category: Category) {
    const index = this.categories.findIndex(c => c.id === category.id);
    this.categories[index] = category;
    this.categories = [...this.categories];
  }
}
