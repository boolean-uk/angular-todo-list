import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { firstValueFrom } from 'rxjs';

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
  todos: any;

  // TODO replace with a get request
  async getTodos() {
    const result = await firstValueFrom(
      this.http.get(`${environment.apiUrl}/todo`)
    );
    // @ts-ignore
    this.todos = result;
    return this.todos;
  }
  //todos: Promise<Todo[]> = Promise.resolve(this.todoList);

  async addTodo(title: string): Promise<Todo> {
    const newTodo = {
      title: title,
      completed: false,
    };
    const createdTodo = await firstValueFrom(
      this.http.post<Todo>(`${environment.apiUrl}/todo`, newTodo)
    );
    return createdTodo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const updated = await firstValueFrom(
      this.http.put<Todo>(
        `${environment.apiUrl}/todo/${updatedTodo.id}`,
        updatedTodo
      )
    );
    return updated;
  }
}
