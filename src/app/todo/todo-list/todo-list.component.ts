import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private readonly todoService: TodoService) {}

  async ngOnInit() {
    this.todos = await this.todoService.getTodos();
  }

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
    this.todos = await this.todoService.getTodos();
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = await this.todoService.getTodos();
  }
}
