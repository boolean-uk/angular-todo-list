import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // TODO replace with a get request
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(title: string): Observable<Todo> {
    // TODO: replace with a POST request

    const todo = { title };

    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    // TODO: replace with a PUT request
    return this.getTodos().pipe(
      switchMap(todos => {
        if(todos.findIndex(todo => todo.id === updatedTodo.id) === -1) {
          throw new Error('todo not found');
        }
        const url = `${this.apiUrl}/${updatedTodo.id}`;
        return this.http.put<Todo>(url, updatedTodo);
      }),
      catchError(error => {
        console.error(error);
        return throwError(() => error);
      })
    );
  }
}
