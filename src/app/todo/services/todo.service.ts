import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://boolean-api-server.fly.dev/Pmylonas13/todo';
  private todoId = 1;
  constructor(private http: HttpClient) {}

  // TODO replace with a get request
  get todos(): Observable<Todo[]> {
    let todos =  this.http.get<Todo[]>(this.apiUrl);
    return todos;
  }

  addTodo(title: string): Observable<Todo> {
    const todo = {
     
      title: title,
      completed: false,
    };
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${updatedTodo.id}`;
    return this.http.put<Todo>(url, updatedTodo);