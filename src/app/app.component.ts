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
      this.data = data;
      this.columns = this.splitArray(data, this.columnNumber);
    });
    this.windowSize();
    window.addEventListener('resize', this.windowSize.bind(this));
  }

  async getMoreData(): Promise<void> {
    this.imageService.getMoreData().subscribe((data) => {
      const temp = [...data, ...this.data];
      this.data = temp;
      this.columns = this.splitArray(temp, this.columnNumber);
    });
  }

  splitArray(originalArray: Array<any>, parts: number) {
    const chunkLength = Math.floor(originalArray.length / parts);
    const arrays = [];

    for (let i = 0, start = 0; i < parts; i++, start += chunkLength) {
      const end = i === parts - 1 ? originalArray.length : start + chunkLength;
      arrays.push(originalArray.slice(start, end));
    }

    return arrays;
  }

  windowSize() {
    if (window.innerWidth <= 425) {
      this.columnNumber = 1;
    } else if (window.innerWidth <= 768) {
      this.columnNumber = 2;
    } else if (window.innerWidth >= 1024) {
      this.columnNumber = 3;
    }

    this.columns = this.splitArray(this.data, this.columnNumber);
  }
}
