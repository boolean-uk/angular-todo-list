import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo: Todo | null = null;
  @Output() update = new EventEmitter<Todo>();
  @Output() delete = new EventEmitter<number>();

  isEditing = false;
  updatedTitle: string = '';

  toggleCompleted() {
    if (!this.todo) {
      throw new Error('cannot toggle complete on null');
    }
    this.update.emit({
      ...this.todo,
      completed: !this.todo.completed,
    });
  }

  onEditClick() {
    if (!this.todo) {
      throw new Error('cannot edit null todo');
    }
    if (this.isEditing) {
      this.update.emit({
        ...this.todo,
        title: this.updatedTitle,
      });
      this.isEditing = false;
    } else {
      this.isEditing = true;
      this.updatedTitle = this.todo.title;
    }
  }

  onTitleBlur() {
    this.isEditing = false;
    if (!this.todo) {
      throw new Error('cannot edit null todo');
    }
    this.update.emit({
      ...this.todo,
      title: this.updatedTitle,
    });
  }

  onDeleteClick() {
    if (!this.todo) {
      throw new Error('cannot delete null todo');
    }
    this.delete.emit(this.todo.id);
  }
}
