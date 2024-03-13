import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {}
  todos: any;

  ngOnInit() {
    this.todos = this.todoService.getTodos();
  }

  updateTodo(todo: Todo) {
    this.todoService.putTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.postTodo(title);
    this.todos = this.todoService.getTodos();
  }
}
