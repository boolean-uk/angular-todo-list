import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  declarations: [TodoListComponent, TodoCreateComponent, TodoItemComponent],
  exports: [TodoCreateComponent, TodoListComponent],
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class TodoModule {}