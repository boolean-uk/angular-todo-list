import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}/mjklukowski/todo`)
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`${environment.apiUrl}/mjklukowski/todo`, todo)
  }

  toggleTodo(todo: Todo): Observable<Todo> {
    const newTodo = structuredClone(todo)
    newTodo.completed = !newTodo.completed
    return this.http.put<Todo>(`${environment.apiUrl}/mjklukowski/todo/${todo.id}`, newTodo)
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    return this.http.delete<Todo>(`${environment.apiUrl}/mjklukowski/todo/${todo.id}`)
  }
}
