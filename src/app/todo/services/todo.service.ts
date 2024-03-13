import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://boolean-api-server.fly.dev/osamahalmaliki/todo';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(title: string): Observable<Todo> {
    const todo = {
      title: title,
      completed: false,
    };
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${updatedTodo.id}`;
    return this.http.put<Todo>(url, updatedTodo);
  }

  deleteTodo(todoId: number): Observable<void> {
    const url = `${this.apiUrl}/${todoId}`;
    return this.http.delete<void>(url);
  }
}
