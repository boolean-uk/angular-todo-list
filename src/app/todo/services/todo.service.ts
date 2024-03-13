import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);
  private apiAddress = `${environment.apiUrl}/MartinJohannessen/todo`;
  private todoId = 1;

  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(this.apiAddress));
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(this.http.post(this.apiAddress,
      {
        title: title,
        id: this.todoId++,
        completed: false
      }));
    // @ts-ignore
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const putUrl = `${this.apiAddress}/${updatedTodo.id}`;
    const todo = await firstValueFrom(this.http.put(putUrl, updatedTodo));
    // @ts-ignore
    return todo;
  }
}
