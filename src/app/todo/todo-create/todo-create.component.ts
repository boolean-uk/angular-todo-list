import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent {
  @Output() newTodo = new EventEmitter<string>();
  title: string = '';

  addTodo() {
    if (this.title.trim()) {
      this.newTodo.emit(this.title);
      this.title = '';
    }
  }
}