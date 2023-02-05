import { ActionReducerMap } from '@ngrx/store';
import { itemsState } from '../model/items.state';
import { UnsplashImages } from '../model/unsplashImages';
import { itemsReducer } from './reducers/items.reducers';

export interface AppState {
  items: itemsState;
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  items: itemsReducer,
};
