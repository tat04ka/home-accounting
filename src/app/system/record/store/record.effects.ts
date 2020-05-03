import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as RecordActions from '../store/record.actions';
import { BaseApi } from 'src/app/shared/core/base.api';
import { Category } from '../../shared/models/category.model';
import { AppEvent } from '../../shared/models/event.model';

@Injectable()
export class RecordEffects extends BaseApi {
  constructor(private actions$: Actions, public http: HttpClient) {
    super(http);
  }

  @Effect()
  getCategories = this.actions$.pipe(
    ofType(RecordActions.GET_CATEGORIES),
    switchMap(()=> {
      return this.get('categories').pipe(
        map((categories: Category[])=> {
          return new RecordActions.LoadCategories(categories);
        })
      )
    })
  );

  @Effect()
  addCategory = this.actions$.pipe(
    ofType(RecordActions.ADD_CATEGORY_START),
    switchMap((recordData: RecordActions.AddCategoryStart) => {
      return this.post('categories', recordData.payload).pipe(
        switchMap((category: Category) => {
          return [
            new RecordActions.AddCategory(category),
            new RecordActions.ActionFinished(RecordActions.ADD_CATEGORY)
          ]
        })
      )
    })
  );

  @Effect()
  updateCategory = this.actions$.pipe(
    ofType(RecordActions.UPDATE_CATEGORY_START),
    switchMap((recordData: RecordActions.UpdateCategoryStart) => {
      return this.put(`categories/${recordData.payload.id}`, recordData.payload).pipe(
        switchMap((category: Category) => {
          return [
            new RecordActions.UpdateCategory(category),
            new RecordActions.ActionFinished(RecordActions.UPDATE_CATEGORY)
          ]
        })
      );
    })
  );

  @Effect()
  addEvent = this.actions$.pipe(
    ofType(RecordActions.ADD_EVENT_START),
    switchMap((recordData: RecordActions.AddEventStart) => {
      return this.post('events', recordData.payload).pipe(
        switchMap((event: AppEvent) => {
          return [
            new RecordActions.AddEvent(event),
            new RecordActions.ActionFinished(RecordActions.ADD_EVENT)
          ]
        })
      );
    })
  );
}