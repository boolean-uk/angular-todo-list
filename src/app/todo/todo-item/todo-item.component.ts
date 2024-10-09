import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input('todo') todo: Todo | null = null;
  @Output('update') update = new EventEmitter<Todo>();

  isEditing: boolean = false;

  toggleCompleted() {
    if (!this.todo) {
      throw new Error('cannot toggle complete on null');
    }
    this.update.emit({
      ...this.todo,
      completed: !this.todo.completed,
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  handleUpdate() {
    if (!this.todo) {
      throw new Error('Cannot update null todo');
    }
    this.isEditing = false; 
    this.update.emit(this.todo); 
  }
}
