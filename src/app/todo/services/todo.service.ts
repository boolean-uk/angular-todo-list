import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class TodoService {
  private todoId = 1;
  private apiUrl = 'https://boolean-uk-api-server.fly.dev/George-Alexander-S/todo';

  constructor(private http: HttpClient) {}

  getTodos(): Promise<Todo[]> {
    return lastValueFrom(this.http.get<Todo[]>(this.apiUrl));
  }

  async addTodo(title: string): Promise<Todo> {
    const newTodo: Todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    return lastValueFrom(this.http.post<Todo>(this.apiUrl, newTodo));
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const url = `${this.apiUrl}/${updatedTodo.id}`;
    return lastValueFrom(this.http.put<Todo>(url, updatedTodo));
  }
}
