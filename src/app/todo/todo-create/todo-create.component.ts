import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent {
  @Output('newTodo') newTodo = new EventEmitter<string>();

  todo: string = '';

  submit() {
    this.newTodo.emit(this.todo);
  }
}
