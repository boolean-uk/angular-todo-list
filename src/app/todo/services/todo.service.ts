import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  constructor(private readonly http: HttpClient) {}

  async getAllTodos(): Promise<Todo[]> {
    const response = await firstValueFrom(
      this.http.get<Todo[]>(`${environment.apiUrl}`)
    );

    console.log('res', response);

    return response;
  }

  async addTodo(title: String): Promise<Todo> {
    const toCreate = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    const response = await firstValueFrom(
      this.http.post<Todo>(
        'https://boolean-api-server.fly.dev/RafalHalama/todo',
        toCreate
      )
    );

    console.log(response);
    return response;
  }
  async updateTodo(todo: Todo): Promise<Todo> {
    console.log(todo.id + ' ' + todo.title);
    const toCreate = {
      id: todo.id,
      title: todo.title,
      completed: true,
    };
    const response = await firstValueFrom(
      this.http.put<Todo>(
        `https://boolean-api-server.fly.dev/RafalHalama/todo/${todo.id}`,
        toCreate
      )
    );

    console.log(response);
    return response;
  }
  //todos: Promise<Todo[]> = Promise.resolve(this.todoList);

  /*async addTodo(title: string): Promise<Todo> {
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    this.todoList.push(todo);

    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    Object.assign(foundTodo, updatedTodo);

    return foundTodo;
  }*/
}
