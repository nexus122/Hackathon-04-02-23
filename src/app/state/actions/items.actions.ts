import { createAction, props } from '@ngrx/store';
import { UnsplashImages } from 'src/app/model/unsplashImages';

// Llamamos para cargar articulos
export const loadItems = createAction('[Item List] Load Items');

// Llamamos cuando los articulos se hayan cargado
export const loadedItems = createAction(
  '[Item List] Loaded Success',
  props<{ items: Array<UnsplashImages> }>()
);
