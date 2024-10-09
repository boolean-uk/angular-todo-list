import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiURL = 'https://boolean-uk-api-server.fly.dev/Muzea001/todo'

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiURL);
  }

   addTodo(title: string): Observable<Todo> {
    const todo = {
      title : title,
      completed: false,
    };
    return this.http.post<Todo>('https://boolean-uk-api-server.fly.dev/Muzea001/todo', todo, {
      headers : new HttpHeaders({
        'Content-Type': 'application/json',
    }),
  });
}

   updateTodo(updatedTodo: Todo): Observable<Todo> {
   const url = '${this.apiURL}/${updatedTodo.id}';
   return this.http.put<Todo>(url, updatedTodo, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  });
}
}
