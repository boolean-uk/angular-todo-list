import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  private todoList: Todo[] = [];

  constructor(private readonly http: HttpClient) { }

  async getAllTodos(): Promise<Todo[]> {
    const response = await firstValueFrom(
      this.http.get<Todo[]>(`${environment.apiUrl}/todo`)
    );
    return response;
  }

  todos: Promise<Todo[]> = this.getAllTodos();

  async addTodo(title: string): Promise<Todo> {
    const todo = {
      id: this.todoId++,
      title: title,
      completed: false,
    };
    const response = await firstValueFrom(
      this.http.post(`${environment.apiUrl}/todo`, todo)
    );
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const toCreate = {
      id: updatedTodo.id,
      title: updatedTodo.title,
      completed: !updatedTodo.completed,
    }
    const response = await firstValueFrom(
      this.http.put(`${environment.apiUrl}/todo/${toCreate.id}`, toCreate)
    );
    return updatedTodo;
  }

  async deleteTodo(todo: Todo): Promise<Todo> {
    const response = await firstValueFrom(
      this.http.delete(`${environment.apiUrl}/todo/${todo.id}`)
    );
    return todo;
  }
}
