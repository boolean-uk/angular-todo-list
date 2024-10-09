import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent {
  @Output('newTodo') newTodo = new EventEmitter<string>();
  todo: string = '';

  constructor(private todoService: TodoService) {}

  submit() {
    if (this.todo.trim()) {
      this.todoService.addTodo(this.todo).subscribe({
        next: (createdTodo: Todo) => {
          this.newTodo.emit(createdTodo.title);
          this.todo = '';
        },
        error: (err) => {
          console.error('Error creating todo', err);
        }
      });
    }
  }
}
