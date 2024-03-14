import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);

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

  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(`${environment.apiUrl}/StianNordvik/todo`));
  }
  


  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(this.http.post(`${environment.apiUrl}/StianNordvik/todo`, {title: title}))
    // @ts-ignore
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // @ts-ignore
    return this.http.put<Todo>(`${environment.apiUrl}/StianNordvik/todo/${updatedTodo.id}`, updatedTodo)
    .subscribe(data => this.todoId = data.id);
  }
}
