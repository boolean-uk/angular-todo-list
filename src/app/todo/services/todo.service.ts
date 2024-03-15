import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);
  todos: Promise<Todo[]> = this.getTodos();

  async getTodos(): Promise<Array<Todo>> {
    return await firstValueFrom(this.http.get(`https://boolean-api-server.fly.dev/Solido7/todo`)) as Array<Todo>;
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = {
      title: title,
      completed: false,
    };
    
    const result = await firstValueFrom(this.http.post(`https://boolean-api-server.fly.dev/Solido7/todo`, todo)) as Todo;
    this.todos.then(async (todos) => {
      todos.push(result);
    });
    return result;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const foundTodo = await firstValueFrom(this.http.put(`https://boolean-api-server.fly.dev/Solido7/todo/${updatedTodo.id}`, updatedTodo)) as Todo;
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    Object.assign(foundTodo, updatedTodo);

    return foundTodo;
  }
}
