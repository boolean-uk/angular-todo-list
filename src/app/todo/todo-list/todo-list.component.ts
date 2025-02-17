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
  constructor(private readonly todoService: TodoService) {
    this.loadTodos();
  }

  todos: Todo[] = [];
  filtered: Todo[] = [];
  isCompleted: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  async updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe({
      next: (response) => {
        console.log('Updated todo:', response);
        this.loadTodos();
      },
    });
  }

  async newTodo(title: string) {
    this.todoService.addTodo(title).subscribe({
      next: (response) => {
        console.log('Created todo: ', response);
        this.loadTodos();
      },
      error: (error) => {
        console.log('Failed to create todo:', error);
        this.errorMessage = error;
      },
    });
  }

  toggleIsCompleted(): void {
    this.filter();
  }

  loadTodos(): void {
    this.isLoading = true;
    this.todoService.getTodos().subscribe({
      next: (response) => {
        this.todos = response;
        this.filter();
      },
      error: (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  filter(): void {
    this.filtered = this.todos.filter(
      (todo) => todo.completed === this.isCompleted
    );
  }
  // filter(): void {
  //   this.isLoading = true;
  //   this.todoService.getTodos().subscribe({
  //     next: (response) => {
  //       this.filtered = response.filter(
  //         (todo) => todo.completed === this.isCompleted
  //       );
  //     },
  //     error: (error) => {
  //       this.errorMessage = error;
  //       this.isLoading = false;
  //     },
  //     complete: () => {
  //       this.isLoading = false;
  //     },
  //   });
  // }
}
