import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { map } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {}

  filter = false;

  todos = this.todoService.getTodos().pipe(
    map((ts) => ts
    .filter((t) => t.completed === this.filter)));

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    const todo = {
      id: 0,
      title: title,
      completed: false,
    };
    this.todoService.addTodo(todo);
  }

  switchFilter() {
    this.filter = !this.filter;
    this.todos = this.todoService.getTodos().pipe(
      map((ts) => ts
      .filter((t) => t.completed === this.filter)));
  }
}