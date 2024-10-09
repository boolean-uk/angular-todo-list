import { inject, Injectable, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {  

  constructor(private httpClient: HttpClient) {}

  public getTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>('https://boolean-uk-api-server.fly.dev/Ic4rus90/todo') 
  }

  addTodo(title: string): Observable<Todo> {
    const newTodo: Partial<Todo> = { title, completed: false};
    return this.httpClient.post<Todo>('https://boolean-uk-api-server.fly.dev/Ic4rus90/todo', newTodo);
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    const url = `https://boolean-uk-api-server.fly.dev/Ic4rus90/todo/${updatedTodo.id}`
    return this.httpClient.put<Todo>(url, updatedTodo);
  }
}
