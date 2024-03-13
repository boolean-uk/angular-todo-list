import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  private todoList: Todo[] = [];

  async getTodos(): Promise<Todo[]> {
    const result = await firstValueFrom(
      this.http.get<Todo[]>(`${environment.apiUrl}/espensolhaug1/todo`)
    );
    this.todoList = result;
    return this.todoList;
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(
      this.http.post<Todo>(`${environment.apiUrl}/espensolhaug1/todo`, {
        title: title,
      })
    );
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const todo = await firstValueFrom(
      this.http.put<Todo>(
        `${environment.apiUrl}/espensolhaug1/todo/${updatedTodo.id}`,
        {
          title: updatedTodo.title,
          completed: updatedTodo.completed,
        }
      )
    );
    return todo;
  }
}
