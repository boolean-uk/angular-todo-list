import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { firstValueFrom } from 'rxjs';
import { ApplicationRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private URL = "https://boolean-api-server.fly.dev/thegrevling/todo"
  private httpClient = inject(HttpClient);
  showCompleted = true; // Default to not show completed todos
  todos: Promise<Todo[]>;

  constructor(private appRef: ApplicationRef) { this.todos = this.getTodos()}

  getTodos = async(): Promise<Todo[]> =>{
    const response = this.httpClient.get<Todo[]>(this.URL);
    const todos = await firstValueFrom(response);
    // Filter todos based on showCompleted property
    const filteredTodos = this.showCompleted ? todos : todos.filter(todo => !todo.completed);
    return filteredTodos;
  }

  async addTodo(title: string): Promise<Todo> {
    const response = this.httpClient.post<Todo>(this.URL, { title: title });
    const todo = await firstValueFrom(response);
    (await this.todos).push(todo);
    this.refreshTodos();
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const response = this.httpClient.put<Todo>(`${this.URL}/${updatedTodo.id}`, updatedTodo);
    const todo = await firstValueFrom(response);

    // Update the local todos
    const existingTodoIndex = (await this.todos).findIndex(t => t.id === updatedTodo.id);
    if (existingTodoIndex !== -1) {
      (await this.todos)[existingTodoIndex] = todo;
    }

    // Update the todos property
    this.refreshTodos();

    return todo;
  }
  toggleShowCompleted(): void {
    this.showCompleted = !this.showCompleted;
    this.refreshTodos();
  }
  // Helper method to update the 'todos' property
  private async refreshTodos(): Promise<void> {
    console.log("refreshing")
    this.todos = this.getTodos();
    console.log(this.todos)
    this.appRef.tick();
  }
}
