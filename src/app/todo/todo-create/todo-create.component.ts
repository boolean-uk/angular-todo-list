import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent {
  constructor(private readonly todoService: TodoService) {}

  @Output() newTodo = new EventEmitter<string>();
  todo: string = '';

  submit() {
    if (this.todo.trim() !== '') {
      this.newTodo.emit(this.todo.trim());
      this.todo = '';
    }
  }
}