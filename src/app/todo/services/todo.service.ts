import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  private todoList: Todo[] = [];

  constructor(private readonly http: HttpClient) {
  }

  todos: Promise<Todo[]> = Promise.resolve(this.loadTodo());

  async loadTodo() {
    return this.todoList = await firstValueFrom(this.http.get<Todo[]>('https://boolean-api-server.fly.dev/Annemoon-de-Groen/todo'));
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    this.todoList.push(todo);
    await firstValueFrom(this.http.post<Todo>('https://boolean-api-server.fly.dev/Annemoon-de-Groen/todo', todo))
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    await firstValueFrom(this.http.put<Todo>(`https://boolean-api-server.fly.dev/Annemoon-de-Groen/todo/${updatedTodo.id}`, updatedTodo))
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    Object.assign(foundTodo, updatedTodo);

    return foundTodo;
  }
}
