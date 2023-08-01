import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  private apiUrl = 'https://boolean-api-server.fly.dev';
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

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(title: string): Observable<Todo> {
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${updatedTodo.id}`;
    return this.http.put<Todo>(url, updatedTodo);
  }
}