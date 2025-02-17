import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  showCompleted = false;
  todos$ = new Observable<Todo[]>();
  
  constructor(private readonly todoService: TodoService) {}


  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos().pipe(
      map(todos => todos.filter(todo => todo.completed === this.showCompleted))
    );
  }

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
    this.todos$ = this.todoService.getTodos().pipe(
      map(todos => todos.filter(todo => todo.completed === this.showCompleted))
    );
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo);
  }

  newTodo(todo: string) {
    this.todoService.addTodo(todo);
  }
}
