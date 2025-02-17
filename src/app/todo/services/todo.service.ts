import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // TODO replace with a get request
  /* todos: Promise<Todo[]> = Promise.resolve(this.todoList); */

  http = inject(HttpClient)

  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(`${environment.apiUrl}/Miadog7Extra/todo`))
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = firstValueFrom(this.http.post(`${environment.apiUrl}/Miadog7Extra/todo`,
    {
      title: title,
    }));
    // @ts-ignore
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const foundTodo = firstValueFrom(this.http.get(`${environment.apiUrl}/Miadog7Extra/todo/${updatedTodo.id}`))
    if (!foundTodo) {
      throw new Error('todo not found');
    }
    const todo = firstValueFrom(this.http.put(`${environment.apiUrl}/Miadog7Extra/todo/${updatedTodo.id}`,
    {
      title: updatedTodo.title,
      completed: updatedTodo.completed
    }));
    // @ts-ignore
    return todo;
  }
}
