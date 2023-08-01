import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';



@NgModule({
  declarations: [
    TodoListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    TodoListComponent
  ]
})
export class TodoModule { }
