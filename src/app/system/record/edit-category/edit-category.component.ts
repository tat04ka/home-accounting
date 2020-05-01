import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SelectItem } from 'primeng/api/selectitem';

import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { Message } from 'src/app/shared/models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  categoriesOptions: SelectItem[] = [];
  categoriesList: Category[] = [];
  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;
  sub1: Subscription;

  @Output() onCategoryEdit = new EventEmitter<Category>();
  @Input() set categories(categories: Category[]) {
    this.categoriesList = categories;
    this.categoriesOptions = [];
    categories.forEach(category => {
      this.categoriesOptions.push({
        label: category.name,
        value: category.id
      })
    });
  };

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.setCategory();
    this.message = new Message('', 'success');
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

  setCategory() {
    this.currentCategory = this.categoriesList.find(item => {
      return item.id === this.currentCategoryId;
    });
  }

  onSubmit(form: NgForm) {
    let {limit, name} = form.value;
    if (limit < 0) {
      limit *= -1;
    }

    const category = new Category(name, limit, this.currentCategoryId);
    this.sub1 = this.categoriesService.updateCategory(category)
      .subscribe((category: Category) => {
        this.onCategoryEdit.emit(category);
        this.message.text = 'Category edited successfully';
        window.setTimeout(() => {
          this.message.text = ''
        }, 5000);
      });
  }

}
