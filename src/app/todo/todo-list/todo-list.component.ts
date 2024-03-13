import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {}

  todos = this.todoService.getTodos();

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
    this.todos = this.todoService.getTodos();
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.todoService.getTodos();
  }

  viewButton: Boolean = false
  toggleButton() {
    this.viewButton = !this.viewButton
  }
}
