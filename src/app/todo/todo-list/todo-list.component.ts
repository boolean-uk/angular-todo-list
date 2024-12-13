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

  todos = this.todoService.todos;

  // By default only show non-completed todos
  showCompleted: boolean = false;

  // Not completed todos
  nonComplited = this.todoService.todos.then((todos) =>
    todos.filter((todo) => !todo.completed)
  );

  // Completed todos
  complited = this.todoService.todos.then((todos) =>
    todos.filter((todo) => todo.completed)
  );

  // List of completed todos if showCompleted is true else list of non-completed todos
  get filteredTodos() {
    if (this.showCompleted) {
      return this.complited;
    } else {
      return this.nonComplited;
    }
  }

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
    this.nonComplited = this.todoService.todos.then((todos) =>
      todos.filter((todo) => !todo.completed)
    );
    this.complited = this.todoService.todos.then((todos) =>
      todos.filter((todo) => todo.completed)
    );
    this.todos = this.todoService.todos;
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.nonComplited = this.todoService.todos.then((todos) =>
      todos.filter((todo) => !todo.completed)
    );
    this.todos = this.todoService.todos;
  }

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
  }
}
