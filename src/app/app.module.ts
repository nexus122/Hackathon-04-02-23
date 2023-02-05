import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UpButtonComponent } from './components/up-button/up-button.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { ColumnsComponent } from './components/columns/columns.component';

@NgModule({
  declarations: [
    AppComponent,
    UpButtonComponent,
    ImageCardComponent,
    ColumnsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
