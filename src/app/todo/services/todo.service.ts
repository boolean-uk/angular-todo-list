import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1;
  http = inject(HttpClient)

  get todos() : Promise<Todo>{
    // @ts-ignore
    return firstValueFrom(this.http.get(`${environment.apiUrl}`));
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(
      this.http.post(`${environment.apiUrl}`, {title: title})
    );
    // @ts-ignore
    return todo
  }

  async updateTodo(todo: Todo): Promise<Todo> {
    const updatedTodo = await firstValueFrom(
      this.http.put<Todo>(`${environment.apiUrl}/${todo.id}`, todo)
    );
    return updatedTodo;
  }
}
