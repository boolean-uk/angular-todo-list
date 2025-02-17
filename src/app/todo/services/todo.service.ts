import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { environment } from '../../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly baseUrl = `${environment.apiUrl}/JoneTheBuilder/todo`;

  constructor(private http: HttpClient) {}

  getTodos(): Promise<Todo[]> {
    return firstValueFrom(this.http.get<Todo[]>(this.baseUrl));
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = {
      title,
      completed: false,
    };
    const newTodo = await firstValueFrom(this.http.post<Todo>(this.baseUrl, todo));
    return newTodo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    return firstValueFrom(
      this.http.put<Todo>(`${this.baseUrl}/${updatedTodo.id}`, updatedTodo)
    );
  }
}
