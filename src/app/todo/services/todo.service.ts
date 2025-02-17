import { Injectable, inject } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoId = 1

  http = inject(HttpClient);

  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(`${environment.apiUrl}`));
    
  }

  async addTodo(title: string): Promise<Todo> {

    const todo = await firstValueFrom(
      this.http.post(`${environment.apiUrl}`, {
        title : title
      })
    );
    // @ts-ignore
    return todo;
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {

    const todo = await firstValueFrom(
      this.http.put(`${environment.apiUrl}/${updatedTodo.id}`, {
        title : updatedTodo.title,
        completed : updatedTodo.completed
      })
    );
    // @ts-ignore
    return todo;
  }
}
