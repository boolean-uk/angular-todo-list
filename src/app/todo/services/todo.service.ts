import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);
  private todoId = 1;
  private todoList: Todo[] = [];

  todos: Promise<Todo[]> = this.getTodos();

  // TODO replace with a get request
  async getTodos() {
    const result = await firstValueFrom(
      this.http.get(`${environment.apiUrl}/knutsr0501/todo`)
    );
    // @ts-ignore
    this.todoList = result;
    return this.todoList;
  }

  async addTodo(title: string): Promise<Todo> {
    // TODO: replace with a POST request
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    await firstValueFrom(
      this.http.post(`${environment.apiUrl}/knutsr0501/todo`, todo)
    );
    this.todos = this.getTodos();
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    // TODO: replace with a PUT request
    const foundTodo = this.todoList.find((todo) => todo.id === updatedTodo.id);
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    await firstValueFrom(
      this.http.put(
        `${environment.apiUrl}/knutsr0501/todo/${updatedTodo.id}`,
        updatedTodo
      )
    );

    return foundTodo;
  }
}
