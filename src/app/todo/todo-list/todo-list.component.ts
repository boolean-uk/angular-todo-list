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

  public hideCompleted = true;
  todos = this.todoService.todos;
  nonCompletedTodos = this.todos.then((todos) => todos.filter((todo) => !todo.completed));

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.todoService.todos;
    this.nonCompletedTodos = this.todos.then((todos) => todos.filter((todo) => !todo.completed));
  }
}
