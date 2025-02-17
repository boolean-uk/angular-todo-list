import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from 'environment/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.api}`);
  }

  public getFilteredTodos(todos: Observable<Todo[]>): Observable<Todo[]> {
    return todos.pipe(map((todos) => todos.filter((todo) => !todo.completed)));
  }

  async addTodo(title: string): Promise<Todo> {
    const newTodo = {
      title: title,
      completed: false,
    };
    const response = await firstValueFrom(this.http.post<Todo>(`${environment.api}`, newTodo));
    if (!response) {
      throw new Error('Adding todo failed');
    }
    return response;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const response = await firstValueFrom( this.http.put<Todo>(`${environment.api}/${updatedTodo.id}`,updatedTodo));
    if (!response) {
      throw new Error('Updating todo failed');
    }
    return response;
  }
    
}
