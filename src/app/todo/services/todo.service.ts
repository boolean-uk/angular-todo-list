import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);

  // Get request code
  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(
      this.http.get(`https://boolean-api-server.fly.dev/maritmoe/todo`)
    );
  }

  // Post request code
  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(
      this.http.post(`https://boolean-api-server.fly.dev/maritmoe/todo`, {
        title: title,
      })
    );
    // @ts-ignore
    return todo;
  }

  // Put request code
  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const foundTodo = (await this.todos).find(
      (todo) => todo.id === updatedTodo.id
    );
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    await firstValueFrom(
      this.http.put(
        `https://boolean-api-server.fly.dev/maritmoe/todo/${updatedTodo.id}`,
        {
          title: updatedTodo.title,
          completed: updatedTodo.completed,
        }
      )
    );
    // @ts-ignore
    return foundTodo;
  }
}
