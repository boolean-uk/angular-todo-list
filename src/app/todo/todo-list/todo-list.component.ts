import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {}

  todos: Todo[] = [];

  subscription: Subscription = this.todoService.todos$.subscribe(
    (data: any[]) => {
      console.log('Inside subscribe()');
      this.todos = data;
    }
  );

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  public newTodo(title: string) {
    this.todoService.addTodo(title);
  }
}
