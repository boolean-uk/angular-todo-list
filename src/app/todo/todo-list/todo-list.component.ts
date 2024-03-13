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
  displayCompleted: boolean = false;
  todos: Todo[] = [];

  async ngOnInit() {
    this.todos = await this.todoService.getTodo();
    this.displayDefault();
  }

  displayDefault() {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }

  async showAllTodos(){
    this.todos = await this.todoService.getTodo();

  }

  async showCompleted() {
    this.todos = await this.todoService.getTodo();
    this.todos = this.todos.filter((todo) => todo.completed);
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.todoService.todos;
  }
}
