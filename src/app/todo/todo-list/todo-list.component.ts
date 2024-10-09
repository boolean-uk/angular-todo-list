import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { filter, map, Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  todos$: Observable<Todo[]> | undefined;
  filteredTodos$: Observable<Todo[]> | undefined;
  showCompletedTodos: boolean = false;

  constructor(private readonly todoService: TodoService) {
    this.loadTodos();
  }

  loadTodos() {
    this.todos$ = this.todoService.getTodoList();
    this.filteredTodos$ = this.todos$;
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo, todo.id).subscribe();
  }

  newTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(() => {
      this.loadTodos();
    });
  }

  toggle() {
    this.showCompletedTodos = !this.showCompletedTodos;
    this.filteredTodos$ = this.showCompletedTodos
      ? this.todos$?.pipe(
          map((todos) => todos.filter((todo) => todo.completed))
        )
      : this.todos$?.pipe(
          map((todos) => todos.filter((todo) => !todo.completed))
        );
  }
}
