import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Promise<Todo[]> = this.getTodos();

  constructor(private http: HttpClient) {}

  // TODO replace with a get request
  async getTodos(): Promise<Todo[]> {
    return await firstValueFrom(
      this.http.get<Todo[]>(
        'https://boolean-api-server.fly.dev/LinusWillmont/todo'
      )
    );
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(
      this.http.post<Todo>(
        'https://boolean-api-server.fly.dev/LinusWillmont/todo',
        { title: title }
      )
    );
    (await this.todos).push(todo);
    return todo;
    //TODO: add the newly created todo to the todolist to show it
  }

  // async updateTodo(updatedTodo: Todo): Promise<Todo> {
  async updateTodo(updatedTodo: Todo) {
    // // TODO: replace with a PUT request
    // const foundTodo = this.todos.find((todo) => todo.id === updatedTodo.id);
    // if (!foundTodo) {
    //   throw new Error('todo not found');
    // }
    // Object.assign(foundTodo, updatedTodo);
    // return foundTodo;
  }
}
