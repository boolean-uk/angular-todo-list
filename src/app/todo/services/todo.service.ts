import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);

  // TODO replace with a get request  
  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(`https://boolean-api-server.fly.dev/giarreh/todo`));
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(this.http.post(`https://boolean-api-server.fly.dev/giarreh/todo`, { title: title, }));
    // @ts-ignore
    return todo;
  }

  async updateTodo(todo: Todo): Promise<Todo> {
    const updatedTodo = await firstValueFrom(this.http.put(`https://boolean-api-server.fly.dev/giarreh/todo/${todo.id}`, todo));
    // @ts-ignore
    return updatedTodo;
  }
}
