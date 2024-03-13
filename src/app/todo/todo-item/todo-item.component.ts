import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo: Todo | null = null;
  @Output() update = new EventEmitter<Todo>();
  editing: boolean = false; // New property to control edit mode
  currentEditingTodo: Todo | null = null;

  toggleCompleted() {
    if (!this.todo) {
      throw new Error('Cannot toggle completion on null');
    }
    this.update.emit({ ...this.todo, completed: !this.todo.completed });
  }

  toggleEdit() {
    this.editing = !this.editing;
  }

  saveEdit() {
    if (this.todo) {
      this.update.emit(this.todo); // Emit the updated todo
      this.editing = false; // Exit edit mode
    }
  }
}
