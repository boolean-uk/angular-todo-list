import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]> | null = null;

  showCompleted: boolean = true;

  constructor(private readonly todoService: TodoService) {}

  ngOnInit() {
    this.todos$ = this.todoService.todos.pipe(
      map(todos => todos.filter(todo => todo.completed === this.showCompleted))
    );
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe();
  }

  newTodo(title: string) {
    this.todoService.addTodo(title).subscribe(() => {
      this.todos$ = this.todoService.todos.pipe(
        map(todos => todos.filter(todo => todo.completed === this.showCompleted))
      );
    });
  }

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
    this.todos$ = this.todoService.todos.pipe(
      map(todos => todos.filter(todo => todo.completed === this.showCompleted))
    );
  }
}