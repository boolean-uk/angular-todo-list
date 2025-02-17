import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  public GetTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}`);
  }

  public GetUncompletedTodos(todos: Observable<Todo[]>): Observable<Todo[]> {
    return todos.pipe(
      map((todos) => todos.filter((todo: Todo) => !todo.completed))
    );
  }
  async AddTodo(title: string): Promise<Todo> {
    const newTodo = {
      title: title,
      completed: false,
    };
    const response = firstValueFrom(
      this.http.post<Todo>(`${environment.apiUrl}`, newTodo)
    );
    if (!response) {
      throw new Error('Failed to add todo');
    }
    return response;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const response = await firstValueFrom(
      this.http.put<Todo>(
        `${environment.apiUrl}/${updatedTodo.id}`,
        updatedTodo
      )
    );
    if (!response) {
      throw new Error('Failed to update todo');
    }
    return response;
  }
}
