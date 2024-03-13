import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent {
  @Output('newTodo') newTodo = new EventEmitter<string>();
  @Input() showCompleted: boolean = false;

  todo: string = '';

  submit() {
    this.newTodo.emit(this.todo);
  }
}
