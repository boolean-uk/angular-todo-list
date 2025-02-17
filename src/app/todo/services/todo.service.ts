import { inject, Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  http = inject(HttpClient)

  get todos(): Promise<Todo[]> {
    // @ts-ignore
    return firstValueFrom(this.http.get(`${environment.apiUrl}`))
  }

  async addTodo(title: string): Promise<Todo> {
    const todo = await firstValueFrom(
      this.http.post(`${environment.apiUrl}`, {
        title: title,
      })
    )
    // @ts-ignore
    return todo
  }

  async updateTodo(updatedTodo: Todo): Promise<Todo> {
    const result = await firstValueFrom(
      this.http.put(`${environment.apiUrl}/${updatedTodo.id}`, updatedTodo)
    )
    
    //@ts-ignore
    return result;
  }
}
