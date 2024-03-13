import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);

  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return this.http.get(`${environment.apiUrl}/espensolhaug1/todo`);
  }

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = await firstValueFrom(
      this.http.post(`${environment.apiUrl}/espensolhaug1/todo`, {
        title: title,
      })
    );
    // @ts-ignore
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const todo = await firstValueFrom(
      this.http.put(
        `${environment.apiUrl}/espensolhaug1/todo/${updatedTodo.id}`,
        {
          title: updatedTodo.title,
          completed: updatedTodo.completed,
        }
      )
    );
    // @ts-ignore
    return todo;
  }
}
