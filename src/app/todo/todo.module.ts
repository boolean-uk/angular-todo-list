import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [TodoListComponent, TodoCreateComponent, TodoItemComponent],
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule],
  exports: [TodoCreateComponent, TodoListComponent],
})
export class TodoModule {}
