// todo-create.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent {
  todo: Todo = { id: 0, title: '', completed: false }; // Initialize with id: 0

  @Output() newTodo = new EventEmitter<Todo>();

  submit() {
    // Emit the new todo when the form is submitted
    this.newTodo.emit(this.todo);
    // Reset the form
    this.todo = { id: 0, title: '', completed: false }; // Reset with id: 0
  }
}
