import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;

  private httpClient = inject(HttpClient);
  private baseUrl = 'https://boolean-uk-api-server.fly.dev/stian96/todo';
  todos: Observable<Todo[]> = this.getAllTodos();

  public getAllTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.baseUrl);
  }

  public addTodo(title: string) {
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };

    this.httpClient.post<Todo>(this.baseUrl, todo).subscribe();
  }

  public updateTodo(updatedTodo: Todo) {
    this.httpClient.put<Todo>(`${this.baseUrl}/${updatedTodo.id}`, updatedTodo).subscribe();
  }
}
