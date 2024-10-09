import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiURL = 'https://boolean-uk-api-server.fly.dev/johnfa1508/todo';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiURL);
  }

  addTodo(title: string): Observable<Todo> {
    const newTodo = {
      title: title,
      completed: false,
    }

    return this.http.post<Todo>(this.apiURL, newTodo);
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    const url = `${this.apiURL}/${updatedTodo.id}`;

    return this.http.put<Todo>(url, updatedTodo);
  }
}
