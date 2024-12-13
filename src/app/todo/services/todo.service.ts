import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private BASE_URL = 'https://boolean-api-server.fly.dev/andreSturesson/todo';
  todos: Promise<Todo[]> = this.getTodos();

  constructor(private http: HttpClient) {}

  async getTodos(): Promise<Todo[]> {
    console.log('getTodos');
    return await firstValueFrom(this.http.get<Todo[]>(this.BASE_URL));
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(
      this.http.post<Todo>(this.BASE_URL, { title })
    );
    (await this.todos).push(todo);
    return todo;
  }

  async updateTodo(todo: Todo): Promise<Todo> {
    return await firstValueFrom(
      this.http.put<Todo>(`${this.BASE_URL}/${todo.id}`, todo)
    );
  }
}
