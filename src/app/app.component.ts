import { Component } from '@angular/core';
import { Todo } from './todo/models/todo';
import { TodoService } from './todo/services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-todo-list';
  constructor(private readonly todoService: TodoService) {}

  todos: any | null = null;
  todos$: Promise<Todo[]> =
    this.todoService.getAllTodos();

  ngOnInit() {
    this.todos = this.todoService.getAllTodos();
  }
}
