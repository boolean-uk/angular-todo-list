import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  allTodos$: Observable<Todo[]> = this.todoService.getTodos();
  showCompleted: boolean = false;

  todos$: Observable<Todo[]> = this.allTodos$.pipe(
    map((todos) => todos.filter((todo) => !todo.completed))
  );

  constructor(private readonly todoService: TodoService) { }

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
    if (this.showCompleted) {
      this.todos$ = this.allTodos$.pipe(
        map((todos) => todos.filter((todo) => todo.completed))
      );
    } else {
      this.todos$ = this.allTodos$.pipe(
        map((todos) => todos.filter((todo) => !todo.completed))
      );
    }
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe();
  }

  newTodo(title: string) {
    this.todoService.addTodo(title).subscribe(() => {
      if (this.showCompleted) {
        this.todos$ = this.todoService.getTodos();
      } else {
        this.todos$ = this.todoService.getTodos().pipe(
          map((todos) => todos.filter((todo) => !todo.completed))
        );
      }
    });
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId).subscribe(() => {
      if (this.showCompleted) {
        this.todos$ = this.todoService.getTodos();
      } else {
        this.todos$ = this.todoService.getTodos().pipe(
          map((todos) => todos.filter((todo) => !todo.completed))
        );
      }
    });
  }
}