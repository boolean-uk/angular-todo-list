import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import environment from 'environment/environment';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.apiUrl);
  }

  addTodo(title: string): Observable<Todo> {
    const todo: Todo = {
      title: title,
      completed: false,
    };
    return this.http.post<Todo>(environment.apiUrl, todo);
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    return this.http.get<Todo>(`${environment.apiUrl}/${updatedTodo.id}`).pipe(
      switchMap((foundTodo) => {
        if (!foundTodo) {
          return throwError(() => new Error('No todo with that id found!'));
        }
        Object.assign(foundTodo, updatedTodo);
        return this.http.put<Todo>(
          `${environment.apiUrl}/${updatedTodo.id}`,
          foundTodo
        );
      }),
      catchError((error) => {
        console.error('Error updating todo:', error);
        return throwError(error);
      })
    );
  }
}
