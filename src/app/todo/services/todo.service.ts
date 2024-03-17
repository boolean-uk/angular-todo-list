// todo.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://boolean-api-server.fly.dev/Hjaldrgud/todo'; // API URL

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

  // Update the updateTodo method to handle server response
  updateTodo(updatedTodo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${updatedTodo.id}`; // Assuming todo objects have an 'id' property
    return this.http.put<Todo>(url, updatedTodo);
  }
}
