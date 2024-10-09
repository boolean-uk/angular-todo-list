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
  @Output('delete') delete = new EventEmitter<Todo>();
  isEditing = false;
  originalTitle: string | null = null;

  toggleCompleted() {
    if (!this.todo) {
      throw new Error('cannot toggle complete on null');
    }
    this.update.emit({
      ...this.todo,
      completed: !this.todo.completed,
    });
  }

  enableEdit() {
    if (!this.todo) {
      throw new Error('cannot edit null todo');
    }
    this.isEditing = true;
    this.originalTitle = this.todo.title;
  }

  saveTodo() {
    if (!this.todo) {
      throw new Error('cannot save null todo');
    }
    this.isEditing = false;
    this.update.emit(this.todo);
  }

  cancelEdit() {
    if (!this.todo) {
      throw new Error('cannot cancel edit on null todo');
    }
    this.isEditing = false;
    this.todo.title = this.originalTitle!;
  }

  deleteTodo() {
    if (!this.todo) {
      throw new Error('cannot delete null todo');
    }
    this.delete.emit(this.todo);
  }

  onUpdate() {
    if (!this.todo) {
      throw new Error('cannot update null todo');
    }
    this.update.emit(this.todo);
  }
}