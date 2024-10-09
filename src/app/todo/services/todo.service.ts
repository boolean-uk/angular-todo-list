import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiURL);
  }

  addTodo(title: string): Observable<Todo> {
    const newTodo = {
      title: title,
      completed: false,
    }

    return this.http.post<Todo>(this.apiURL, newTodo);
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    const url = `${this.apiURL}/${updatedTodo.id}`;

    return this.http.put<Todo>(url, updatedTodo);
  }

  deleteTodo(todoId: number): Observable<void> {
    const url = `${this.apiURL}/${todoId}`;

    return this.http.delete<void>(url);
  }
}