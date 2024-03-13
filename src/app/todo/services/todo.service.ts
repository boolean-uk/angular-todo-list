import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

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

  // TODO replace with a get request
  //todos: Promise<Todo[]> = Promise.resolve(this.todoList);
  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(`${environment.apiUrl}/todo`));
  }

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = await firstValueFrom(this.http.post(`${environment.apiUrl}/todo`, { title: title}))
    // @ts-ignore
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const foundTodo = await firstValueFrom(this.http.put<Todo>(`${environment.apiUrl}/todo/${updatedTodo.id}`, updatedTodo))

    return foundTodo;
  }
}
