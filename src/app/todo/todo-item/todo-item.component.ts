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

  toggleCompleted() {
    if (!this.todo) {
      throw new Error('Cannot toggle complete on null');
    }
    this.update.emit({
      ...this.todo,
      completed: !this.todo.completed,
    });
  }

  deleteTodo() {
    if (!this.todo) {
      throw new Error('Cannot delete todo on null');
    }
    this.delete.emit(this.todo.id);
  }
}