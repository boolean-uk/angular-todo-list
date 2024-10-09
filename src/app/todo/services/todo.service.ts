import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  } 

  public addTodo(title: string): Observable<Todo> {
    const todo = {
      title: title,
    };
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  public updateTodo(updatedTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${updatedTodo.id}`, updatedTodo);
  }
}
