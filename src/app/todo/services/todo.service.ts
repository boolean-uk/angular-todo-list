import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient)
  private todoId = 1;
  private todoList: Todo[] = [
    {
      id: this.todoId++,
      title: 'serve the app',
      completed: true,
    },
    {
      id: this.todoId++,
      title: 'familiarise yourself with the codebase',
      completed: false,
    },
    {
      id: this.todoId++,
      title: 'start talking to the api',
      completed: false,
    },
  ];

  todos: Promise<Todo[]> = Promise.resolve(this.getTodos());

  async getTodos(): Promise<Todo[]> {
    const requestUrl = "https://boolean-api-server.fly.dev/spectraldesign/todo"
    const result = await firstValueFrom(this.http.get<Todo[]>(requestUrl))
    return result
  }


  async addTodo(title: string): Promise<Todo> {
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    const res = await firstValueFrom(this.http.post<Todo>("https://boolean-api-server.fly.dev/spectraldesign/todo", todo))
    this.todos = this.getTodos();
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    const res = await firstValueFrom(this.http.put<Todo>(`https://boolean-api-server.fly.dev/spectraldesign/todo/${updatedTodo.id}`, updatedTodo))

    return res;
  }
}
