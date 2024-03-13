import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = `${environment.apiUrl}/krzysztofmmm/todo`;

  constructor(private http: HttpClient) {}

  getTodos(showCompleted: boolean): Promise<Todo[]> {
    return this.http
      .get<Todo[]>(this.baseUrl)
      .pipe(
        catchError((error) => {
          console.error('Get todos failed', error);
          return of([]); // Always return an array
        })
      )
      .toPromise()
      .then(
        (todos) =>
          todos?.filter((todo) => showCompleted === todo.completed) || []
      );
  }

  addTodo(title: string): Promise<Todo> {
    return this.http
      .post<Todo>(this.baseUrl, { title })
      .toPromise()
      .then((response) => {
        if (!response) {
          throw new Error('Todo creation failed'); // Handle no response
        }
        return response;
      });
  }

  updateTodo(updatedTodo: Todo): Promise<Todo> {
    const url = `${this.baseUrl}/${updatedTodo.id}`;
    return this.http
      .put<Todo>(url, updatedTodo)
      .toPromise()
      .then((response) => {
        if (!response) {
          throw new Error('Todo update failed'); // Handle no response
        }
        return response;
      });
  }
}
