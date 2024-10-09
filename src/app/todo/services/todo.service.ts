import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private httpClient = inject(HttpClient);

  // TODO replace with a get request DONE!
  todos$: Observable<Todo[]> = this.httpClient.get<Todo[]>(
    environment.apiUrl + '/maaxolofsson/todo'
  );

  public addTodo(title: string): Observable<Todo> {
    const body = {
      title: title,
    };

    const res = this.httpClient.post<Todo>(
      environment.apiUrl + '/maaxolofsson/todo',
      body
    );
    res.subscribe();
    return res;
  }

  public getAllTodos(): Observable<Todo[]> {
    const res = this.httpClient.get<Todo[]>(
      environment.apiUrl + '/maaxolofsson/todo'
    );
    res.subscribe();
    return res;
  }

  public updateTodo(updatedTodo: Todo): Observable<Todo> {
    // TODO: replace with a PUT request DONE!

    const body = {
      title: updatedTodo.title,
      completed: updatedTodo.completed,
    };

    const res = this.httpClient.put<Todo>(
      environment.apiUrl + '/maaxolofsson/todo/' + updatedTodo.id,
      body
    );
    res.subscribe();
    return res;
  }
}
