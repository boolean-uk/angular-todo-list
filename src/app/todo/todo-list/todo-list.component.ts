import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  filtered = false;
  todos = new Observable<Todo[]>();
  filteredTodos = new Observable<Todo[]>();
  
  constructor(private readonly todoService: TodoService) {
    this.todos = this.todoService.getTodos();
    this.filteredTodos = this.todoService.getFilteredTodos(this.todos);
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).then(() => {
      this.todos = this.todoService.getTodos();
      this.filteredTodos = this.todoService.getFilteredTodos(this.todos);
    });
  }

  newTodo(title: string) {
    this.todoService.addTodo(title).then(() => {
      this.todos = this.todoService.getTodos();
      this.filteredTodos = this.todoService.getFilteredTodos(this.todos);
    });
  }
}
