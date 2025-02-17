import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  public getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.apiUrl}/noahekse/todo`);
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = {
      title: title,
      completed: false,
    };

    const addedTodo = await firstValueFrom(
      this.http.post<Todo>(`${environment.apiUrl}/noahekse/todo`, todo)
    );

    console.log(`Added todo:`, addedTodo);
    return addedTodo;
  }

  async updateTodo(updatedTodo: Todo) {
    return await firstValueFrom(
      this.http.put<Todo>(
        `${environment.apiUrl}/noahekse/todo/${updatedTodo.id}`,
        updatedTodo
      )
    );
  }
}
