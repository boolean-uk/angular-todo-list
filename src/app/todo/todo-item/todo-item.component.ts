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
  isEditing = false;
  editedTitle: string = '';

  toggleCompleted() {
    if (!this.todo) {
      throw new Error('cannot toggle complete on null');
    }
    this.update.emit({
      ...this.todo,
      completed: !this.todo.completed,
    });
  }
  
  startEdit() {
    this.isEditing = true;
    this.editedTitle = this.todo ? this.todo.title : '';
  }

  exitEdit() {
    this.isEditing = false;
  }

  saveChanges() {
    if (!this.todo) return;
    this.todo.title = this.editedTitle;
    this.update.emit(this.todo);
    this.exitEdit();
  }
}
