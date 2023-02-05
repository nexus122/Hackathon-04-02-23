import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UnsplashImages } from 'src/app/model/unsplashImages';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class UnsplashImageService {
  constructor() {}
  page: number = 1;
  per_page: number = 20;

  getData(): Observable<UnsplashImages> {
    return new Observable((observer) => {
      const conditions: string = `?page=${this.page}&per_page=${this.per_page}&client_id=${environment.apiToken}`;
      fetch(environment.apiUrl + conditions)
        .then((response) => response.json())
        .then((data) => {
          observer.next(data);
        }); // hacer una pipe que me transfore los datos en el tipo unsplashImage
    }).pipe(
      map((data: any) =>
        data.map((item: any) => {
          return {
            name: item.user.name,
            description: item.user.bio,
            url: item.urls.regular,
          };
        })
      )
    );
  }

  getMoreData(): Observable<UnsplashImages> {
    this.page++;
    const conditions: string = `?page=${this.page}&per_page=${this.per_page}&client_id=${environment.apiToken}`;
    return new Observable((observer) => {
      fetch(environment.apiUrl + conditions)
        .then((response) => response.json())
        .then((data) => {
          observer.next(data);
        });
    }).pipe(
      map((data: any) =>
        data.map((item: any) => {
          return {
            name: item.user.name,
            description: item.user.bio,
            url: item.urls.regular,
          };
        })
      )
    );
  }
}
