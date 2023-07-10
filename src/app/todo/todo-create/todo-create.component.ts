import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent {
  constructor(private readonly todoService: TodoService) {}

  todo: string = '';

  submit() {
    this.todoService.addTodo(this.todo);
  }
}
