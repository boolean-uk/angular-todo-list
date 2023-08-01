import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {}
  // @Output('showCompleted') showCompleted = new EventEmitter<Todo>();

  todos = this.todoService.todos;

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.todoService.todos;
  }

  async deleteTodo(todo: Todo) {
    await this.todoService.deleteTodo(todo);
    this.todos = this.todoService.todos;
  }

  // showCompleted() {
  //   this.todoService.;
  // }
}
