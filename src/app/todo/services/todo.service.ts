import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient);

  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(`${environment.apiUrl}/todo`));
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = {
      id: 0,
      title: title,
      completed: false,
    };
    // @ts-ignore
    const newTodo: Todo = await firstValueFrom(
      this.http.post(`${environment.apiUrl}/todo`, todo)
    );
    return newTodo;
  }

  async updateTodo(todoToUpdate: Todo): Promise<Todo> {
    const newTodo = {
      title: todoToUpdate.title,
      completed: todoToUpdate.completed,
    };
    // @ts-ignore
    const updatedTodo: Todo = await firstValueFrom(
      this.http.put(`${environment.apiUrl}/todo/` + todoToUpdate.id, newTodo)
    );
    if (!updatedTodo) {
      throw new Error('todo not found1');
    }
    return updatedTodo;
  }
}
