import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private httpC = inject(HttpClient); // Dependency Injection of HttpClient...

  private todoId = 1;

  public getTodos(): Observable<Todo[]>
  {
    return  this.httpC.get<Todo[]>(`${environment.apiUrl}/${environment.user}/todo`);
  }

  public addTodo(title: string): Observable<Todo> {

    const todo:Todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };

    return this.httpC.post<Todo>(
      `${environment.apiUrl}/${environment.user}/todo`,
      todo
    );
  }

  updateTodo(updatedTodo: Todo): Observable<Todo> {

    // Three steps: 
    // 1. Get newest TodoList from server
    // 2. Pipe from Todo[] to Todo, and check that requested Todo Object exists
    // 3. Pipe again to ensure the put operation occurs last; Return the http.put return value...
    return  this.getTodos().pipe<Todo>( 
      map<Todo[],Todo>( x => {
        let f = x.find(y => y.id == updatedTodo.id)!; 
        if(!f)
          throw new Error('todo not found');
        return f; 
      })      
    ).pipe(() => {
      return this.httpC.put<Todo>(`${environment.apiUrl}/${environment.user}/todo/${updatedTodo.id}`, updatedTodo);
    })
  }
}
