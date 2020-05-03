import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SelectItem } from 'primeng/api/selectitem';
import { Store } from '@ngrx/store';

import { Category } from '../../shared/models/category.model';
import { Message } from 'src/app/shared/models/message.model';
import * as fromApp from '../../../store/app.reducer';
import * as RecordsActions from '../store/record.actions';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  categoriesOptions: SelectItem[] = [];
  categoriesList: Category[] = [];
  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

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

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.setCategory();
    this.message = new Message('', 'success');
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
    this.store.dispatch(new RecordsActions.UpdateCategoryStart(category));
    this.store.select('record').subscribe(recordState => {
      if (recordState.actionFinished && recordState.actionFinished === RecordsActions.UPDATE_CATEGORY) {
        this.message.text = 'Category edited successfully';
        window.setTimeout(() => {
          this.message.text = ''
        }, 5000);
      }
    });
  }
}
