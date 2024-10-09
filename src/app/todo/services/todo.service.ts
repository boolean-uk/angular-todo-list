import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient)
  private gitUser = 'espensl2000'

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`https://boolean-uk-api-server.fly.dev/${this.gitUser}/todo`)
  }

  addTodo(title: string): Observable<Todo>{
    return this.http.post<Todo>(`https://boolean-uk-api-server.fly.dev/${this.gitUser}/todo`, {
      title: title
    })
  }
  
  updateTodo(updatedTodo: Todo) : Observable<Todo> {
    return this.http.put<Todo>(`https://boolean-uk-api-server.fly.dev/${this.gitUser}/todo/${updatedTodo.id}`, updatedTodo)
  }

}
