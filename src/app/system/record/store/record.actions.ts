import { Action } from '@ngrx/store';
import { Category } from '../../shared/models/category.model';
import { AppEvent } from '../../shared/models/event.model';

export const LOAD_CATEGORIES = '[Record] Load Categories';
export const GET_CATEGORIES = '[Record] Get Categories';
export const ADD_CATEGORY = '[Record] Add Category';
export const ADD_CATEGORY_START = '[Record] Start Adding Category';
export const UPDATE_CATEGORY = '[Record] Update Category';
export const UPDATE_CATEGORY_START = '[Record] Start Updating Category';
export const ADD_EVENT = '[Record] Add Event';
export const ADD_EVENT_START = '[Record] Start Adding Event';
export const ACTION_FINISHED = '[Record] Action Finished';

export class GetCategories implements Action {
  readonly type = GET_CATEGORIES;
}

export class LoadCategories implements Action {
  readonly type = LOAD_CATEGORIES;

  constructor(public payload: Category[]) {}
}

export class AddCategory implements Action {
  readonly type = ADD_CATEGORY;

  constructor(public payload: Category) {}
}

export class AddCategoryStart implements Action {
  readonly type = ADD_CATEGORY_START;

  constructor(public payload: Category) {}
}

export class UpdateCategoryStart implements Action {
  readonly type = UPDATE_CATEGORY_START;

  constructor(public payload: Category) {}
}

export class UpdateCategory implements Action {
  readonly type = UPDATE_CATEGORY;

  constructor(public payload: Category) {}
}

export class AddEvent implements Action {
  readonly type = ADD_EVENT;

  constructor(public payload: AppEvent) {}
}

export class AddEventStart implements Action {
  readonly type = ADD_EVENT_START;

  constructor(public payload: AppEvent) {}
}

export class ActionFinished implements Action {
  readonly type = ACTION_FINISHED;
  constructor(public payload: string) {}
}

export type RecordActions = LoadCategories
| GetCategories
| AddCategory
| AddCategoryStart
| UpdateCategory
| UpdateCategoryStart
| AddEvent
| AddEventStart
| ActionFinished;