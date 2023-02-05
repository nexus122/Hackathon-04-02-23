import { Component, OnInit } from '@angular/core';
import { UnsplashImageService } from './services/getData/unsplash-image.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Hackathon-04-02-23';
  data: Array<any> = [];
  columns: Array<any> = [];
  columnNumber: number = 3;

  constructor(private imageService: UnsplashImageService) {}
  async ngOnInit(): Promise<void> {
    this.imageService.getData().subscribe((data) => {
      console.log(data);
      this.data = data;
      this.columns = this.splitArray(data, this.columnNumber);
    });
    this.windowSize();
    window.addEventListener('resize', this.windowSize.bind(this));
  }

  async getMoreData(): Promise<void> {
    this.imageService.getMoreData().subscribe((data) => {
      console.log(data);
      let temp = [...data, ...this.data];
      this.data = temp;
      this.columns = this.splitArray(temp, this.columnNumber);
    });
  }

  splitArray(originalArray: Array<any>, parts: number) {
    const arrays = [];
    const chunkLength = Math.floor(originalArray.length / parts);

    for (let i = 0; i < parts; i++) {
      if (i === parts - 1) {
        arrays.push(originalArray.slice(i * chunkLength));
      } else {
        arrays.push(
          originalArray.slice(i * chunkLength, (i + 1) * chunkLength)
        );
      }
    }

    return arrays;
  }

  windowSize() {
    console.log('Se recalcula el numero de columnas');
    console.log('Tamaño: ', window.innerWidth);
    if (window.innerWidth <= 425) {
      console.log('Es tamaño movil, 1 columna');
      this.columnNumber = 1;
    } else if (window.innerWidth <= 768) {
      console.log('Es tamaño tablet, 2 columnas');
      this.columnNumber = 2;
    } else if (window.innerWidth >= 1024) {
      console.log('Es tamaño PC, 3 columnas');
      this.columnNumber = 3;
    }

    this.columns = this.splitArray(this.data, this.columnNumber);
  }
}
