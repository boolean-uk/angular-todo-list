import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input('todo') todo: Todo | null = null;
  @Output('update') update = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) {}

  toggleCompleted() {
    if (!this.todo) {
      throw new Error('Cannot toggle completion status on null todo');
    }

    const updatedTodo = { ...this.todo, completed: !this.todo.completed};

    this.todoService.updateTodo(updatedTodo).subscribe({
      next: (updated: Todo) => {
        this.update.emit(updated);
      },
      error: (error) => {
        console.error('Error updating todo', error);
      }
    });
  }
}
