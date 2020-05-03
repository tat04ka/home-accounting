import { AppEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';
import * as RecordActions from './record.actions';

export interface State {
  events: AppEvent[],
  categories: Category[],
  actionFinished: string
}

const inititalState: State = {
  events: [],
  categories: [],
  actionFinished: null
}

export function recordReducer(state = inititalState, action: RecordActions.RecordActions) {
  switch(action.type) {
    case RecordActions.LOAD_CATEGORIES:
      if (state.categories.length === 0) {
        return {
          ...state,
          categories: [...action.payload],
          actionFinished: null
        };
      } else {
        return {
          ...state,
          actionFinished: null
        };
      }
    case RecordActions.ADD_CATEGORY_START:
    case RecordActions.UPDATE_CATEGORY_START:
    case RecordActions.GET_CATEGORIES:
    case RecordActions.ADD_EVENT_START:
      return {
        ...state,
        actionFinished: null
      };
    case RecordActions.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        actionFinished: null
      }
    case RecordActions.UPDATE_CATEGORY:
      const categoryIndex = state.categories.findIndex(c => c.id === action.payload.id);
      const category = state.categories[categoryIndex];
      const updatedCategory = {...category, ...action.payload};
      const updatedCategories = [...state.categories];
      updatedCategories[categoryIndex] = updatedCategory;
      return {
        ...state,
        categories: updatedCategories,
        actionFinished: null
      }
    case RecordActions.ADD_EVENT:
      return {
        ...state,
        events: [...state.events, action.payload],
        actionFinished: null
      }
    case RecordActions.ACTION_FINISHED:
      return {
        ...state,
        actionFinished: action.payload
      };
    default:
      return state;
  }
}