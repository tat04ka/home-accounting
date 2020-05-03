import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Category } from '../../shared/models/category.model';
import * as fromApp from '../../../store/app.reducer';
import * as RecordActions from '../store/record.actions';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  constructor(private store: Store<fromApp.AppState>) {}

  onSubmit(form: NgForm) {
    let { name, limit } = form.value;
    if (limit < 0) {
      limit *= -1;
    }

    const category = new Category(name, limit);
    this.store.dispatch(new RecordActions.AddCategoryStart(category));
    this.store.select('record').subscribe(recordState => {
      if (recordState.actionFinished && recordState.actionFinished === RecordActions.ADD_CATEGORY) {
        form.reset();
        form.form.patchValue({limit: 0});
      }
    });
  }
}
