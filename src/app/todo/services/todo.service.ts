import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private apiUrl = 'https://boolean-uk-api-server.fly.dev/George-Alexander-S/todo';

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  public addTodo(newTodo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, newTodo);
  }

  public updateTodo(updatedTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${updatedTodo.id}`, updatedTodo);
  }
}