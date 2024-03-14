import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  constructor(private readonly http: HttpClient) {}

  get todos(): Promise<Todo[]> {
    return firstValueFrom(this.http.get<Todo[]>
      ('https://boolean-api-server.fly.dev/guro18/todo'));
  }

  async addTodo(title: string) {

    const todo = {
      title: title,
    };

    const post = await firstValueFrom(
      this.http.post<Todo>('https://boolean-api-server.fly.dev/guro18/todo'
      ,todo)
    );
  }

  async updateTodo(updatedTodo: Todo) {

    const put = await firstValueFrom(
      this.http.put<Todo>(
        `https://boolean-api-server.fly.dev/guro18/todo/${updatedTodo.id}`,
        updatedTodo
      )
    );
  }
}
