import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Category } from '../shared/models/category.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  categories: Category[] = [];
  isLoaded = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select('record').subscribe(recordState => {
      this.categories = recordState.categories;
      this.isLoaded = true;
    });
  }
}
