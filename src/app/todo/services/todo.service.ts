import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private httpClient: HttpClient = inject(HttpClient);
  private baseUrl = 'https://boolean-uk-api-server.fly.dev/SimpFred/todo';

  public getAllTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.baseUrl);
  }

  public addTodo(title: string): Observable<any> {
    const newTodo = {
      title: title,
      completed: false,
    };
    return this.httpClient.post(this.baseUrl, newTodo).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  updateTodo(updatedTodo: Todo): Observable<any> {
    const url = `${this.baseUrl}/${updatedTodo.id}`;
    return this.httpClient.put(url, updatedTodo).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }
}
