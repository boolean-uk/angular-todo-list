import {Component, OnInit} from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit{
  constructor(private readonly todoService: TodoService) {}

  todos = this.todoService.getTodo();

  ngOnInit() {
  }

  async updateTodo(todo: Todo) {
    await this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.todoService.getTodo();
  }

  async deleteTodo(todo: Todo) {
    await this.todoService.deleteTodo(todo);
    this.todos = this.todoService.getTodo();
  }
}
