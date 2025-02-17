import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  //private todoId = 1;
  
  // TODO replace with a get request
 constructor(private http: HttpClient){}

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}`);
  }
  
  public addTodo(title: string): Observable<Todo> {
    // TODO: replace with a POST request
    return this.http.post<Todo>(`${environment.apiUrl}`, {title});
  }

  public updateTodo(updatedTodo: Todo): Observable<Todo> {
    // TODO: replace with a PUT request
    return this.http.put<Todo>(`${environment.apiUrl}/${updatedTodo.id}`, updatedTodo);
   
  }
}
