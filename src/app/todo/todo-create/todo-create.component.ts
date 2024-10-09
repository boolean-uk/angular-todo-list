import { Component, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-create',
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.css'],
})
export class TodoCreateComponent {
  @Output('newTodo') newTodo = new EventEmitter<Todo>();

  todo: string = '';

  submit() {
    const newTodoItem: Todo = {
      title: this.todo,
      completed: false
    };
    this.newTodo.emit(newTodoItem);
    this.todo = '';
  }
}
