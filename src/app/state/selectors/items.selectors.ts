import { createSelector } from '@ngrx/store';
import { itemsState } from 'src/app/model/items.state';

export const selectItemsFeature = (state: any) => state.items; // Padre

export const selectListItems = createSelector(
  selectItemsFeature,
  (state: itemsState) => state.items // Hijo
);

export const selectLoading = createSelector(
  selectItemsFeature,
  (state: itemsState) => state.loading // Hijo
);
