import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input('todo') todo: Todo | null = null;
  @Output('update') update = new EventEmitter<Todo>();

  TodoService = inject(TodoService);

  toggleCompleted() {
    if (!this.todo) {
      throw new Error('cannot toggle complete on null');
    }
    
    const updatedTodo = {
      ...this.todo,
      completed: !this.todo.completed,
    };

    this.TodoService.updateTodo(updatedTodo).subscribe({
      next: (todo) => {
        this.update.emit(todo); 
      },
      error: (err) => {
        console.error('Error updating todo:', err);
      },
    });
  }
}

