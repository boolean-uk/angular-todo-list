import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private httpClient = inject(HttpClient);
  private BASE_API_URL = 'https://boolean-api-server.fly.dev/Sabbasn/';

  todos: Promise<Todo[]> = this.getTodos();

  async getTodos(): Promise<Todo[]> {
    const response = this.httpClient.get<Todo[]>(this.BASE_API_URL + 'todo');
    const todos = await firstValueFrom(response);
    return todos;
  }

  async addTodo(title: string): Promise<Todo> {
    const respone = this.httpClient.post<Todo>(this.BASE_API_URL + 'todo', {
      title: title,
    });
    const todo = await firstValueFrom(respone);
    (await this.todos).push(todo);
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const response = this.httpClient.put<Todo>(
      this.BASE_API_URL + `todo/${updatedTodo.id}`,
      updatedTodo
    );
    const todo = await firstValueFrom(response);
    const existingTodo = (await this.todos).find(
      (x: Todo) => x.id === updatedTodo.id
    );
    if (!existingTodo) throw new Error('No todo with id: ' + updatedTodo.id);
    existingTodo.completed = todo.completed;
    existingTodo.title = todo.title;
    return todo;
  }
}
