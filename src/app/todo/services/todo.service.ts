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
  constructor(private readonly http: HttpClient) {}

  get todos(): Promise<Todo[]> {
    return firstValueFrom(
      this.http.get<Todo[]>(
        'https://boolean-api-server.fly.dev/VictorAdamson/todo'
      )
    );
  }
  async addTodo(title: string): Promise<Todo> {
    try {
      const newTask = { title };
      const todo = await firstValueFrom(
        this.http.post<Todo>(
          `https://boolean-api-server.fly.dev/VictorAdamson/todo`,
          newTask
        )
      );
      this.todoList.push(todo);
      return todo;
    } catch (error) {
      throw new Error('Invalid todo-task');
    }
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const foundTodo = await firstValueFrom(
      this.http.put<Todo>(
        `https://boolean-api-server.fly.dev/VictorAdamson/todo/${updatedTodo.id}`,
        updatedTodo
      )
    );
    console.log(foundTodo);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    Object.assign(foundTodo, updatedTodo);

    return foundTodo;
  }
}
