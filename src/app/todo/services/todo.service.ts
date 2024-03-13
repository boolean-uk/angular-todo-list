import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  private http = inject(HttpClient);

  // TODO replace with a get request
  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get("https://boolean-api-server.fly.dev/kristianverduin/todo"))
  }

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = await firstValueFrom(this.http.post("https://boolean-api-server.fly.dev/kristianverduin/todo", {title: title}))
    // @ts-ignore
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const foundTodo = await firstValueFrom(this.http.put("https://boolean-api-server.fly.dev/kristianverduin/todo/" + updatedTodo.id, updatedTodo))
    // @ts-ignore
    return foundTodo;
  }
}
