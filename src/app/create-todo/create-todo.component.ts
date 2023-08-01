import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService } from 'app/todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.css'],
})
export class CreateTodoComponent {
  @Output() todoCreated = new EventEmitter();
  constructor(private todoService: TodoService) {}

  newTodo: string = '';

  async createTodo() {
    await this.todoService.createTodo(this.newTodo);
    this.todoCreated.emit();
    this.newTodo = '';
  }
}
