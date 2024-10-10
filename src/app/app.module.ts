import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoModule } from './todo/todo.module';
import { provideHttpClient } from '@angular/common/http';
import { NgArrayPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, TodoModule],
  providers: [provideHttpClient(), NgArrayPipesModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
