import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient)
  private apiUsername = "sebHanssen";
  private apiUrl = `https://boolean-api-server.fly.dev/${this.apiUsername}/todo`;

  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(this.apiUrl));
  }

  async addTodo(title: string): Promise<Todo> {
    // @ts-ignore
    return firstValueFrom(this.http.post(this.apiUrl, {title: title, completed: false}));
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
     // @ts-ignore
    return firstValueFrom(this.http.put(`${this.apiUrl}/${updatedTodo.id}`, updatedTodo));
  }
}
