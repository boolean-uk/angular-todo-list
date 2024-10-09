import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private httpClient = inject(HttpClient)

  async todos(): Promise<Todo[]>{
    return firstValueFrom(this.httpClient.get<Todo[]>("https://boolean-uk-api-server.fly.dev/FredrikEH/todo"))
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(this.httpClient.post<Todo>("https://boolean-uk-api-server.fly.dev/FredrikEH/todo", {title}))
    window.location.reload()
    return todo
  }
  
  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    return await firstValueFrom(this.httpClient.put<Todo>(`https://boolean-uk-api-server.fly.dev/FredrikEH/todo/${updatedTodo.id}`, updatedTodo))
  }
}
