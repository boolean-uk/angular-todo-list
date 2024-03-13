import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = "https://boolean-api-server.fly.dev/scandiumSG/todo"

  http = inject(HttpClient)

  get todos(): Promise<Todo[]> {
    return firstValueFrom(this.http.get<Todo[]>(this.baseUrl));
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = {
      title: title,
    };
    const request = await firstValueFrom(this.http.post<Todo>(this.baseUrl, todo))
    return request;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const request = await firstValueFrom(this.http.put<Todo>(this.baseUrl+"/"+updatedTodo.id, updatedTodo))
    return request;
  }
}
