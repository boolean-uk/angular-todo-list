import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  BASE_URL = 'https://boolean-api-server.fly.dev/LinusWillmont/todo';
  todos: Promise<Todo[]> = this.getTodos();

  constructor(private http: HttpClient) {}

  async getTodos(): Promise<Todo[]> {
    return await firstValueFrom(this.http.get<Todo[]>(this.BASE_URL));
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(
      this.http.post<Todo>(this.BASE_URL, { title: title })
    );
    (await this.todos).push(todo);
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const todo = await firstValueFrom(
      this.http.put<Todo>(`${this.BASE_URL}/${updatedTodo.id}`, updatedTodo)
    );
    (await this.todos).map((t) => (t.id === updatedTodo.id ? updatedTodo : t));
    return todo;
  }
}
