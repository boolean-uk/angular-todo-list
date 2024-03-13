import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  filterCompleted: boolean = true;
  constructor(private readonly todoService: TodoService) {}
  
  todos = this.todoService.todos
    .then((todos) => todos.filter((todo) => (!this.filterCompleted || !todo.completed)))
  
  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).then((res) => this.retrieveTodos())
  }
  
  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todoService.todos.then((res) => this.retrieveTodos());
  }

  toggleFilter(value: boolean) {
    this.filterCompleted = value
    this.retrieveTodos()
  }

  retrieveTodos() {
    this.todos = this.todoService.todos
    .then((todos) => todos.filter((todo) => (!this.filterCompleted || !todo.completed)))
  }
}
