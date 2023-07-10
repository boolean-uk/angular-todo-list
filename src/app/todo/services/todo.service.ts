import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  private todos: Todo[] = [
    {
      userId: 1,
      id: this.todoId++,
      title: 'serve the app',
      completed: true,
    },
    {
      userId: 1,
      id: this.todoId++,
      title: 'familiarise yourself with the codebase',
      completed: false,
    },
    {
      userId: 1,
      id: this.todoId++,
      title: 'start talking to the api',
      completed: false,
    },
  ];

  // TODO replace with a get request
  todos$: Observable<Todo[]> = of(this.todos);

  addTodo(todo: string): void {
    // TODO: replace with a POST request
    this.todos.push({
      userId: 1,
      id: this.todoId++,
      title: todo,
      completed: false,
    });
  }

  updateTodo(updatedTodo: Todo): void {
    // TODO: replace with a PUT request
    let foundTodo = this.todos.find((todo) => todo.id === updatedTodo.id);
    foundTodo = { ...foundTodo, ...updatedTodo };
  }
}
