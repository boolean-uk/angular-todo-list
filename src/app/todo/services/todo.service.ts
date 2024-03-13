import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  url = `https://boolean-api-server.fly.dev/Vayeros/todo`
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

  // TODO replace with a get request
  todos: Promise<Todo[]> = Promise.resolve(this.getTodos());
  

  async getTodos(): Promise<Todo[]> {
    const result = await firstValueFrom(this.http.get<Todo[]>(`${this.url}`))
    return result    
  }

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    const res = await firstValueFrom(this.http.post<Todo>(`${this.url}`, todo))
    this.todos = this.getTodos()
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    const result = await firstValueFrom(this.http.put<Todo>(`${this.url}/${updatedTodo.id}`, updatedTodo))
    return result;
  }
}
