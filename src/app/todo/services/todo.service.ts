import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})

export class TodoService {
  http = inject(HttpClient);
  username = 'tollov';

  async getTodos(): Promise<Todo[]> {
    const results = await firstValueFrom(this.http.get(`${environment.apiUrl}/${this.username}/todo`));
    // @ts-ignore
    return results;
  }

  async addTodo(title: string): Promise<Todo> {
    const response = await firstValueFrom(this.http.post(`${environment.apiUrl}/${this.username}/todo`, { title: title }));
    // @ts-ignore
    return response;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const response = await firstValueFrom(this.http.put(`${environment.apiUrl}/${this.username}/todo/${updatedTodo.id}`, updatedTodo));
    // @ts-ignore
    return response;
  }
}
