import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, ignoreElements, Observable, of, Subject, switchMap} from 'rxjs';
import {Todo, UpdateTodo} from '../models/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) { }
  private apiUrl = 'https://boolean-api-server.fly.dev';
  private username = "JakubPawlowskiTalan"; // hardcoded for development purposes

  addToDo$ = new Subject()
  addToDoErrors$ = this.addToDo$.pipe(
    switchMap((todo) => this.http.post<Todo>(`${this.apiUrl}/${this.username}/todo`, todo).pipe(
      ignoreElements(),
      catchError(err => of(err))
    ))
  )

  addTodo(taskName: string): void {
    this.addToDo$.next({ title: taskName })
  }

  getTodos(): Observable<Todo[]> {
    const url = `${this.apiUrl}/${this.username}/todo`;
    return this.http.get<Todo[]>(url);
  }

  getTodoById(todoId: number): Observable<Todo> {
    const url = `${this.apiUrl}/${this.username}/todo/${todoId}`;
    return this.http.get<Todo>(url);
  }

  updateTodo(todoId: number, updatedTodo: UpdateTodo): Observable<UpdateTodo> {
    const url = `${this.apiUrl}/${this.username}/todo/${todoId}`;
    return this.http.put<UpdateTodo>(url, updatedTodo);
  }

  deleteTodo(todoId: number): Observable<void> {
    const url = `${this.apiUrl}/${this.username}/todo/${todoId}`;
    return this.http.delete<void>(url);
  }
}
