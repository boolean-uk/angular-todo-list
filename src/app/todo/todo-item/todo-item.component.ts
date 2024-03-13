import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input('todo') todo: Todo | null = null;
  @Output('update') update = new EventEmitter<Todo>();
  todoService = inject(TodoService)

  toggleCompleted() {
    if (!this.todo) {
      throw new Error('cannot toggle complete on null');
    }
    this.todoService.updateTodo(this.todo)
  }
}
