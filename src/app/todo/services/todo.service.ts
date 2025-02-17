import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private url = "https://boolean-uk-api-server.fly.dev/josteinlaa/todo";

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.url}`);
  }

  public getTodoUnfinished(allTodos: Observable<Todo[]>): Observable<Todo[]> {
    return allTodos.pipe(map(todos => todos.filter((todo: Todo) => !todo.completed)));
  }

  async addTodo(title: string): Promise<Todo> {
    const response = await this.http.post<Todo>(`${this.url}`, { title, completed: false }).toPromise();
    if (!response) {
      throw new Error('Failed to add todo');
    }
    return response;
  }

  public updateTodo(updatedTodo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.url}/${updatedTodo.id}`, updatedTodo);
  }
}
