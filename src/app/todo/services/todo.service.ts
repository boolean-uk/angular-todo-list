import { Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
  
})
export class TodoService {
  private http = inject(HttpClient)



  // TODO replace with a get request
  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}`)
    
  }

  public addTodo(title: string): Observable<Todo> {
    // TODO: replace with a POST request

   return this.http.post<Todo>(`${environment.apiUrl}`, {title})
  }

  // public getTodo(id: number): Observable<Todo> {
  //   return this.http.get<Todo>(`${environment.apiUrl + '/ ' +id.toString()}`)
  // }

  public updateTodo(updatedTodo: Todo): Observable<Todo> {

    // TODO: replace with a PUT request
    return this.http.put<Todo>(`${environment.apiUrl}/${updatedTodo.id}`, updatedTodo)
  }
}
