import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos: Todo[] = [];
  showCompleted: boolean = false;

  constructor(private readonly todoService: TodoService) {
    this.loadTodos();
  }

  async loadTodos() {
    this.todos = await this.todoService.getTodos(this.showCompleted);
  }

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
    this.loadTodos();
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.loadTodos();
  }

  toggleTodoVisibility() {
    this.showCompleted = !this.showCompleted;
    this.loadTodos();
  }
}
