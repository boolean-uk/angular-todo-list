import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input('todo') todo: Todo | null = null;
  @Output('update') update = new EventEmitter<Todo>();

  constructor(private readonly todoListComponent: TodoListComponent) {}
  
  showAll = this.todoListComponent.showAll;

  toggleCompleted() {
    if (!this.todo) {
      throw new Error('cannot toggle complete on null');
    }
    this.update.emit({
      ...this.todo,
      completed: !this.todo.completed,
    });
  }
}
