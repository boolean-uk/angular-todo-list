import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoCreateComponent } from './todo-create/todo-create.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TodoEditComponent } from './todo-edit/todo-edit.component'

@NgModule({ declarations: [TodoListComponent, TodoCreateComponent, TodoItemComponent, TodoEditComponent],
    exports: [TodoCreateComponent, TodoListComponent], imports: [CommonModule, FormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class TodoModule {}
