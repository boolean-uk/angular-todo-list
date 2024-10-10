import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://boolean-uk-api-server.fly.dev/josteinruen/todo';

  constructor(private http: HttpClient) {}

  get todos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(title: string): Observable<Todo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const newTodo = { title, completed: false };
    return this.http.post<Todo>(this.apiUrl, newTodo, { headers });
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/${updatedTodo.id}`;
    return this.http.put<Todo>(url, updatedTodo, { headers });
  }
}