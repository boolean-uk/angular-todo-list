import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, find, map, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  refresh$ = new BehaviorSubject<void>(undefined)
  todos$ = this.refresh$.pipe(
    switchMap(() => this.http.get<Todo[]>(`${environment.apiUrl}/wer08/todo`))
  )

  constructor(private readonly http: HttpClient) { }

  addTodo(title: string): Observable<Todo> {
    let requestBody = { title: title }
    return this.http.post<Todo>(`${environment.apiUrl}/wer08/todo`, requestBody).pipe(
      tap(() => this.refresh$.next()),
      catchError((err) => {
        console.error(`Cannot add todo ${title}`)
        return throwError(() => err)
      })
    )
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${environment.apiUrl}/wer08/todo/${updatedTodo.id}`, updatedTodo).pipe(
      tap(() => this.refresh$.next())
    )
  }
}
