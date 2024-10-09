import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiURL = environment.apiUrl + "/VictorsCodingCorner/todo"

  private todoId = 1;

  constructor(private http: HttpClient) {
    console.log(this.apiURL)
  }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiURL)
  }

  addTodo(title: string): Observable<Todo> {
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    return this.http.post<Todo>(this.apiURL, todo);

  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    const url =`${this.apiURL}/${updatedTodo.id}`;
    return this.http.put<Todo>(url, updatedTodo);
  }
}
