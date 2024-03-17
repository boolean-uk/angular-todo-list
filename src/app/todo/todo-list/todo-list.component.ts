// todo-list.component.ts
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]> | undefined;
  showCompleted: boolean = false;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todos$ = this.todoService.getTodos().pipe(
      map((todos: Todo[]) => todos.filter((todo: Todo) => this.showCompleted ? true : !todo.completed))
    );
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(() => {
      this.fetchTodos();
    });
  }

  newTodo(title: string) {
    this.todoService.addTodo(title).subscribe(() => {
      this.fetchTodos();
    });
  }

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
    this.fetchTodos();
  }
}
