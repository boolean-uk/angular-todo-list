import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  http = inject(HttpClient);
  todos: Todo[] = [];

  // TODO replace with a get request
  async getTodos() {
    const result = await firstValueFrom(
      this.http.get<Todo[]>(`${environment.apiUrl}/Agatland/todo`)
    );
    this.todos = result;
    return this.todos;
  }

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = await firstValueFrom(
      this.http.post<Todo>(`${environment.apiUrl}/Agatland/todo`, {title: title})
    )

    this.todos.push(todo);
    return todo
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const updatedTodoApi = await firstValueFrom(
      this.http.put<Todo>(`${environment.apiUrl}/Agatland/todo/${updatedTodo.id}`, updatedTodo)
    );
    this.todos = this.todos.map((todo) => todo.id === updatedTodo.id ? updatedTodoApi : todo);

    return updatedTodoApi
  }
}
