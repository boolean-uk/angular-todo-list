import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Route } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private URL = 'https://boolean-api-server.fly.dev/llllllll-l/todo';

  //! new code
  constructor(public readonly http: HttpClient) {}

  async loadTodos(): Promise<Todo[]> {
    return firstValueFrom(this.http.get<Todo[]>(this.URL));
  }

  async addTodo(title: string): Promise<Todo> {
    //used omit to ignore todo interface ID since DB dynamicly generats an ID
    const todo: Omit<Todo, 'id'> = {
      title: title,
      completed: false,
    };
    return firstValueFrom(this.http.post<Todo>(this.URL, todo));
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const putURL = `${this.URL}/${updatedTodo.id}`;
    return firstValueFrom(this.http.put<Todo>(putURL, updatedTodo));
  }
}
