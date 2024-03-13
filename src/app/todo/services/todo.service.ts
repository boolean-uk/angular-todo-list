import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
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
  http = inject(HttpClient);

  apiUrl = "https://boolean-api-server.fly.dev/Sebank/todo";

  async getList() : Promise<any>{
    const result = await firstValueFrom(this.http.get(this.apiUrl));
    return result;
  }

  // TODO replace with a get request
  todos: Promise<Todo[]> = this.getList();

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = {
      title: title,
    };

    const result = await firstValueFrom(this.http.post<Todo>(this.apiUrl, todo));
    (await this.todos).push(result);
    // @ts-ignore
    return result;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const foundTodo = await firstValueFrom(this.http.put<Todo>(this.apiUrl + `/${updatedTodo.id}`, updatedTodo));
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    Object.assign(foundTodo, updatedTodo);

    return foundTodo;
  }
}
