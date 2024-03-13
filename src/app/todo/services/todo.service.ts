import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = environment.apiUrl;

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
