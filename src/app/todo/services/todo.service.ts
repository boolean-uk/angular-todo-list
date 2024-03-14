import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  private todoList: Todo[] = [
    {
      id: this.todoId++,
      title: 'serve the app',
      completed: true,
    },
    {
      id: this.todoId++,
      title: 'familiarise yourself with the codebase',
      completed: false,
    },
    {
      id: this.todoId++,
      title: 'start talking to the api',
      completed: false,
    },
  ];

  constructor(private readonly http: HttpClient) {}

  get todos(): Promise<Todo[]> {
    return firstValueFrom(
      this.http.get<Todo[]>('https://boolean-api-server.fly.dev/martenere/todo')
    );
  }

  async addTodo(title: string): Promise<Todo> {
    const url = 'https://boolean-api-server.fly.dev/martenere/todo';
    const todo = {
      title: title,
    };

    const addedTodo = await firstValueFrom(
      this.http.post<Todo>(url, todo, {
        headers: { 'Content-Type': 'application/json' },
      })
    );

    console.log(addedTodo);

    return addedTodo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const url =
      'https://boolean-api-server.fly.dev/martenere/todo/' +
      updatedTodo.id.toString();
    console.log(url);

    const addedTodo = await firstValueFrom(
      this.http.put<Todo>(url, updatedTodo, {
        headers: { 'Content-Type': 'application/json' },
      })
    );

    return addedTodo;
  }
}
