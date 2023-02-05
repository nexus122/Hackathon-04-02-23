import { createReducer, on } from '@ngrx/store';
import { UnsplashImages } from 'src/app/model/unsplashImages';
import { loadItems, loadedItems } from '../actions/items.actions';
import { itemsState } from 'src/app/model/items.state';

// Creamos un estado inicial, en el cual indicamos que los items estan vacios y que no se esta cargando
export const initialState: itemsState = {
  loading: false,
  items: [],
};

// Funciones puras para los reducers
export const itemsReducer = createReducer(
  initialState,
  on(loadItems, (state) => {
    // Esta acción cambia a true el loading
    return { ...state, loading: true };
  }),
  on(loadedItems, (state, { items }) => {
    // Esta acción guardara los datos en la store.
    return { ...state, loading: false, items: [...state.items, ...items] };
  })
);
