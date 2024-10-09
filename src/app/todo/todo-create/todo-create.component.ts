import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent {
  @Output('newTodo') newTodo = new EventEmitter<Todo>();
  @Input() todoToEdit: Todo | null = null;
  todo: string = '';

  ngOnChanges() {
    if (this.todoToEdit) {
      this.todo = this.todoToEdit.title;
    } else {
      this.todo = '';
    }
  }

  submit() {
    if (this.todo.trim()) {
      const todoToEmit: Todo = {
        id: this.todoToEdit?.id || 0,
        title: this.todo,
        completed: this.todoToEdit?.completed || false
      };

      this.newTodo.emit(todoToEmit);
      this.todo = '';
    }
  }

  reset() {
    this.todo = '';
    this.todoToEdit = null;
  }
}
