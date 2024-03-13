import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  http = inject(HttpClient);

  private todoList: Todo[] = [];

  todos: Promise<Todo[]> = this.getTodos();

  async getTodos() {
    const result = await firstValueFrom(
      this.http.get(`${environment.apiUrl}/StevenTPh/todo`)
    );
    //@ts-ignore
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
      this.http.post(`${environment.apiUrl}/StevenTPh/todo`, todo)
    );
    this.todos = this.getTodos();

    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const result = await firstValueFrom(
      this.http.put(`${environment.apiUrl}/StevenTPh/todo/${updatedTodo.id}`, {
        title: updatedTodo.title,
        completed: updatedTodo.completed,
      })
    );

    console.log(result);

    return updatedTodo;
  }
}
