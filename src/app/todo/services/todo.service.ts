import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  public hideCompleted = false;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.apiUrl);
  }

  addTodo(title: string): Observable<Todo> {
    return this.http.post<Todo>(
      environment.apiUrl,
      {
        title: title,
        completed: false,
      },
      this.headers,
    );
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>(
      `${environment.apiUrl}/${updatedTodo.id}`,
      updatedTodo,
      this.headers,
    );
  }

  toggleHideCompleted() {
    this.hideCompleted = !this.hideCompleted;
  }
}
