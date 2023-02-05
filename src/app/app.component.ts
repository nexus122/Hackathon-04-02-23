import { Component, OnInit } from '@angular/core';
import { UnsplashImageService } from './services/getData/unsplash-image.service';
import { UnsplashImages } from './model/unsplashImages';
import { Store } from '@ngrx/store';
import { loadItems, loadedItems } from './state/actions/items.actions';
import { Observable, toArray } from 'rxjs';
import { selectLoading } from './state/selectors/items.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  data$: Observable<Array<UnsplashImages>> = new Observable();
  columns: Array<any> = [];
  columnNumber!: number;

  // Generamos un observable para el estado de loading
  loading$: Observable<boolean> = new Observable(); // Obtenemos el estado de loading

  constructor(
    private imageService: UnsplashImageService,
    private store: Store<any>
  ) {}
  async ngOnInit(): Promise<void> {
    this.store.dispatch(loadItems()); // Establecemos el loader en true porque estamos cargando datos
    this.loading$ = this.store.select(selectLoading); // Obtenemos el estado de loading
    this.data$ = this.store.select((state) => state.items.items); // Obtenemos los items de la store
    this.getData(); // Obtenemos los datos
    this.getColumnNumber(); // Calculamos el tamaño de la ventana

    // Siempre que se haga un 'resize' se ajusta el numero de columnas
    window.addEventListener('resize', this.getColumnNumber.bind(this));
  }

  async getData(): Promise<void> {
    this.imageService.getData().subscribe((data: Array<UnsplashImages>) => {
      this.store.dispatch(loadedItems({ items: data })); // Guardamos los items en el store
    });
  }

  async getMoreData(): Promise<void> {
    this.imageService.getMoreData().subscribe((data: Array<UnsplashImages>) => {
      this.store.dispatch(loadedItems({ items: data })); // Guardamos los items en el store
    });
  }

  splitArray(originalArray: Array<UnsplashImages>, parts: number) {
    const chunkLength = Math.floor(originalArray.length / parts);
    const arrays = [];

    for (let i = 0, start = 0; i < parts; i++, start += chunkLength) {
      const end = i === parts - 1 ? originalArray.length : start + chunkLength;
      arrays.push(originalArray.slice(start, end));
    }

    return arrays;
  }

  getColumnNumber() {
    if (window.innerWidth <= 425) {
      this.columnNumber = 1;
    } else if (window.innerWidth <= 768) {
      this.columnNumber = 2;
    } else if (window.innerWidth >= 1024) {
      this.columnNumber = 3;
    }

    this.data$.pipe(toArray()).subscribe((data: any) => {
      this.columns = this.splitArray(data, this.columnNumber);
    });
  }
}
