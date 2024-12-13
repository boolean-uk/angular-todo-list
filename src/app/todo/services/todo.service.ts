import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  http= inject(HttpClient)
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

  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(`${environment.apiUrl}/todo`));
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    return firstValueFrom(this.http.post<Todo>(`${environment.apiUrl}/todo`, todo));
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const foundTodo = firstValueFrom(this.http.put<Todo>(`${environment.apiUrl}/todo/${updatedTodo.id}`, updatedTodo));
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    return foundTodo;
  }
}
