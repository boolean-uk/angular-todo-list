import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent {
  constructor(private readonly todoService: TodoService) {
    this.updateTodoList();
  }
  showCompleted: boolean = false;

  filteredTodos: Observable<Todo[]> | undefined;
  todos: Observable<Todo[]> | undefined;

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
    this.filterTodos();
  }

  updateTodoList() {
    this.todos = this.todoService.getAllTodos();
    this.filterTodos();
  }

  filterTodos() {
    this.filteredTodos = this.todos?.pipe(
      map((todos) =>
        todos.filter((todo) => todo.completed === this.showCompleted)
      )
    );
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe({
      next: (response) => {
        console.log('Car updated successfully', response);
      },
      error: (error) => {
        console.error('Error updating car', error);
      },
      complete: () => {
        console.log('Update car request completed');
        this.updateTodoList();
      },
    });
  }

  newTodo(title: string) {
    this.todoService.addTodo(title).subscribe({
      next: (response) => {
        console.log('Todo created successfully', response);
      },
      error: (error) => {
        console.error('Error created todo', error);
      },
      complete: () => {
        console.log('Update todo created completed');
        this.updateTodoList();
      },
    });
  }
}
