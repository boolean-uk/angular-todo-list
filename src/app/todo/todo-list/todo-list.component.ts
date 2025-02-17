import { Component, OnDestroy, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = []
  constructor(private readonly todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.todos.subscribe(x => this.todos = x);
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }
  newTodo(title: string): void {
    const newId = this.todos.length;
    const newTo: Todo = {
      id: newId,
      title: title,
      completed: false
    }
    this.todoService.addTodo(newTo);
  }
}
