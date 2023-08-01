import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  showCompleted: boolean = false;

  todos: Promise<Todo[]> = this.todoService.todos;
  completedToDos: Promise<Todo[]> = this.todoService.completedToDos;
  notCompletedToDos: Promise<Todo[]> = this.todoService.notCompletedToDos;

  constructor(private readonly todoService: TodoService) {}

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }

  changeShowCompleted(showCompleted: boolean) {
    this.showCompleted = showCompleted
  }

  async newTodo(title: string) {
    await this.todoService.addTodo(title);
    this.todos = this.todoService.todos;
  }
}
