import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private httpClient = inject(HttpClient)
     private todos: Todo[] = []
  

    getTodoList(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(`https://boolean-uk-api-server.fly.dev/sebgro98/todo`)
    .pipe(tap(todos => this.todos = todos))
  }

   addTodo(todo: Todo): Observable<Todo> {
   return this.httpClient.post<Todo>('https://boolean-uk-api-server.fly.dev/sebgro98/todo', todo)
  }

  updateTodo(updatedTodo: Todo, id: any): Observable<Todo> {
    return this.httpClient.put<Todo>(`https://boolean-uk-api-server.fly.dev/sebgro98/todo/${id}`, updatedTodo)
  }

  getTodos(): Todo[] {
    return this.todos;
  }
}
