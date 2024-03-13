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
    return this.todoService.todos.then(res => res.filter(todo => todo.completed === this.showCompleted))
  }

  toggleCompleted() {
    this.showCompleted = !this.showCompleted
    this.todos = this.getTodos()
  }

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
    this.todos = this.getTodos()
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.getTodos();
  }
}
