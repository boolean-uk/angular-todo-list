import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TodoFilterComponent } from './todo-filter/todo-filter.component';



@NgModule({
  declarations: [
    TodoListComponent,
    TodoItemComponent,
    TodoCreateComponent,
    TodoFilterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    TodoListComponent
  ]
})
export class TodoModule { }
