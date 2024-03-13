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

  editing = false;
  editedTitle = '';

  toggleCompleted() {
    if (!this.todo) {
      throw new Error('Cannot toggle complete on null');
    }
    const updatedTodo: Todo = {
      ...this.todo,
      completed: !this.todo.completed,
    };
    this.update.emit(updatedTodo);
  }

  startEditing() {
    if (!this.todo) {
      throw new Error('Cannot edit null todo');
    }
    this.editedTitle = this.todo.title;
    this.editing = true;
  }

  cancelEditing() {
    this.editing = false;
  }

  saveTitle() {
    if (!this.todo) {
      throw new Error('Cannot save title on null todo');
    }
    const updatedTodo: Todo = {
      ...this.todo,
      title: this.editedTitle,
    };
    this.update.emit(updatedTodo);
    this.editing = false;
  }
}
