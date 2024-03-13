import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
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
  
  http = inject(HttpClient)
  async getTodo() {
    const result = await firstValueFrom(this.http.get(`${environment.apiUrl}/Slingreen/todo`));
    // @ts-ignore
    this.todoList = result;
    return this.todoList;
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(this.http.post(`${environment.apiUrl}/Slingreen/todo`, { title: title }));
    // @ts-ignore
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    const todo = await firstValueFrom(this.http.put(`${environment.apiUrl}/Slingreen/todo/${updatedTodo.id}`, updatedTodo));

    // @ts-ignore
    return todo;
  }
}
