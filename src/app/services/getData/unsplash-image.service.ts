import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UnsplashImageService {
  constructor() {}
  page: number = 1;
  per_page: number = 20;

  getData(): Observable<any> {
    return new Observable((observer) => {
      const conditions: string = `?page=${this.page}&per_page=${this.per_page}&client_id=${environment.apiToken}`;
      fetch(environment.apiUrl + conditions)
        .then((response) => response.json())
        .then((data) => {
          observer.next(data);
        });
    });
  }

  getMoreData(): Observable<any> {
    this.page++;
    const conditions: string = `?page=${this.page}&per_page=${this.per_page}&client_id=${environment.apiToken}`;
    return new Observable((observer) => {
      fetch(environment.apiUrl + conditions)
        .then((response) => response.json())
        .then((data) => {
          observer.next(data);
        });
    });
  }
}
