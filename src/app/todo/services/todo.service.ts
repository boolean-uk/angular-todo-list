import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  addTodo(title: string): Observable<Todo> {
    const newTodo: Partial<Todo> = { title, completed: false };
    return this.http.post<Todo>(this.apiUrl, newTodo);
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    const updateUrl = `${this.apiUrl}/${updatedTodo.id}`;
    return this.http.put<Todo>(updateUrl, updatedTodo);
  }
}
