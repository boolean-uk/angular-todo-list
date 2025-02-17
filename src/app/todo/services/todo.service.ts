import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);
  env = environment;

  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(`${this.env.apiUrl}/pudkipz/todo`));
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(
      this.http.post(`${this.env.apiUrl}/pudkipz/todo`, {
        title: title, completed: false,
      })
    );
    // @ts-ignore
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const foundTodo = await firstValueFrom(
      this.http.put(`${this.env.apiUrl}/pudkipz/todo/${updatedTodo.id}`, updatedTodo)
    )
    if (!foundTodo) {
      throw new Error('todo not found');
    }

    // @ts-ignore
    return foundTodo;
  }
}
