import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService } from 'app/todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css'],
})
export class CreateTodoComponent {
  @Output() todoListChanged = new EventEmitter();
  newTodo: string;

  constructor(private todoService: TodoService) {
    this.newTodo = '';
  }

  async createTodo() {
    await this.todoService.createTodo(this.newTodo);
    this.todoListChanged.emit();
    this.newTodo = '';
  }
}
