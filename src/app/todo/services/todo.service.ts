import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  private http = inject(HttpClient);

  async getTodos(): Promise<Todo[]> {
    const response = await firstValueFrom(this.http.get<Todo[]>(`${environment.apiUrl}`));
    console.log(...response);
    return response;
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = {
      id: undefined,
      title: title,
      completed: false,
    };

    const response = await firstValueFrom(this.http.post(`${environment.apiUrl}`, todo));
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo | undefined> {

    const foundTodo = this.getTodos().then(todos => todos.find((todo) => todo.id === updatedTodo.id));

    if (!foundTodo) {
      throw new Error('todo not found');
    }
    await firstValueFrom(this.http.put(`${environment.apiUrl}/${updatedTodo.id}`, updatedTodo));

    return foundTodo;
  }
}
