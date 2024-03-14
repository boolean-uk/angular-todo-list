import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})


export class TodoService {
  http = inject(HttpClient)
  todos: Todo[] = [];

  async getTodos(): Promise<Todo[]> {
    return await firstValueFrom(this.http.get<Todo[]>(environment.apiUrl));
  }
  
  async postTodo(title: string): Promise<Todo> {
    const body = {
      title: title,
    };
    
    const result = await firstValueFrom(this.http.post<Todo>(environment.apiUrl, body));

    return result;
  }

  async putTodo(updatedTodo: Todo): Promise<Todo> {
    return await firstValueFrom(this.http.put<Todo>(`${environment.apiUrl}/${updatedTodo.id}`, updatedTodo));
  }
}
