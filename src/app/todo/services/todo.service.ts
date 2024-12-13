import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[] = [];
  constructor(private readonly http: HttpClient) {
    this.loadTodos();
  }

  async loadTodos() {
    this.todos = await firstValueFrom(
      this.http.get<Todo[]>(`${environment.apiUrl}/MackanPalm/todo`)
    );
  }

  async addTodo(title: string) {
    const todoToCreate = { title };
    const todo = await firstValueFrom(
      this.http.post<Todo>(
        `${environment.apiUrl}/MackanPalm/todo`,
        todoToCreate
      )
    );
    this.todos = [...this.todos, todo];
    await this.loadTodos();
  }

  async updateTodo(updatedTodo: Todo) {
    const todo = await firstValueFrom(
      this.http.put<Todo>(
        `${environment.apiUrl}/MackanPalm/todo/${updatedTodo.id}`,
        updatedTodo
      )
    );

    this.todos = this.todos.map((t) => (t.id === todo.id ? todo : t));
    await this.loadTodos();
  }
}
