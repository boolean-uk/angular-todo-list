import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // private todoId = 1;
  // private todoList: Todo[] = [
  //   {
  //     id: this.todoId++,
  //     title: 'serve the app',
  //     completed: true,
  //   },
  //   {
  //     id: this.todoId++,
  //     title: 'familiarise yourself with the codebase',
  //     completed: false,
  //   },
  //   {
  //     id: this.todoId++,
  //     title: 'start talking to the api',
  //     completed: false,
  //   },
  // ];

  constructor(private readonly http: HttpClient) {}

  // TODO replace with a get request
  get todos(): Promise<Todo[]> {
    return firstValueFrom(this.http.get<Todo[]>
      ('https://boolean-api-server.fly.dev/guro18/todo'));
  }

  async addTodo(title: string) {
    // TODO: replace with a POST request
    const todo = {
      title: title,
    };

    const post = await firstValueFrom(
      this.http.post<Todo>('https://boolean-api-server.fly.dev/guro18/todo'
      ,todo)
    );
  }

  async updateTodo(updatedTodo: Todo) {
    // TODO: replace with a PUT request
    const put = await firstValueFrom(
      this.http.put<Todo>(
        `https://boolean-api-server.fly.dev/guro18/todo/${updatedTodo.id}`,
        updatedTodo
      )
    );
  }
}
