import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { CompletedTodosPipe } from './completed-todos.pipe';

@NgModule({
  declarations: [TodoListComponent, TodoCreateComponent, TodoItemComponent, CompletedTodosPipe],
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [TodoCreateComponent, TodoListComponent],
})
export class TodoModule { }
