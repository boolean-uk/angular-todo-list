import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, find, map, of, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  refresh$ = new BehaviorSubject<void>(undefined)
  todos$ = this.refresh$.pipe(
    switchMap(() => this.http.get<Todo[]>(`${environment.apiUrl}/wer08/todo`))
  )
  todosErrorSender$ = new BehaviorSubject<TodoErrorResponse | null>(null)

  constructor(private readonly http: HttpClient) { }

  getErrors(): Observable<any> {
    return this.todosErrorSender$.asObservable();
  }

  addTodo(title: string): Observable<Todo> {
    let requestBody = { title: title }
    return this.http.post<Todo>(`${environment.apiUrl}/wer08123/todo`, requestBody).pipe(
      tap(() => this.refresh$.next()),
      catchError((err: TodoErrorResponse) => {
        console.error(`Cannot add todo ${title}`)
        this.todosErrorSender$.next(err)
        return throwError(() => err)
      })
    )
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${environment.apiUrl}/wer08/todo/${updatedTodo.id}`, updatedTodo).pipe(
      tap(() => this.refresh$.next())
    )
  }

  deleteTodo(id: number): Observable<Todo> {
    return this.http.delete<Todo>(`${environment.apiUrl}/wer08/todo/${id}`).pipe(
      tap(() => this.refresh$.next())
    )
  }
}

export interface TodoErrorResponse {
  status: number,
  statusText: string,
  message: string,
  error: {
    error: string
  }
}