import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
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

  service = inject(TodoService);

  toggleCompleted() {
    if (!this.todo) {
      throw new Error('cannot toggle complete on null');
    }
    const newTodo = {
      ...this.todo,
      completed: !this.todo.completed,
    };

    this.update.emit(newTodo);

  this.service.updateTodo(newTodo).subscribe(
      {
        next: (response) => {
          console.log(response);
        },

        error: (error) => {
          console.error(error);
        }
      }
  )
  }


}
