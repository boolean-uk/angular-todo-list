import { Injectable, inject } from '@angular/core';
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
  http = inject(HttpClient)

  // TODO replace with a get request CHECK
  getTodos(): Promise<Todo[]> {
    //@ts-ignore
    return firstValueFrom(this.http.get(`https://boolean-api-server.fly.dev/toege/todo/`));
  }

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    //@ts-ignore
    return firstValueFrom(this.http.post('https://boolean-api-server.fly.dev/toege/todo/', {title: title, completed: false}))
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    //@ts-ignore
    return firstValueFrom(this.http.put(`https://boolean-api-server.fly.dev/toege/todo/${updatedTodo.id}`, updatedTodo))
  }
}
