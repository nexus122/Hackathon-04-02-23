import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UpButtonComponent } from './components/up-button/up-button.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { ColumnsComponent } from './components/columns/columns.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { itemsReducer } from './state/reducers/items.reducers';
import { ROOT_REDUCERS } from './state/app.state';

@NgModule({
  declarations: [
    AppComponent,
    UpButtonComponent,
    ImageCardComponent,
    ColumnsComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ name: 'TEST' }), // Esto se agrega al instalar NGRX
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
