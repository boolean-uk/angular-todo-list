import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import {firstValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  constructor(private readonly http: HttpClient) {
  }
  private todoList: Todo[] = [];

  async getTodo() {
    const response = await firstValueFrom(this.http.get<Todo[]>('https://boolean-api-server.fly.dev/levimojo/todo'));
    console.log('res', response)
    this.todoList.push(...response)

    return response
  }

  async addTodo(title: string) {
    const toCreate = {
      title: title,
    };
    const response = await firstValueFrom(
      this.http.post('https://boolean-api-server.fly.dev/levimojo/todo', toCreate)
    );
    console.log(response);
  }

  async updateTodo(updatedTodo: Todo) {
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    const response = await firstValueFrom(
      this.http.put('https://boolean-api-server.fly.dev/levimojo/todo/' + updatedTodo.id, updatedTodo)
    );

    console.log(response);
  }

  async deleteTodo(toDelete: Todo) {
    const foundTodo = this.todoList.find((todo) => todo.id === toDelete.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    const response = await firstValueFrom(
      this.http.delete('https://boolean-api-server.fly.dev/levimojo/todo/' + toDelete.id)
    );

    console.log(response)
  }
}
