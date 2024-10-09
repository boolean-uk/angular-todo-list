import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private httpClient = inject(HttpClient);


  public getAllTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>('https://boolean-uk-api-server.fly.dev/uthmel/todo');
  }


  public addTodo(todo: Todo): Observable<Todo> {
    return this.httpClient.post<Todo>('https://boolean-uk-api-server.fly.dev/uthmel/todo', todo);
  }

 
  public updateTodo(updatedTodo: Todo): Observable<Todo> {
    return this.httpClient.put<Todo>(`https://boolean-uk-api-server.fly.dev/uthmel/todo/${updatedTodo.id}`, updatedTodo);
  }
}

