import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoList: Todo[] = [];
  constructor(private readonly http: HttpClient) {
  }

  

  async getAllInCompletedTodos(): Promise<Todo[]> {
    const response = await firstValueFrom(
      this.http.get<Todo[]>(
        'https://boolean-api-server.fly.dev/dziubichmarlena/todo'
      )
    );
    console.log('res', response);
    return response.filter((el) => !el.completed);
  }

  async getAllCompletedTodos(): Promise<Todo[]> {
    const response = await firstValueFrom(
      this.http.get<Todo[]>(
        'https://boolean-api-server.fly.dev/dziubichmarlena/todo'
      )
    );
    console.log('res', response);
    return response.filter((el) => el.completed);
  }

  async createTodo(title: string) {
    const toCreate = {
      title: title,
    };
    const response = await firstValueFrom(
      this.http.post(
        'https://boolean-api-server.fly.dev/dziubichmarlena/todo',
        toCreate
      )
    );
    console.log(response);
  }

  async updateTodo(todo: Todo) {
    const response = await firstValueFrom(
      this.http.put(
        'https://boolean-api-server.fly.dev/dziubichmarlena/todo' +
          '/' +
          todo.id,
        todo
      )
    );

    console.log(response);
  }

  async deleteTodo(id: number) {
    const response = await firstValueFrom(
      this.http.delete(
        'https://boolean-api-server.fly.dev/dziubichmarlena/todo' +
          '/' +
          id
      )
    );

    console.log(response);
  }


}
