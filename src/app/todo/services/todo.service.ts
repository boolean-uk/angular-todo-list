import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs'; 
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';  

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  private apiURL = environment.apiUrl;
  constructor(private http: HttpClient) {}
  todos: Todo[] = [];

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiURL);
  }

  addTodo(title: string): Observable<Todo> {
    const newTodo = { title }; 
    return this.http.post<Todo>(this.apiURL, newTodo);
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiURL}/${updatedTodo.id}`, updatedTodo); 
  }


}
