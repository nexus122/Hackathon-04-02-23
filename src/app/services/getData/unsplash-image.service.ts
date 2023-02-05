import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnsplashImageService {
  constructor() {}
  page: number = 3;
  per_page: number = 20;
  url: string = `https://api.unsplash.com/photos?page=${this.page}&per_page=${this.per_page}`;
  key: string = '&client_id=Glp-ZIa3fu4pttQdGXSa-NuBZy9mnRIS89zo6ypqvRQ';

  getData(): Observable<any> {
    return new Observable((observer) => {
      fetch(this.url + this.key)
        .then((response) => response.json())
        .then((data) => {
          observer.next(data);
        });
    });
  }

  getMoreData(): Observable<any> {
    this.page++;
    this.url = `https://api.unsplash.com/photos?page=${this.page}&per_page=${this.per_page}`;
    return new Observable((observer) => {
      fetch(this.url + this.key)
        .then((response) => response.json())
        .then((data) => {
          observer.next(data);
        });
    });
  }
}
