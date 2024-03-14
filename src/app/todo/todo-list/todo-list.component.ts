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
  showCompleted = false;
  todos = this.getTodos();

  getTodos() {
    return this.showCompleted ? this.todoService.todos : this.todoService.todos.then((todos) => todos.filter((todo) => !todo.completed));
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.getTodos();
  }

  toggleCompleted() {
    this.showCompleted = !this.showCompleted;
    this.todos = this.getTodos();
  }
}
